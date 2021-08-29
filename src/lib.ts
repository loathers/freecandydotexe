import { canAdv } from "canadv.ash";
import {
  use,
  haveEffect,
  availableAmount,
  buy,
  cliExecute,
  itemAmount,
  print,
  visitUrl,
  runChoice,
  mallPrice,
  myFamiliar,
  equip,
  bjornifyFamiliar,
  setAutoAttack,
  adv1,
  getClanName,
  putStash,
  retrieveItem,
  takeStash,
  myTurncount,
  autosellPrice,
} from "kolmafia";
import {
  get,
  set,
  $item,
  $location,
  $items,
  have,
  $effect,
  $familiar,
  $slot,
  Macro,
  property,
  $locations,
  Guzzlr,
  SourceTerminal,
} from "libram";

interface ZonePotion {
  zone: string;
  effect: Effect;
  potion: Item;
}

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
  parameter: number | (() => boolean) = 1,
  afterCombatAction?: () => void
) {
  let n = 0;
  const condition = () => {
    return typeof parameter === "number" ? n < parameter : parameter();
  };
  const isFunc = typeof macro === "function";
  const macroFunc = () => {
    return typeof macro === "function" ? macro() : macro;
  };
  const macroText = macro.toString();
  macroFunc().setAutoAttack();
  while (condition()) {
    if (isFunc) macroFunc().setAutoAttack();
    adv1(location, -1, (round: number, foe: Monster, text: string) => {
      return isFunc ? macroFunc().toString() : macroText;
    });
    if (afterCombatAction) afterCombatAction();
    n++;
  }
}

export function advMacro(
  location: Location,
  macro: Macro | (() => Macro),
  parameter: number | (() => boolean) = 1,
  afterCombatAction?: () => void
) {
  setAutoAttack(0);
  let n = 0;
  const condition = () => {
    return typeof parameter === "number" ? n < parameter : parameter();
  };
  const macroFunc = () => {
    return typeof macro === "function" ? macro() : macro;
  };
  while (condition()) {
    adv1(location, -1, () => {
      return macroFunc().toString();
    });
    if (afterCombatAction) afterCombatAction();
    n++;
  }
}

function inClan<T>(clanName: string, action: () => T) {
  clanName = clanName.toLowerCase();
  const startingClanName = getClanName().toLowerCase();
  if (startingClanName !== clanName) cliExecute("/whitelist " + clanName);
  if (getClanName().toLowerCase() !== clanName) {
    throw `Failed to move to clan ${clanName} (currently in ${getClanName()})`;
  }
  try {
    return action();
  } finally {
    if (startingClanName !== clanName) cliExecute("/whitelist " + startingClanName);
  }
}

export function withStash<T>(itemsToTake: Item[], action: () => T) {
  if (itemsToTake.every((item) => availableAmount(item) > 0)) return action();

  const stashClanName = "Alliance From Heck";

  return inClan(stashClanName, () => {
    const quantitiesTaken = new Map<Item, number>();
    try {
      for (const item of itemsToTake) {
        if (getClanName() !== stashClanName)
          throw "Wrong clan! Don't take stuff out of the stash here!";
        const succeeded = takeStash(1, item);
        if (succeeded) {
          print(`Took ${item.plural} from stash.`, "blue");
          quantitiesTaken.set(item, (quantitiesTaken.get(item) ?? 0) + (succeeded ? 1 : 0));
        }
      }
      return action();
    } finally {
      for (const [item, quantityTaken] of quantitiesTaken.entries()) {
        // eslint-disable-next-line no-unsafe-finally
        if (getClanName() !== stashClanName)
          throw "Wrong clan! Don't put stuff back in the stash here!";
        retrieveItem(quantityTaken, item);
        putStash(quantityTaken, item);
        print(`Returned ${quantityTaken} ${item.plural} to stash.`, "blue");
      }
    }
  });
}

export const funBuddyNames = [
  "cowboy",
  "pardner",
  "friend",
  "friend-o",
  "pal",
  "buddy",
  "guy",
  "dude",
  "comrade",
  "heart of my heart",
  "matey",
  "daddy",
  "Mr. Anderson",
  "Shrek, the ogre from the Shrek franchise",
  "bad boy",
  "stretchy little man",
  "coward",
  "you block, you stone, you worse than senseless thing",
  "nerd",
  "you handsome, handsome man",
  "sport",
];

export function getRandFromArray(messages: Array<string>) {
  return messages[Math.floor(Math.random() * messages.length)];
}

const valueMap: Map<Item, number> = new Map();

const MALL_VALUE_MODIFIER = 0.9;

export function saleValue(...items: Item[]): number {
  return (
    items
      .map((item) => {
        if (valueMap.has(item)) return valueMap.get(item) || 0;
        if (item.discardable) {
          valueMap.set(
            item,
            mallPrice(item) > Math.max(2 * autosellPrice(item), 100)
              ? MALL_VALUE_MODIFIER * mallPrice(item)
              : autosellPrice(item)
          );
        } else {
          valueMap.set(item, mallPrice(item) > 100 ? MALL_VALUE_MODIFIER * mallPrice(item) : 0);
        }
        return valueMap.get(item) || 0;
      })
      .reduce((s, price) => s + price, 0) / items.length
  );
}
