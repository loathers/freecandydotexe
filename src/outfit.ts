import "core-js/modules/es.object.entries";
import {
  bjornifyFamiliar,
  buy,
  canEquip,
  effectModifier,
  equippedItem,
  fullnessLimit,
  getOutfits,
  haveEquipped,
  mallPrice,
  myAdventures,
  myEffects,
  myFamiliar,
  myFullness,
  myLevel,
  numericModifier,
  outfitPieces,
  outfitTreats,
  runChoice,
  toEffect,
  toItem,
  toSlot,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import {
  $familiar,
  $familiars,
  $item,
  $items,
  $slot,
  $slots,
  get,
  getAverageAdventures,
  getFoldGroup,
  have,
  maximizeCached,
  property,
} from "libram";
import { BjornedFamiliar, pickBjorn } from "./bjorn";
import { clamp, saleValue, sum, sumNumbers } from "./lib";

const actionRateBonus = () =>
  numericModifier("Familiar Action Bonus") / 100 +
  ($items`short stack of pancakes, short stick of butter, short glass of water`
    .map((item) => effectModifier(item, "Effect"))
    .some((effect) => have(effect))
    ? 1
    : 0);

type stasisValue = {
  baseRate: number;
  meatPerLb: number;
};

const trickHats = $items`invisible bag, witch hat, beholed bedsheet, wolfman mask, pumpkinhead mask, mummy costume`;
const adventureFamiliars = $familiars`Temporal Riftlet, Reagnimated Gnome`;
const stasisFamiliars = new Map<Familiar, stasisValue>([
  [$familiar`Ninja Pirate Zombie Robot`, { baseRate: 1 / 2, meatPerLb: 14.52 }],
  [$familiar`Cocoabo`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Stocking Mimic`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Feather Boa Constrictor`, { baseRate: 1 / 3, meatPerLb: 27.5 }],
]);

//Note: both this and the weight --> weightvalue function undervalue weight. Consider fixing that.
let outfitWeightEstimate: number;
function estimateOutfitWeight(): number {
  if (!outfitWeightEstimate) {
    const accessoriesFree =
      3 -
      $items`Mr. Screege's spectacles, Mr. Cheeng's spectacles, lucky gold ring`.filter((item) =>
        have(item)
      ).length;
    const openSlots = [
      $slot`shirt`,
      ...(have($item`Buddy Bjorn`) ? [] : $slots`back`),
      ...(get("_pantogramModifier").includes("Drops Items") ? [] : $slots`pants`),
    ];
    const viableItems = Item.all().filter(
      (item) =>
        have(item) &&
        (openSlots.includes(toSlot(item)) || (toSlot(item) === $slot`acc1` && accessoriesFree))
    );
    const nonAccessoryWeightEquips = openSlots.map(
      (slot) =>
        viableItems
          .filter((item) => toSlot(item) === slot)
          .sort(
            (a, b) => numericModifier(b, "Familiar Weight") - numericModifier(a, "Familiar Weight")
          )[0]
    );
    const accessoryWeightEquips = accessoriesFree
      ? viableItems
          .filter((item) => toSlot(item) === $slot`acc1`)
          .sort(
            (a, b) => numericModifier(b, "Familiar Weight") - numericModifier(a, "Familiar Weight")
          )
          .splice(0, accessoriesFree)
      : [];
    outfitWeightEstimate =
      sum([...accessoryWeightEquips, ...nonAccessoryWeightEquips], (item: Item) =>
        numericModifier(item, "Familiar Weight")
      ) + (have($familiar`Temporal Riftlet`) ? 10 : 0);
  }
  return outfitWeightEstimate;
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
          (effectAndDuration) =>
            numericModifier(effectAndDuration.effect, "Familiar Weight") &&
            effectAndDuration.duration >= myAdventures()
        )
        .map((effectAndDuration) => effectAndDuration.effect),
      (effect) => numericModifier(effect, "Familiar Weight")
    );
  }
  return effectWeight;
}

export type fightType = "Kramco" | "Digitize" | "Voter" | "Trick" | "Ghost";
const bjornValue = (choice: BjornedFamiliar) => choice.meatVal() * choice.probability;

