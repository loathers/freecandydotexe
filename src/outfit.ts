import { Outfit, OutfitSpec } from "grimoire-kolmafia";
import {
  abort,
  buy,
  canEquip,
  effectModifier,
  equippedItem,
  Familiar,
  fullnessLimit,
  getOutfits,
  haveEquipped,
  inebrietyLimit,
  Item,
  mallPrice,
  myAdventures,
  myEffects,
  myFullness,
  myInebriety,
  numericModifier,
  outfitPieces,
  outfitTreats,
  Slot,
  toEffect,
  toItem,
  toJson,
  toSlot,
  totalTurnsPlayed,
  userConfirm,
} from "kolmafia";
import args from "./args";
import {
  $familiar,
  $familiars,
  $item,
  $items,
  $monster,
  $skill,
  $slot,
  $slots,
  clamp,
  CrownOfThrones,
  findLeprechaunMultiplier,
  get,
  getAverageAdventures,
  getFoldGroup,
  getSaleValue,
  have,
  maxBy,
  SongBoom,
  sum,
  sumNumbers,
} from "libram";
import { printError, printHighlight } from "./lib";
import { getBestPantsgivingFood, juneCleaverBonusEquip } from "./resources";

function treatValue(outfit: string): number {
  return sum(
    Object.entries(outfitTreats(outfit)),
    ([candyName, probability]) => probability * getSaleValue(toItem(candyName))
  );
}

function dropsValueFunction(drops: Item[] | Map<Item, number>): number {
  return Array.isArray(drops)
    ? getSaleValue(...drops)
    : sum([...drops.entries()], ([item, quantity]) => quantity * getSaleValue(item)) /
        sumNumbers([...drops.values()]);
}

function ensureBjorn(weightValue: number, meatValue = 0): CrownOfThrones.FamiliarRider {
  const key = `weight:${weightValue.toFixed(3)};meat:${meatValue}`;
  if (!CrownOfThrones.hasRiderMode(key)) {
    CrownOfThrones.createRiderMode(key, {
      dropsValueFunction,
      modifierValueFunction: CrownOfThrones.createModifierValueFunction(
        ["Familiar Weight", "Meat Drop"],
        {
          "Familiar Weight": (x) => weightValue * x,
          "Meat Drop": (x) => meatValue * x,
        }
      ),
    });
  }

  const result = CrownOfThrones.pickRider(key);
  if (!result) abort("Failed to make sensible bjorn decision!");

  return result;
}

export function getTreatOutfit(): string {
  if (!args.treatOutfit) {
    const availableOutfits = getOutfits().filter((name) =>
      outfitPieces(name).every((piece) => canEquip(piece))
    );

    printError(`No treatOutfit given--doing some math to decide what to use`);

    if (!availableOutfits.length) {
      abort("You don't seem to actually have any outfits available, my friend!");
    }

    args.treatOutfit = maxBy(availableOutfits, treatValue);
    printHighlight(`We have a winner! We'll be trick-or-treating with ${args.treatOutfit}.`);
  }

  return args.treatOutfit;
}

let _baseAdventureValue: number;
function baseAdventureValue(): number {
  if (!_baseAdventureValue) {
    const outfitCandyValue = treatValue(getTreatOutfit());
    const totOutfitCandyMultiplier = have($familiar`Trick-or-Treating Tot`) ? 1.6 : 1;
    const bowlValue = (1 / 5) * getSaleValue($item`huge bowl of candy`);
    const prunetsValue = have($familiar`Trick-or-Treating Tot`)
      ? 4 * 0.2 * getSaleValue($item`Prunets`)
      : 0;

    const outfitCandyTotal = 3 * outfitCandyValue * totOutfitCandyMultiplier;
    _baseAdventureValue = (1 / 5) * (outfitCandyTotal + bowlValue + prunetsValue);
  }
  return _baseAdventureValue;
}

function snowSuit() {
  if (!have($item`Snow Suit`) || get("_carrotNoseDrops") >= 3) return new Map<Item, number>([]);

  return new Map<Item, number>([[$item`Snow Suit`, getSaleValue($item`carrot nose`) / 10]]);
}

function mayflowerBouquet() {
  // +40% meat drop 12.5% of the time (effectively 5%)
  // Drops flowers 50% of the time, wiki says 5-10 a day.
  // Theorized that flower drop rate drops off but no info on wiki.
  // During testing I got 4 drops then the 5th took like 40 more adventures
  // so let's just assume rate drops by 11% with a min of 1% ¯\_(ツ)_/¯

  if (!have($item`Mayflower bouquet`) || get("_mayflowerDrops") >= 10)
    return new Map<Item, number>([]);

  const averageFlowerValue =
    getSaleValue(
      ...$items`tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia`
    ) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return new Map<Item, number>([[$item`Mayflower bouquet`, averageFlowerValue]]);
}

