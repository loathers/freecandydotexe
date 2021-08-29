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
} from "libram";

interface zonePotion {
    zone: String;
    effect: Effect;
    potion: Item;
}

const zonePotions = [
    {
        zone: "Spaaace",
        effect: $effect`Transpondent`,
        potion: $item`transporter transponder`,
    },
    {
        zone: "Wormwood",
        effect: $effect`absinthe-minded`,
        potion: $item`tiny bottle of absinthe`,
    },
];

export function prepWandererZone() {
    const defaultLocation =
        get("_spookyAirportToday") || get("spookyAirportAlways")
            ? $location`the deep dark jungle`
            : $location`noob cave`;
    if (!have($item`guzzlr tablet`)) return defaultLocation;
    if (get("questGuzzlr") === "unstarted") {
        if (
            get("_guzzlrPlatinumDeliveries") === 0 &&
            get("guzzlrGoldDeliveries") >= 5 &&
            (get("guzzlrPlatinumDeliveries") < 30 ||
                (get("guzzlrGoldDeliveries") >= 150 && get("guzzlrBronzeDeliveries") >= 196))
        ) {
            set("choiceAdventure1412", 4);
            use(1, $item`guzzlr tablet`);
        } else if (
            get("_guzzlrGoldDeliveries") < 3 &&
            get("guzzlrBronzeDeliveries") >= 5 &&
            (get("guzzlrGoldDeliveries") < 150 || get("guzzlrBronzeDeliveries") >= 196)
        ) {
            set("choiceAdventure1412", 3);
            use(1, $item`guzzlr tablet`);
        } else {
            set("choiceAdventure1412", 2);
            use(1, $item`guzzlr tablet`);
        }
    }

    if (get("questGuzzlr") !== "unstarted") {
        if (!guzzlrCheck() && !get("_guzzlrQuestAbandoned")) {
            dropGuzzlrQuest();
        }
    }

    if (get("questGuzzlr") === "unstarted") {
        if (
            get("_guzzlrPlatinumDeliveries") === 0 &&
            get("guzzlrGoldDeliveries") >= 5 &&
            (get("guzzlrPlatinumDeliveries") < 30 ||
                (get("guzzlrGoldDeliveries") >= 150 && get("guzzlrBronzeDeliveries") >= 196))
        ) {
            set("choiceAdventure1412", 4);
            use(1, $item`guzzlr tablet`);
        } else if (
            get("_guzzlrGoldDeliveries") < 3 &&
            get("guzzlrBronzeDeliveries") >= 5 &&
            (get("guzzlrGoldDeliveries") < 150 || get("guzzlrBronzeDeliveries") >= 196)
        ) {
            set("choiceAdventure1412", 3);
            use(1, $item`guzzlr tablet`);
        } else {
            set("choiceAdventure1412", 2);
            use(1, $item`guzzlr tablet`);
        }
    }

    let freeFightZone = defaultLocation;
    if (guzzlrCheck()) {
        freeFightZone = get("guzzlrQuestLocation") || defaultLocation;
        if (get("guzzlrQuestTier") === "platinum") {
            zonePotions.forEach((place) => {
                if (freeFightZone.zone === place.zone && haveEffect(place.effect) === 0) {
                    if (availableAmount(place.potion) === 0) {
                        buy(1, place.potion, 10000);
                    }
                    use(1, place.potion);
                }
            });
        }
    }
    if (freeFightZone === get("guzzlrQuestLocation")) {
        if (property.getString("guzzlrQuestBooze") === "Guzzlr cocktail set") {
            if (
                !$items`buttery boy, steamboat, ghiaccio colada, nog-on-the-cob, sourfinger`.some(
                    (drink) => have(drink)
                )
            ) {
                cliExecute("make buttery boy");
            }
        } else {
            const guzzlrBooze = $item`${get("guzzlrQuestBooze")}`;
            if (!guzzlrBooze) {
                freeFightZone = defaultLocation;
            } else if (itemAmount(guzzlrBooze) === 0) {
                print(`just picking up some booze before we roll`, "blue");
                cliExecute("acquire " + get("guzzlrQuestBooze"));
            }
        }
    }
    return freeFightZone;
}

