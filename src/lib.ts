import "core-js/modules/es.object.entries";
import { canAdv } from "canadv.ash";
import {
  adv1,
  buy,
  cliExecute,
  mallPrice,
  myFamiliar,
  numericModifier,
  print,
  restoreMp,
  retrieveItem,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $locations,
  $skill,
  Bandersnatch,
  ensureEffect,
  FreeRun,
  get,
  getFoldGroup,
  getSongCount,
  getSongLimit,
  Guzzlr,
  have,
  Macro,
  PropertiesManager,
  property,
  Requirement,
} from "libram";

export const manager = new PropertiesManager();

export const cache: {
  trickFamiliar?: Familiar;
  outfightWeight?: number;
  bestOutfit?: string;
  pantsgivingFood?: Item;
  baseAdventureValue?: number;
  effectWeight?: number;
  meatFamiliar?: Familiar;
} = {};

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
    return typeof whileParameter === "number" ? n < whileParameter : whileParameter();
  };

  if (macro instanceof Macro) macro.setAutoAttack();
  while (condition()) {
    if (typeof macro === "function") macro().setAutoAttack();
    adv1(location, -1, () => Macro.cachedAutoAttack ?? Macro.abort().toString());
    if (afterCombatAction) afterCombatAction();
    n++;
  }
}

const freeRuns: FreeRun[] = [
  /*
  new freeRun(
     () => {
      if (getWorkshed() !== $item`Asdon Martin keyfob`) return false;
      const banishes = get("banishedMonsters").split(":");
      const bumperIndex = banishes
        .map((string) => string.toLowerCase())
        .indexOf("spring-loaded front bumper");
      if (bumperIndex === -1) return true;
      return myTurncount() - parseInt(banishes[bumperIndex + 1]) > 30;
    },
    () => {
      fillAsdonMartinTo(50);
      retrieveItem(1, $item`louder than bomb`);
    },
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item($item`Louder Than Bomb`)
  ),
  code removed because of boss monsters
  */

  new FreeRun(
    "Bander",
    () =>
      have($familiar`Frumious Bandersnatch`) &&
      (have($effect`Ode to Booze`) || getSongCount() < getSongLimit()) &&
      Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step("runaway"),
    new Requirement(["Familiar Weight"], {}),
    () => {
      useFamiliar($familiar`Frumious Bandersnatch`);
      ensureEffect($effect`Ode to Booze`);
    }
  ),

  new FreeRun(
    "Boots",
    () => have($familiar`Pair of Stomping Boots`) && Bandersnatch.getRemainingRunaways() > 0,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step("runaway"),
    new Requirement(["Familiar Weight"], {}),
    () => useFamiliar($familiar`Pair of Stomping Boots`)
  ),

  new FreeRun(
    "Snokebomb",
    () => get("_snokebombUsed") < 3 && have($skill`Snokebomb`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill($skill`Snokebomb`),
    undefined,
    () => restoreMp(50)
  ),

  new FreeRun(
    "Hatred",
    () => get("_feelHatredUsed") < 3 && have($skill`Emotionally Chipped`),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill($skill`Feel Hatred`)
  ),

  new FreeRun(
    "KGB",
    () => have($item`Kremlin's Greatest Briefcase`) && get("_kgbTranquilizerDartUses") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`KGB tranquilizer dart`
    ),
    new Requirement([], { forceEquip: $items`Kremlin's Greatest Briefcase` })
  ),

  new FreeRun(
    "Latte",
    () => have($item`latte lovers member's mug`) && !get("_latteBanishUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Throw Latte on Opponent"
    ),
    new Requirement([], { forceEquip: $items`latte lovers member's mug` })
  ),

  new FreeRun(
    "Docbag",
    () => have($item`Lil' Doctor™ bag`) && get("_reflexHammerUsed") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill($skill`Reflex Hammer`),
    new Requirement([], { forceEquip: $items`Lil' Doctor™ bag` })
  ),

  new FreeRun(
    "Middle Finger",
    () => have($item`mafia middle finger ring`) && !get("_mafiaMiddleFingerRingUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      $skill`Show them your ring`
    ),
    new Requirement([], { forceEquip: $items`mafia middle finger ring` })
  ),

  new FreeRun(
    "VMask",
    () => have($item`V for Vivala mask`) && !get("_vmaskBanisherUsed"),
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill($skill`Creepy Grin`),
    new Requirement([], { forceEquip: $items`V for Vivala mask` }),
    () => restoreMp(30)
  ),

  new FreeRun(
    "Stinkeye",
    () =>
      getFoldGroup($item`stinky cheese diaper`).some((item) => have(item)) &&
      !get("_stinkyCheeseBanisherUsed"),

    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Give Your Opponent the Stinkeye"
    ),
    new Requirement([], { forceEquip: $items`stinky cheese eye` }),
    () => {
      if (!have($item`stinky cheese eye`)) cliExecute(`fold stinky cheese eye`);
    }
  ),

  new FreeRun(
    "Navel Ring",
    () => have($item`navel ring of navel gazing`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step("runaway"),
    new Requirement([], { forceEquip: $items`navel ring of navel gazing` })
  ),

  new FreeRun(
    "GAP",
    () => have($item`Greatest American Pants`) && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).step("runaway"),
    new Requirement([], { forceEquip: $items`Greatest American Pants` })
  ),

  new FreeRun(
    "Scrapbook",
    () => {
      visitUrl("desc_item.php?whichitem=463063785");
      return have($item`familiar scrapbook`) && get("scrapbookCharges") >= 100;
    },
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).skill(
      "Show Your Boring Familiar Pictures"
    ),
    new Requirement([], { forceEquip: $items`familiar scrapbook` })
  ),

  new FreeRun(
    "Parasol",
    () => have($item`peppermint parasol`) && get("parasolUsed") < 9 && get("_navelRunaways") < 3,
    Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item($item`peppermint parasol`)
  ),
];

const cheapestRunSource = $items`Louder Than Bomb, divine champagne popper, tennis ball`.sort(
  (a, b) => mallPrice(a) - mallPrice(b)
)[0];

const cheapestItemRun = new FreeRun(
  "Cheap Combat Item",
  () => retrieveItem(cheapestRunSource),
  Macro.trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`).item(cheapestRunSource),
  undefined,
  () => retrieveItem(cheapestRunSource)
);

export function findRun(useFamiliar = true): FreeRun {
  return (
    freeRuns.find(
      (run) => run.available() && (useFamiliar || !["Bander", "Boots"].includes(run.name))
    ) ?? cheapestItemRun
  );
}
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