function sweatpants() {
  if (!have($item`designer sweatpants`)) return new Map();

  const needSweat = get("sweat") < 25 * (3 - get("_sweatOutSomeBoozeUsed"));

  if (!needSweat) return new Map();

  const VOA = get("valueOfAdventure");

  const bestPerfectDrink = maxBy(
    $items`perfect cosmopolitan, perfect negroni, perfect dark and stormy, perfect mimosa, perfect old-fashioned, perfect paloma`,
    mallPrice,
    true
  );
  const perfectDrinkValuePerDrunk =
    (getAverageAdventures(bestPerfectDrink) * VOA - mallPrice(bestPerfectDrink)) / 3;
  const splendidMartiniValuePerDrunk =
    (getAverageAdventures($item`splendid martini`) + 2) * VOA - mallPrice($item`splendid martini`);

  const bonus = (Math.max(perfectDrinkValuePerDrunk, splendidMartiniValuePerDrunk) * 2) / 25;
  return new Map([[$item`designer sweatpants`, bonus]]);
}

function pantogram() {
  if (!have($item`pantogram pants`) || !get("_pantogramModifier").includes("Drops Items"))
    return new Map();
  return new Map([[$item`pantogram pants`, 100]]);
}

function reallyEasyBonuses() {
  return new Map<Item, number>(
    (
      [
        [$item`lucky gold ring`, 400],
        [$item`Mr. Cheeng's spectacles`, 250],
        [$item`Mr. Screege's spectacles`, 180],
      ] as [Item, number][]
    ).filter(([item]) => have(item))
  );
}

function easyBonuses() {
  return new Map<Item, number>([
    ...reallyEasyBonuses(),
    ...juneCleaverBonusEquip(),
    ...snowSuit(),
    ...mayflowerBouquet(),
    ...sweatpants(),
    ...pantogram(),
  ]);
}

let estimatedOutfitWeight: number;
function getEstimatedOutfitWeight(): number {
  if (!estimatedOutfitWeight) {
    const bonuses = easyBonuses();

    const freeAccessories = 3 - clamp([...easyBonuses().keys()].length, 0, 3);
    const openSlots = [
      ...$slots`shirt, weapon, off-hand`,
      ...(have($item`Buddy Bjorn`) ? [] : $slots`back`),
      ...(bonuses.has($item`pantogram pants`) ? [] : $slots`pants`),
    ];

    const viableItems = Item.all().filter(
      (item) =>
        have(item) &&
        (openSlots.includes(toSlot(item)) || (toSlot(item) === $slot`acc1` && freeAccessories > 0))
    );

    const nonAccessoryWeightEquips = openSlots.map((slot) =>
      maxBy(
        viableItems.filter((item) => toSlot(item) === slot),
        (item) => numericModifier(item, "Familiar Weight")
      )
    );

    const accessoryWeightEquips = freeAccessories
      ? viableItems
          .filter((item) => toSlot(item) === $slot`acc1`)
          .sort(
            (a, b) => numericModifier(b, "Familiar Weight") - numericModifier(a, "Familiar Weight")
          )
          .splice(0, freeAccessories)
      : [];

    estimatedOutfitWeight =
      sum([...accessoryWeightEquips, ...nonAccessoryWeightEquips], (item: Item) =>
        numericModifier(item, "Familiar Weight")
      ) +
      (have($familiar`Temporal Riftlet`) ? 10 : 0) +
      (have($skill`Amphibian Sympathy`) ? 5 : 0);
  }

  return estimatedOutfitWeight;
}

let effectWeight: number;
function getEffectWeight(): number {
  if (!effectWeight) {
    effectWeight = sum(
      Object.entries(myEffects())
        .map(([name, duration]) => {
          return {
            effect: toEffect(name),
            duration: duration,
          };
        })
        .filter(
          ({ effect, duration }) =>
            numericModifier(effect, "Familiar Weight") && duration >= myAdventures()
        ),
      ({ effect }) => numericModifier(effect, "Familiar Weight")
    );
  }
  return effectWeight;
}

