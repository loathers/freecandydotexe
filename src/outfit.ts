import {
  buy,
  effectModifier,
  haveEquipped,
  mallPrice,
  myFamiliar,
  numericModifier,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $familiars,
  $item,
  $items,
  getFoldGroup,
  have,
  MaximizeOptions,
} from "libram";
import { clamp } from "./lib";

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
const adventureFamiliars = $familiars`temporal riftlet, unagnimated gnome`;
const stasisFamiliars = new Map<Familiar, stasisValue>([
  [$familiar`ninja pirate zombie robot`, { baseRate: 1 / 2, meatPerLb: 14.52 }],
  [$familiar`Cocoabo`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`stocking mimic`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`feather boa constrictor`, { baseRate: 1 / 3, meatPerLb: 27.5 }],
]);

export function trickOutfit() {
  if (!trickHats.some((hat) => have(hat))) {
    buy(1, trickHats.sort((a, b) => mallPrice(b) - mallPrice(a))[0]);
  }
  const trickHat = trickHats.find((hat) => have(hat)) || $item`beholed bedsheet`; //Just to stop it from being undefined

  const forceEquips = [trickHat];

  const stasisData = stasisFamiliars.get(myFamiliar());
  if (stasisData) {
    if (
      stasisData.baseRate + actionRateBonus() < 1 &&
      getFoldGroup($item`Loathing Legion Helicopter`).some((foldable) => have(foldable))
    ) {
      forceEquips.push($item`loathing Legion helicopter`);
    }
  }

  const baseMeat = 3;

  const weightValue = stasisData
    ? clamp(
        stasisData.baseRate +
          actionRateBonus() +
          (forceEquips.includes($item`loathing legion helicopter`) &&
          !haveEquipped($item`loathing legion helicopter`)
            ? 0.25
            : 0),
        0,
        1
      ) * stasisData.meatPerLb
    : adventureFamiliars.includes(myFamiliar())
    ? (1000 * baseMeat) / Math.pow(1000 - 130, 2)
    : 0;

  //Bonus Equips
}
