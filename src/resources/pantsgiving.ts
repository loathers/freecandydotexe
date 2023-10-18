import { abort, isAccessible, Item, mallPrice, myLevel, runChoice, visitUrl } from "kolmafia";
import { $coinmaster, $item, get, have, maxBy } from "libram";
import { freecandyValue } from "../value";

type PantsgivingFood = {
  food: Item;
  costOverride?: () => number;
  canGet: () => boolean;
};
const pantsgivingFoods: PantsgivingFood[] = [
  {
    food: $item`glass of raw eggs`,
    costOverride: () => 0,
    canGet: () => have($item`glass of raw eggs`),
  },
  {
    food: $item`Affirmation Cookie`,
    canGet: () => true,
  },
  {
    food: $item`disco biscuit`,
    canGet: () => true,
  },
  {
    food: $item`ice rice`,
    canGet: () => true,
  },
  {
    food: $item`Tea, Earl Grey, Hot`,
    canGet: () => true,
  },
  {
    food: $item`Dreadsylvanian stew`,
    costOverride: () =>
      (10 / 20) *
      Math.max(
        freecandyValue($item`electric Kool-Aid`),
        freecandyValue($item`bottle of Bloodweiser`)
      ),
    canGet: () =>
      have($item`Freddy Kruegerand`, 10) &&
      isAccessible($coinmaster`The Terrified Eagle Inn`) &&
      myLevel() >= 20,
  },
  {
    food: $item`FantasyRealm turkey leg`,
    costOverride: () => 0,
    canGet: () => {
      if (!have($item`Rubee™`, 100)) return false;
      if (!get("_frToday") && !get("frAlways")) return false;
      if (have($item`FantasyRealm G. E. M.`)) return true;
      visitUrl("place.php?whichplace=realm_fantasy&action=fr_initcenter");
      runChoice(1);
      return have($item`FantasyRealm G. E. M.`);
    },
  },
];

let bestPantsgivingFood: PantsgivingFood;
export function getBestPantsgivingFood(): PantsgivingFood {
  if (!bestPantsgivingFood) {
    const options = pantsgivingFoods.filter(({ canGet }) => canGet());
    if (!options.length) abort("No available pantsgiving foods--this should never happen!");
    bestPantsgivingFood = maxBy(
      options,
      ({ food, costOverride }) => costOverride?.() ?? mallPrice(food),
      true
    );
  }

  return bestPantsgivingFood;
}