function overallAdventureValue(): number {
  const bonuses = easyBonuses();
  const bjornChoice = ensureBjorn(0);
  const bjornValue =
    bjornChoice && (bjornChoice.dropPredicate?.() ?? true)
      ? bjornChoice.probability *
        (typeof bjornChoice.drops === "number"
          ? bjornChoice.drops
          : dropsValueFunction(bjornChoice.drops))
      : 0;
  const itemAndMeatValue =
    sum(Slot.all(), (slot) => bonuses.get(equippedItem(slot)) ?? 0) +
    baseAdventureValue() +
    (haveEquipped($item`Buddy Bjorn`) || haveEquipped($item`Crown of Thrones`) ? bjornValue : 0);

  const stasisData = stasisFamiliars.get(args.familiar);
  if (stasisData) {
    return (
      itemAndMeatValue +
      (20 + getEstimatedOutfitWeight() + getEffectWeight()) *
        stasisData.meatPerLb *
        clamp(stasisData.baseRate + actionRateBonus(), 0, 1)
    );
  } else if (adventureFamiliars.includes(args.familiar)) {
    return (itemAndMeatValue * 1000) / (1000 - getEffectWeight() - getEstimatedOutfitWeight() - 20);
  } else return itemAndMeatValue;
}

function pantsgiving(): Map<Item, number> {
  if (!have($item`Pantsgiving`)) return new Map<Item, number>();
  const count = get("_pantsgivingCount");
  const turnArray = [5, 50, 500, 5000];
  const index =
    myFullness() === fullnessLimit()
      ? get("_pantsgivingFullness")
      : turnArray.findIndex((x) => count < x);
  const turns = turnArray[index] ?? 50000;

  if (turns - count > myAdventures()) return new Map<Item, number>();
  const { food, costOverride } = getBestPantsgivingFood();
  const fullnessValue =
    overallAdventureValue() * (getAverageAdventures(food) + 1 + (get("_fudgeSporkUsed") ? 3 : 0)) -
    (costOverride?.() ?? mallPrice(food)) -
    mallPrice($item`Special Seasoning`) -
    (get("_fudgeSporkUsed") ? mallPrice($item`fudge spork`) : 0);
  const pantsgivingBonus = fullnessValue / (turns * 0.9);
  return new Map<Item, number>([[$item`Pantsgiving`, pantsgivingBonus]]);
}

function fullBonuses() {
  return new Map([...easyBonuses(), ...pantsgiving()]);
}

export function treatOutfit(): Outfit {
  const outfit = new Outfit();
  const pieces = outfitPieces(getTreatOutfit());
  for (const piece of pieces) {
    if (!outfit.equip(piece))
      abort(`Could not equip all pieces of treat outfit: aborted on ${piece}`);
  }

  outfit.equip($item`lucky Crimbo tiki necklace`);
  outfit.equip($familiar`Trick-or-Treating Tot`);
  outfit.equip($familiar`Comma Chameleon`)
  return outfit;
}

const adventureFamiliars = $familiars`Temporal Riftlet, Reagnimated Gnome`;
// https://www.desmos.com/calculator/y8iszw6rfk
// Very basic linear approximation of the value of additional weight
const MAGIC_NUMBER = 0.00123839009288;

type stasisValue = {
  baseRate: number;
  meatPerLb: number;
};

const stasisFamiliars = new Map<Familiar, stasisValue>([
  [$familiar`Ninja Pirate Zombie Robot`, { baseRate: 1 / 2, meatPerLb: 14.52 }],
  [$familiar`Cocoabo`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Stocking Mimic`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Feather Boa Constrictor`, { baseRate: 1 / 3, meatPerLb: 27.5 }],
]);
const actionRateBonus = () =>
  numericModifier("Familiar Action Bonus") / 100 +
  ($items`short stack of pancakes, short stick of butter, short glass of water`
    .map((item) => effectModifier(item, "Effect"))
    .some((effect) => have(effect))
    ? 1
    : 0);

