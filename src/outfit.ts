import { buy, effectModifier, mallPrice, myFamiliar, numericModifier } from "kolmafia";
import { $effect, $familiar, $familiars, $item, $items, have, MaximizeOptions } from "libram";
import { clamp } from "./lib";

export class Requirement {
  maximizeParameters_: string[];
  maximizeOptions_: MaximizeOptions;

  constructor(maximizeParameters_: string[], maximizeOptions_: MaximizeOptions) {
    this.maximizeParameters_ = maximizeParameters_;
    this.maximizeOptions_ = maximizeOptions_;
  }

  maximizeParameters(): string[] {
    return this.maximizeParameters_;
  }

  maximizeOptions(): MaximizeOptions {
    return this.maximizeOptions_;
  }

  merge(other: Requirement): Requirement {
    const optionsA = this.maximizeOptions();
    const optionsB = other.maximizeOptions();
    return new Requirement([...this.maximizeParameters(), ...other.maximizeParameters()], {
      ...optionsA,
      ...optionsB,
      bonusEquip: new Map([
        ...(optionsA.bonusEquip?.entries() ?? []),
        ...(optionsB.bonusEquip?.entries() ?? []),
      ]),
      forceEquip: [...(optionsA.forceEquip ?? []), ...(optionsB.forceEquip ?? [])],
      preventEquip: [...(optionsA.preventEquip ?? []), ...(optionsB.preventEquip ?? [])],
      onlySlot: [...(optionsA.onlySlot ?? []), ...(optionsB.onlySlot ?? [])],
      preventSlot: [...(optionsA.preventSlot ?? []), ...(optionsB.preventSlot ?? [])],
    });
  }

  static merge(allRequirements: Requirement[]): Requirement {
    return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
  }
}

const actionRateBonus = () =>
  clamp(
    numericModifier("Familiar Action Bonus") +
      ($items`short stack of pancakes, short stick of butter, short glass of water`
        .map((item) => effectModifier(item, "Effect"))
        .some((effect) => have(effect))
        ? 1
        : 0),
    0,
    1
  );

const trickHats = $items`invisible bag, witch hat, beholed bedsheet`;
const adventureFamiliars = $familiars`temporal riftlet, unagnimated gnome`;
const stasisFamiliars = new Map<Familiar, [Number, Number]>([
  [$familiar`ninja pirate zombie robot`, [1 / 2, 0.11 * 6 * 11]],
  [$familiar`Cocoabo`, [1 / 3, 1/4 * 1.2 * 4 * 11]],
  [$familiar`stocking mimic`, [1 / 3, 1/4 * 1.2 * 4 * 11]],
  [$familiar`feather boa constrictor`, [1 / 2, 0.5 * 5 * 11]],
]);

export function trickOutfit() {
  if (!trickHats.some((hat) => have(hat))) {
    buy(1, trickHats.sort((a, b) => mallPrice(b) - mallPrice(a))[0]);
  }

  const trickHat = trickHats.find((hat) => have(hat)) || $item`beholed bedsheet`; //Just to stop it from being undefined
  const forceEquip = [trickHat];

  //Bonus Equips
  //Value +weight
}
