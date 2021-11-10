import "core-js/modules/es.object.entries";
import { canAdv } from "canadv.ash";
import {
  abort,
  adv1,
  buy,
  cliExecute,
  mallPrice,
  myAdventures,
  myFamiliar,
  numericModifier,
  print,
  retrieveItem,
  use,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $locations,
  $skill,
  FreeRun,
  get,
  Guzzlr,
  have,
  Macro,
  PropertiesManager,
  property,
} from "libram";

export const manager = new PropertiesManager();

export const cache: {
  trickFamiliar?: Familiar;
  outfightWeight?: number;
  bestOutfit?: string;
  pantsgivingFood?: PantsgivingFood;
  baseAdventureValue?: number;
  effectWeight?: number;
  meatFamiliar?: Familiar;
  startingBowls?: number;
  startingCandies: Map<Item, number>;
} = {
  startingCandies: new Map<Item, number>(),
};

export type PantsgivingFood = {
  food: Item;
  costOverride?: () => number;
  canGet: () => boolean;
};

type ZonePotion = {
  zone: string;
  effect: Effect;
  potion: Item;
};

const zonePotions: ZonePotion[] = [
  {
    zone: "Spaaace",
    effect: $effect`Transpondent`,
    potion: $item`transporter transponder`,
  },
  {
    zone: "Wormwood",
    effect: $effect`Absinthe-Minded`,
    potion: $item`tiny bottle of absinthe`,
  },
  {
    zone: "RabbitHole",
    effect: $effect`Down the Rabbit Hole`,
    potion: $item`"DRINK ME" potion`,
  },
];

function acceptBestGuzzlrQuest() {
  if (!Guzzlr.isQuestActive()) {
    if (
      Guzzlr.canPlatinum() &&
      (!Guzzlr.haveFullPlatinumBonus() ||
        (Guzzlr.haveFullBronzeBonus() && Guzzlr.haveFullGoldBonus()))
    ) {
      Guzzlr.acceptPlatinum();
    } else if (Guzzlr.canGold() && (!Guzzlr.haveFullGoldBonus() || Guzzlr.haveFullBronzeBonus())) {
      Guzzlr.acceptGold();
    } else {
      Guzzlr.acceptBronze();
    }
  }
}

export function determineDraggableZoneAndEnsureAccess(): Location {
  const defaultLocation =
    get("_spookyAirportToday") || get("spookyAirportAlways")
      ? $location`The Deep Dark Jungle`
      : $location`Noob Cave`;
  if (!Guzzlr.have()) return defaultLocation;

  acceptBestGuzzlrQuest();

  const currentGuzzlrZone = Guzzlr.getLocation() || $location`none`;
  if (!testZoneAndUsePotionToAccess() || !testZoneForWanderers(currentGuzzlrZone)) {
    Guzzlr.abandon();
  }
  acceptBestGuzzlrQuest();

  const guzzlZone = Guzzlr.getLocation();
  if (!guzzlZone || !testZoneAndUsePotionToAccess() || !testZoneForWanderers(guzzlZone))
    return defaultLocation;

  if (Guzzlr.getTier() === "platinum") {
    zonePotions.forEach((place) => {
      if (guzzlZone.zone === place.zone && !have(place.effect)) {
        if (!have(place.potion)) {
          buy(1, place.potion, 10000);
        }
        use(1, place.potion);
      }
    });
    if (!Guzzlr.havePlatinumBooze()) {
      print("It's time to get buttery", "purple");
      cliExecute("make buttery boy");
    }
  } else {
    const guzzlrBooze = Guzzlr.getBooze();
    if (!guzzlrBooze) {
      return defaultLocation;
    } else if (!have(guzzlrBooze)) {
      print("just picking up some booze before we roll", "blue");
      retrieveItem(guzzlrBooze);
    }
  }
  return guzzlZone;
}