export function fightOutfit(type: fightType = "Trick"): void {
  if (!trickHats.some((hat) => have(hat))) {
    buy(1, trickHats.sort((a, b) => mallPrice(b) - mallPrice(a))[0]);
  }
  const trickHat = trickHats.find((hat) => have(hat)) || $item`beholed bedsheet`; //Just to stop it from being undefined

  const forceEquips: Item[] = [];

  const bonusEquips = new Map<Item, number>([
    [$item`lucky gold ring`, 400],
    [$item`Mr. Cheeng's spectacles`, 250],
    [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
    [$item`Mr. Screege's spectacles`, 180],
    [
      $item`bag of many confections`,
      saleValue(...$items`Polka Pop, BitterSweetTarts, Piddles`) / 6,
    ],
    ...snowSuit(),
    ...mayflowerBouquet(),
    ...pantsgiving(),
  ]);

  switch (type) {
    case "Kramco":
      forceEquips.push($item`Kramco Sausage-o-Matic™`);
      break;
    case "Voter":
      forceEquips.push($item`"I Voted!" sticker`);
      break;
    case "Ghost":
      forceEquips.push($item`protonic accelerator pack`);
      break;
    case "Trick":
      forceEquips.push(trickHat);
      break;
  }

  if (
    forceEquips.every((item) => toSlot(item) !== $slot`back`) &&
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed()
  )
    forceEquips.push($item`protonic accelerator pack`);

  const stasisData = stasisFamiliars.get(myFamiliar());
  if (stasisData) {
    if (
      stasisData.baseRate + actionRateBonus() < 1 &&
      getFoldGroup($item`Loathing Legion helicopter`).some((foldable) => have(foldable))
    ) {
      forceEquips.push($item`Loathing Legion helicopter`);
    }
  }
  if (myFamiliar() === $familiar`Reagnimated Gnome`) {
    forceEquips.push($item`gnomish housemaid's kgnee`);
    if (!have($item`gnomish housemaid's kgnee`)) {
      visitUrl("arena.php");
      runChoice(4);
    }
  }

  const weightValue = stasisData
    ? clamp(
        stasisData.baseRate +
          actionRateBonus() +
          (forceEquips.includes($item`Loathing Legion helicopter`) &&
          !haveEquipped($item`Loathing Legion helicopter`)
            ? 0.25
            : 0),
        0,
        1
      ) * stasisData.meatPerLb
    : adventureFamiliars.includes(myFamiliar())
    ? (1000 * baseAdventureValue()) /
      Math.pow(1000 - (estimateOutfitWeight() + getEffectWeight() + 20), 2)
    : 0;

  const bjornalikeToUse =
    have($item`Buddy Bjorn`) && forceEquips.every((item) => toSlot(item) !== $slot`back`)
      ? $item`Buddy Bjorn`
      : $item`Crown of Thrones`;
  if (have(bjornalikeToUse)) bonusEquips.set(bjornalikeToUse, bjornValue(pickBjorn()));

  maximizeCached([`${Math.round(weightValue * 100) / 100} Familiar Weight`], {
    forceEquip: forceEquips,
    bonusEquip: bonusEquips,
    preventSlot: $slots`buddy-bjorn, crown-of-thrones`,
    preventEquip: [bjornalikeToUse === $item`Buddy Bjorn` ? $item`Crown of Thrones` : $item`Buddy Bjorn`]
  });
  if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(pickBjorn().familiar);
  if (haveEquipped($item`Crown of Thrones`)) bjornifyFamiliar(pickBjorn().familiar);
}

function snowSuit() {
  if (!have($item`Snow Suit`) || get("_carrotNoseDrops") >= 3) return new Map<Item, number>([]);

  return new Map<Item, number>([[$item`Snow Suit`, saleValue($item`carrot nose`) / 10]]);
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
    saleValue(
      ...$items`tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia`
    ) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return new Map<Item, number>([[$item`Mayflower bouquet`, averageFlowerValue]]);
}

function pantsgiving(): Map<Item, number> {
  if (!have($item`Pantsgiving`)) return new Map<Item, number>();
  const count = get("_pantsgivingCount");
  const turnArray = [5, 50, 500, 5000];
  const index =
    myFullness() === fullnessLimit()
      ? get("_pantsgivingFullness")
      : turnArray.findIndex((x) => count < x);
  const turns = turnArray[index] || 50000;

  if (turns - count > myAdventures()) return new Map<Item, number>();
  const food = getPantsgivingFood();
  const value =
    food === $item`Dreadsylvanian stew`
      ? (1 / 20) *
        Math.max(mallPrice($item`electric Kool-Aid`), mallPrice($item`bottle of Bloodweiser`))
      : mallPrice(food);
  const fullnessValue =
    overallAdventureValue() * (getAverageAdventures(food) + 1 + (get("_fudgeSporkUsed") ? 3 : 0)) -
    value -
    mallPrice($item`Special Seasoning`) -
    (get("_fudgeSporkUsed") ? mallPrice($item`fudge spork`) : 0);
  const pantsgivingBonus = fullnessValue / (turns * 0.9);
  return new Map<Item, number>([[$item`Pantsgiving`, pantsgivingBonus]]);
}

function overallAdventureValue(): number {
  const bonuses = new Map<Item, number>([
    [$item`lucky gold ring`, 400],
    [$item`Mr. Cheeng's spectacles`, 250],
    [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
    [$item`Mr. Screege's spectacles`, 180],
    [
      $item`bag of many confections`,
      saleValue(...$items`Polka Pop, BitterSweetTarts, Piddles`) / 6,
    ],
    ...snowSuit(),
    ...mayflowerBouquet(),
  ]);
  const treatsAndBonusEquips =
    sum(
      Slot.all().map((slot) => {
        const equip = equippedItem(slot);
        const bonus = bonuses.get(equip);
        return bonus === undefined ? 0 : bonus;
      }),
      (number: number) => number
    ) +
    baseAdventureValue() +
    (haveEquipped($item`Buddy Bjorn`) || haveEquipped($item`Crown of Thrones`)
      ? bjornValue(pickBjorn())
      : 0);
  const stasisData = stasisFamiliars.get(myFamiliar());
  if (stasisData) {
    return (
      treatsAndBonusEquips +
      (20 + estimateOutfitWeight() + getEffectWeight()) *
        (stasisData.meatPerLb * clamp(stasisData.baseRate + actionRateBonus(), 0, 1))
    );
  } else if (adventureFamiliars.includes(myFamiliar())) {
    return (
      (treatsAndBonusEquips * 1000) /
      Math.pow(1000 - getEffectWeight() - estimateOutfitWeight() - 20, 2)
    );
  } else return treatsAndBonusEquips;
}

let pantsgivingFood: Item;
export function getPantsgivingFood(): Item {
  if (!pantsgivingFood) {
    if (get("affirmationCookiesEaten") >= 4) pantsgivingFood = $item`Affirmation Cookie`;
    else if (
      myLevel() >= 20 &&
      (have($item`Dreadsylvanian stew`) || have($item`Freddy Kruegerand`, 20))
    )
      pantsgivingFood = $item`Dreadsylvanian stew`;
    else pantsgivingFood = $item`meteoreo`;
  }
  return pantsgivingFood;
}

let cachedBaseAdventureValue: number;
export function baseAdventureValue(): number {
  if (cachedBaseAdventureValue === undefined) {
    cachedBaseAdventureValue =
      (1 / 5) *
      (3 *
        sumNumbers(
          Object.entries(outfitTreats(bestOutfit())).map(
            ([candyName, probability]) => saleValue(toItem(candyName)) * probability
          )
        ) *
        (have($familiar`Trick-or-Treating Tot`) ? 1.6 : 0) +
        (1 / 5) * saleValue($item`huge bowl of candy`) +
        (have($familiar`Trick-or-Treating Tot`) ? 4 * 0.2 * saleValue($item`Prunets`) : 0));
  }
  return cachedBaseAdventureValue;
}

let bestFit: string;
export function bestOutfit(): string {
  if (!bestFit) {
    const playerChosenOutfit = property.getString("freecandy_TreatOutfit");
    if (playerChosenOutfit) bestFit = playerChosenOutfit;

    const flyestFit = getOutfits()
      .filter((outfitName) => outfitPieces(outfitName).every((fit) => canEquip(fit)))
      .map(
        (outfitName) =>
          [
            outfitName,
            sum(
              Object.entries(outfitTreats(outfitName)).map(
                ([candyName, probability]) => saleValue(toItem(candyName)) * probability
              ),
              (number) => number
            ),
          ] as [string, number]
      )
      .sort((a, b) => b[1] - a[1])[0][0];

    if (!flyestFit) throw "You somehow have no outfits, dude!";
    bestFit = flyestFit;
  }
  return bestFit;
}