export function combatOutfit(base: OutfitSpec = {}): Outfit {
  const outfit = Outfit.from(
    base,
    new Error(`Failed to construct outfit from spec ${toJson(base)}`)
  );
  outfit.equip(args.familiar);

  if (outfit.familiar === $familiar`Reagnimated Gnome`) {
    outfit.equip($item`gnomish housemaid's kgnee`);
  }

  if (
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed() &&
    myInebriety() <= inebrietyLimit()
  ) {
    outfit.equip($item`protonic accelerator pack`);
  }

  let weightValue = 0;
  if (!outfit.familiar) {
    abort(
      "It looks like we're about to go adventuring without a familiar, and that feels deeply wrong"
    );
  }
  if (adventureFamiliars.includes(outfit.familiar)) {
    weightValue = Math.round(MAGIC_NUMBER * baseAdventureValue() * 100) / 100;
  } else {
    const stasisData = stasisFamiliars.get(outfit.familiar);
    if (stasisData) {
      const actionRate = stasisData.baseRate + actionRateBonus();
      if (
        actionRate < 1 &&
        getFoldGroup($item`Loathing Legion helicopter`).some((foldable) => have(foldable))
      ) {
        outfit.equip($item`Loathing Legion helicopter`);
      }
      const fullRate = clamp(
        actionRate + (outfit.haveEquipped($item`Loathing Legion helicopter`) ? 0.25 : 0),
        0,
        1
      );
      weightValue = fullRate * stasisData.meatPerLb;
    } else if (SongBoom.song() === "Total Eclipse of Your Meat") {
      outfit.modifier.push("0.25 Meat Drop");
    } else {
      outfit.modifier.push("0.01 Item Drop");
    }
  }

  if (weightValue) {
    const rounded = 1000 * Math.round(weightValue / 1000);
    outfit.modifier.push(`${rounded} Familiar Weight`);
  }

  const bjornChoice = ensureBjorn(weightValue);
  if (have($item`Buddy Bjorn`)) {
    outfit.equip($item`Buddy Bjorn`);
    outfit.bjornify(bjornChoice.familiar);
  } else if (have($item`Crown of Thrones`)) {
    outfit.equip($item`Crown of Thrones`);
    outfit.enthrone(bjornChoice.familiar);
  }

  outfit.bonuses = fullBonuses();

  return outfit;
}

let askedAboutTwoPiece = false;
const trickHats = $items`invisible bag, witch hat, beholed bedsheet, wolfman mask, pumpkinhead mask, mummy costume`;
const twoPieces = ["Eldritch Equipage", "Bugbear Costume", "Filthy Hippy Disguise"];
export function trickOutfit(): Outfit {
  if (args.trickOutfit) {
    const outfit = new Outfit();
    outfit.equip(args.familiar);
    for (const piece of outfitPieces(args.trickOutfit)) {
      if (!outfit.equip(piece)) {
        abort(`Failed to equip ${piece} from trick outfit ${args.trickOutfit}`);
      }
    }
    return outfit;
  }

  if (!trickHats.some((hat) => have(hat))) {
    buy(1, maxBy(trickHats, mallPrice, true));
  }
  const trickHat = trickHats.find((i) => have(i));
  if (!trickHat) {
    const twoPiece = twoPieces.find((outfit) =>
      outfitPieces(outfit).every((i) => have(i) && canEquip(i))
    );
    if (!twoPiece) {
      abort("Unable to find a good 1-piece or 2-piece outfit for trick-or-treating");
    }
    if (
      !askedAboutTwoPiece &&
      !userConfirm(
        "We don't have access to a one-piece outfit, but we did find a two-piece outfit. Is that alright?"
      )
    ) {
      printError("We cannot create a good trick outfit, and must give up.");
      abort();
    } else {
      askedAboutTwoPiece = true;
    }
    const outfit = new Outfit();
    for (const piece of outfitPieces(twoPiece)) {
      if (!outfit.equip(piece)) abort(`Unable to equip ${piece} from ${twoPiece}!`);
    }
    return combatOutfit(outfit.spec());
  }

  return combatOutfit({ hat: trickHat });
}

export function digitizeOutfit(): Outfit {
  if (get("_sourceTerminalDigitizeMonster") === $monster`Knob Goblin Embezzler`) {
    const outfit = new Outfit();
    const meatFamiliar = maxBy(
      Familiar.all().filter((f) => have(f)),
      findLeprechaunMultiplier
    );
    outfit.equip(meatFamiliar);
    const baseMeat = 1000 + (SongBoom.song() === "Total Eclipse of Your Meat" ? 25 : 0);

    const leprechaunMultiplier = findLeprechaunMultiplier(meatFamiliar);
    const leprechaunCoefficient =
      (baseMeat / 100) * (2 * leprechaunMultiplier + Math.sqrt(leprechaunMultiplier));

    const bjornChoice = ensureBjorn(leprechaunCoefficient, baseMeat / 100);
    if (have($item`Buddy Bjorn`)) {
      outfit.equip($item`Buddy Bjorn`);
      outfit.bjornify(bjornChoice.familiar);
    } else if (have($item`Crown of Thrones`)) {
      outfit.equip($item`Crown of Thrones`);
      outfit.enthrone(bjornChoice.familiar);
    }

    outfit.modifier.push(`${baseMeat / 100} Meat Drop`);
    outfit.modifier.push("0.72 Item Drop");

    outfit.bonuses = fullBonuses();
    return outfit;
  }

  return combatOutfit();
}
