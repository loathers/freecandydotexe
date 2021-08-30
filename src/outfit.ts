import {
  buy,
  effectModifier,
  fullnessLimit,
  haveEquipped,
  mallPrice,
  myAdventures,
  myFamiliar,
  myFullness,
  numericModifier,
  toSlot,
} from "kolmafia";
import { $familiar, $familiars, $item, $items, $slot, get, getFoldGroup, have } from "libram";
import { BjornedFamiliar, pickBjorn } from "./bjorn";
import { clamp, saleValue } from "./lib";

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

const trickHats = $items`invisible bag, witch hat, beholed bedsheet`;
const adventureFamiliars = $familiars`Temporal Riftlet, Reagnimated Gnome`;
const stasisFamiliars = new Map<Familiar, stasisValue>([
  [$familiar`Ninja Pirate Zombie Robot`, { baseRate: 1 / 2, meatPerLb: 14.52 }],
  [$familiar`Cocoabo`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Stocking Mimic`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Feather Boa Constrictor`, { baseRate: 1 / 3, meatPerLb: 27.5 }],
]);

type fightType = "Kramco" | "Digitize" | "Voter" | "Trick" | "Ghost";

export function figthOutfit(type: fightType = "Trick"): void {
  if (!trickHats.some((hat) => have(hat))) {
    buy(1, trickHats.sort((a, b) => mallPrice(b) - mallPrice(a))[0]);
  }
  const trickHat = trickHats.find((hat) => have(hat)) || $item`beholed bedsheet`; //Just to stop it from being undefined

  const forceEquips: Item[] = [];

  const bonusEquips = new Map<Item, number>([
    [$item`garbage sticker`, 100],
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
      bonusEquips.delete($item`garbage sticker`);
      break;
    case "Voter":
      forceEquips.push($item`"I Voted!" sticker`);
      if (get("_voteMonster")?.maxMeat) bonusEquips.delete($item`garbage sticker`);
      break;
    case "Ghost":
      forceEquips.push($item`protonic accelerator pack`);
      break;
    case "Trick":
      forceEquips.push(trickHat);
      break;
  }

  const stasisData = stasisFamiliars.get(myFamiliar());
  if (stasisData) {
    if (
      stasisData.baseRate + actionRateBonus() < 1 &&
      getFoldGroup($item`Loathing Legion helicopter`).some((foldable) => have(foldable))
    ) {
      forceEquips.push($item`Loathing Legion helicopter`);
    }
  }
  if (myFamiliar() === $familiar`Reagnimated Gnome`)
    forceEquips.push($item`gnomish housemaid's kgnee`);

  const baseMeat = 3;

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
    ? (1000 * baseMeat) / Math.pow(1000 - 130, 2)
    : 0;

  const bjornalikeToUse =
    have($item`Buddy Bjorn`) && forceEquips.every((item) => toSlot(item) !== $slot`back`)
      ? $item`Buddy Bjorn`
      : $item`Crown of Thrones`;
  const bjornValue = (choice: BjornedFamiliar) => choice.meatVal() * choice.probability;
  if (have(bjornalikeToUse)) bonusEquips.set(bjornalikeToUse, bjornValue(pickBjorn()));
  //Bonus Equips
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

  const fullnessValue =
    get("valueOfAdventure") * 6.5 -
    (mallPrice($item`jumping horseradish`) + mallPrice($item`Special Seasoning`));
  const pantsgivingBonus = fullnessValue / (turns * 0.9);
  return new Map<Item, number>([[$item`Pantsgiving`, pantsgivingBonus]]);
}