function guzzlrCheck() {
    const guzzlZone = get("guzzlrQuestLocation");
    if (!guzzlZone) return false;
    const forbiddenZones: String[] = ["The Rabbit Hole"]; //can't stockpile these potions,
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
        if (guzzlZone.zone === place.zone && haveEffect(place.effect) === 0) {
            if (availableAmount(place.potion) === 0) {
                buy(1, place.potion, 10000);
            }
            use(1, place.potion);
        }
    });
    if (
        forbiddenZones.includes(guzzlZone.zone) ||
        !guzzlZone.wanderers ||
        guzzlZone === $location`The Oasis` ||
        guzzlZone === $location`The Bubblin' Caldera` ||
        guzzlZone.environment === "underwater" ||
        (guzzlZone === $location`Barrrney's Barrr` && !have($item`pirate fledges`)) ||
        guzzlZone.zone === "BatHole" ||
        !canAdv(guzzlZone, false)
    ) {
        return false;
    } else {
        return true;
    }
}

function dropGuzzlrQuest() {
    print("We hate this guzzlr quest!", "blue");
    set("choiceAdventure1412", "");
    visitUrl("inventory.php?tap=guzzlr", false);
    runChoice(1);
    runChoice(5);
}

interface famPick {
    familiar: Familiar;
    meatVal: number;
    probability: () => number;
}

const bjornFams = [
    {
        familiar: $familiar`puck man`,
        meatVal: mallPrice($item`yellow pixel`),
        probability: () => (get("_yellowPixelDropsCrown") < 25 ? 0.25 : 0),
    },
    {
        familiar: $familiar`grimstone golem`,
        meatVal: mallPrice($item`grimstone mask`),
        probability: () => (get("_grimstoneMaskDropsCrown") === 0 ? 0.5 : 0),
    },
    { familiar: $familiar`Knob Goblin Organ Grinder`, meatVal: 30, probability: () => 1 },
    {
        familiar: $familiar`garbage fire`,
        meatVal: mallPrice($item`burning newspaper`),
        probability: () => (get("_garbageFireDropsCrown") < 3 ? 0.5 : 0),
    },
    {
        familiar: $familiar`machine elf`,
        meatVal:
            (1 / 6) *
            (mallPrice($item`abstraction: sensation`) +
                mallPrice($item`abstraction: thought`) +
                mallPrice($item`abstraction: action`) +
                mallPrice($item`abstraction: category`) +
                mallPrice($item`abstraction: perception`) +
                mallPrice($item`abstraction: purpose`)),
        probability: () => (get("_abstractionDropsCrown") < 25 ? 0.2 : 0),
    },
    {
        familiar: $familiar`trick-or-treating tot`,
        meatVal: mallPrice($item`hoarded candy wad`),
        probability: () => (get("_hoardedCandyDropsCrown") < 3 ? 0.5 : 0),
    },
    {
        familiar: $familiar`warbear drone`,
        meatVal: mallPrice($item`warbear whosit`),
        probability: () => 1 / 4.5,
    },
    {
        familiar: $familiar`li'l xenomorph`,
        meatVal: mallPrice($item`lunar isotope`),
        probability: () => 0.05,
    },
    {
        familiar: $familiar`pottery barn owl`,
        meatVal: mallPrice($item`volcanic ash`),
        probability: () => 0.1,
    },
];

function testBjornFamiliar(fam: famPick) {
    return myFamiliar() === fam.familiar ? 0 : fam.meatVal * fam.probability();
}

export function pickBjorn() {
    const topPick = bjornFams.sort(
        (bjornFam1, bjornFam2) => testBjornFamiliar(bjornFam1) - testBjornFamiliar(bjornFam2)
    )[0];
    const raggedClaws =
        (5 / 1000) * (1 / 25) * mallPrice($item`huge bowl of candy`) +
        0.4 * mallPrice($item`chocolate saucepan`);
    equip($slot`back`, $item`buddy bjorn`);
    const familiarChoice =
        raggedClaws > testBjornFamiliar(topPick)
            ? $familiar`pair of ragged claws`
            : topPick.familiar;
    bjornifyFamiliar(familiarChoice);
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
                    quantitiesTaken.set(
                        item,
                        (quantitiesTaken.get(item) ?? 0) + (succeeded ? 1 : 0)
                    );
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