function testZoneAndUsePotionToAccess() {
  const guzzlZone = Guzzlr.getLocation();
  if (!guzzlZone) return false;
  const forbiddenZones: string[] = [""]; //can't stockpile these potions,
  if (!get("_spookyAirportToday") && !get("spookyAirportAlways")) {
    forbiddenZones.push("Conspiracy Island");
  }
  if (!get("_stenchAirportToday") && !get("stenchAirportAlways")) {
    forbiddenZones.push("Dinseylandfill");
  }
  if (!get("_hotAirportToday") && !get("hotAirportAlways")) {
    forbiddenZones.push("That 70s Volcano");
  }
  if (!get("_coldAirportToday") && !get("coldAirportAlways")) {
    forbiddenZones.push("The Glaciest");
  }
  if (!get("_sleazeAirportToday") && !get("sleazeAirportAlways")) {
    forbiddenZones.push("Spring Break Beach");
  }

  zonePotions.forEach((place) => {
    if (guzzlZone.zone === place.zone && !have(place.effect)) {
      if (!have(place.potion)) {
        buy(1, place.potion, 10000);
      }
      use(1, place.potion);
    }
  });
  const blacklist = $locations`The Oasis, The Bubblin' Caldera, Barrrney's Barrr, The F'c'le, The Poop Deck, Belowdecks, 8-Bit Realm, Madness Bakery, The Secret Government Laboratory`;
  if (
    forbiddenZones.includes(guzzlZone.zone) ||
    blacklist.includes(guzzlZone) ||
    guzzlZone.environment === "underwater" ||
    !canAdv(guzzlZone, false)
  ) {
    return false;
  } else {
    return true;
  }
}

function testZoneForWanderers(location: Location): boolean {
  const wandererBlacklist = $locations`The Batrat and Ratbat Burrow, Guano Junction, The Beanbat Chamber`;
  return !wandererBlacklist.includes(location) && location.wanderers;
}

export function advMacroAA(
  location: Location,
  macro: Macro | (() => Macro),
  whileParameter: number | (() => boolean) = 1,
  afterCombatAction?: () => void
): void {
  let n = 0;
  const condition = () => {
    return (
      (typeof whileParameter === "number" ? n < whileParameter : whileParameter()) &&
      myAdventures() > 0
    );
  };

  if (macro instanceof Macro) macro.setAutoAttack();
  while (condition()) {
    if (typeof macro === "function") macro().setAutoAttack();
    adv1(location, -1, (_round: number, _foe: Monster, pageText: string) => {
      if (pageText.includes("Macro Aborted")) abort();
      return Macro.cachedAutoAttack ?? Macro.abort().toString();
    });
    if (afterCombatAction) afterCombatAction();
    n++;
  }
}

const cheapestRunSource = $items`Louder Than Bomb, divine champagne popper, tennis ball`.sort(
  (a, b) => mallPrice(a) - mallPrice(b)
)[0];

export const cheapestItemRun = new FreeRun(
  "Cheap Combat Item",
  () => retrieveItem(cheapestRunSource),
  Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(cheapestRunSource)
);

export function questStep(questName: string): number {
  const stringStep = property.getString(questName);
  if (stringStep === "unstarted" || stringStep === "") return -1;
  else if (stringStep === "started") return 0;
  else if (stringStep === "finished") return 999;
  else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }
    return parseInt(stringStep.substring(4), 10);
  }
}

export function trickFamiliar(): Familiar {
  if (!cache.trickFamiliar) cache.trickFamiliar = myFamiliar();
  return cache.trickFamiliar;
}

export function leprechaunMultiplier(familiar: Familiar): number {
  if (familiar === $familiar`Mutant Cactus Bud`)
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item`none`);
  const meatBonus = numericModifier(familiar, "Meat Drop", 1, $item`none`);
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}

export function fairyMultiplier(familiar: Familiar): number {
  if (familiar === $familiar`Mutant Fire Ant`)
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item`none`);
  const itemBonus = numericModifier(familiar, "Item Drop", 1, $item`none`);
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}

export function meatFamiliar(): Familiar {
  if (!cache.meatFamiliar) {
    const bestLeps = Familiar.all()
      .filter(have)
      .sort((a, b) => leprechaunMultiplier(b) - leprechaunMultiplier(a));
    const bestLepMult = leprechaunMultiplier(bestLeps[0]);
    cache.meatFamiliar = bestLeps
      .filter((familiar) => leprechaunMultiplier(familiar) === bestLepMult)
      .sort((a, b) => fairyMultiplier(b) - fairyMultiplier(a))[0];
  }
  return cache.meatFamiliar;
}
