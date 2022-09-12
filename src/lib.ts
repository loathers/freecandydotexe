import "core-js/modules/es.object.entries";
import {
  abort,
  adv1,
  cliExecute,
  descToItem,
  eat,
  equip,
  Familiar,
  getWorkshed,
  Item,
  Location,
  Monster,
  myAdventures,
  myFamiliar,
  myHp,
  myMaxhp,
  myMaxmp,
  myMp,
  numericModifier,
  print,
  restoreHp,
  restoreMp,
  runChoice,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $location,
  $slot,
  ActionSource,
  adventureMacro,
  ensureFreeRun,
  get,
  getSaleValue,
  have,
  JuneCleaver,
  Macro,
  PropertiesManager,
  property,
  tryFindFreeRun,
  uneffect,
  withProperty,
} from "libram";
import { isDarkMode } from "kolmafia";

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
      return Macro.cachedAutoAttacks.get(macro.name) ?? Macro.abort().toString();
    });
    if (afterCombatAction) afterCombatAction();
    n++;
  }
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

export function safeRestore(): void {
  if (myHp() < myMaxhp() * 0.5) {
    restoreHp(myMaxhp() * 0.9);
  }
  const mpTarget = Math.min(myMaxmp(), 200);
  if (myMp() < mpTarget) {
    if (
      (have($item`magical sausage`) || have($item`magical sausage casing`)) &&
      get("_sausagesEaten") < 23
    ) {
      eat($item`magical sausage`);
    } else restoreMp(mpTarget);
  }
}

export function findFreeRun(): ActionSource {
  return (
    tryFindFreeRun() ??
    ensureFreeRun({
      requireUnlimited: () => true,
      noFamiliar: () => true,
      noRequirements: () => true,
      maximumCost: () => get("autoBuyPriceLimit") ?? 20000,
    })
  );
}

export function coldMedicineCabinet(): void {
  if (getWorkshed() !== $item`cold medicine cabinet`) return;

  if (
    property.getNumber("_coldMedicineConsults") >= 5 ||
    property.getNumber("_nextColdMedicineConsult") > totalTurnsPlayed()
  ) {
    return;
  }
  const options = visitUrl("campground.php?action=workshed");
  let i = 0;
  let match;
  const regexp = /descitem\((\d+)\)/g;
  const itemChoices = new Map<Item, number>();

  while ((match = regexp.exec(options)) !== null) {
    i++;
    const item = descToItem(match[1]);
    itemChoices.set(item, i);
  }

  const bestItem = Array.from(itemChoices.keys())
    .map((i) => [i, getSaleValue(i)] as [Item, number])
    .sort((a, b) => b[1] - a[1])[0][0];
  const bestChoice = itemChoices.get(bestItem);
  if (bestChoice && bestChoice > 0) {
    visitUrl("campground.php?action=workshed");
    runChoice(bestChoice);
  }
}

export function printHighlight(message: string): void {
  const color = isDarkMode() ? "yellow" : "blue";
  print(message, color);
}

export function printError(message: string): void {
  const color = "red";
  print(message, color);
}

export const juneCleaverChoiceValues = {
  1467: {
    1: 0,
    2: 0,
    3: 5 * get("valueOfAdventure"),
  },
  1468: { 1: 0, 2: 5, 3: 0 },
  1469: { 1: 0, 2: $item`Dad's brandy`, 3: 1500 },
  1470: { 1: 0, 2: $item`teacher's pen`, 3: 0 },
  1471: { 1: $item`savings bond`, 2: 250, 3: 0 },
  1472: {
    1: $item`trampled ticket stub`,
    2: $item`fire-roasted lake trout`,
    3: 0,
  },
  1473: { 1: $item`gob of wet hair`, 2: 0, 3: 0 },
  1474: { 1: 0, 2: $item`guilty sprout`, 3: 0 },
  1475: { 1: $item`mother's necklace`, 2: 0, 3: 0 },
} as const;

export function valueJuneCleaverOption(result: Item | number): number {
  return result instanceof Item ? getSaleValue(result) : result;
}

export function bestJuneCleaverOption(id: typeof JuneCleaver.choices[number]): 1 | 2 | 3 {
  const options = [1, 2, 3] as const;
  return options
    .map((option) => ({
      option,
      value: valueJuneCleaverOption(juneCleaverChoiceValues[id][option]),
    }))
    .sort((a, b) => b.value - a.value)[0].option;
}

let juneCleaverSkipChoices: typeof JuneCleaver.choices[number][] | null;

function skipJuneCleaverChoices(): void {
  for (const choice of JuneCleaver.choices) {
    manager.setChoice(choice, bestJuneCleaverOption(choice));
  }

  if (JuneCleaver.skipsRemaining() > 0) {
    if (!juneCleaverSkipChoices) {
      juneCleaverSkipChoices = [...JuneCleaver.choices]
        .sort(
          (a, b) =>
            valueJuneCleaverOption(juneCleaverChoiceValues[a][bestJuneCleaverOption(a)]) -
            valueJuneCleaverOption(juneCleaverChoiceValues[b][bestJuneCleaverOption(b)])
        )
        .splice(0, 3);
    }
    for (const choice of juneCleaverSkipChoices) {
      manager.setChoice(choice, 4);
    }
  }
}

export function juneCleave(): boolean {
  if (get("_juneCleaverFightsLeft") <= 0) {
    cliExecute("checkpoint");
    equip($slot`weapon`, $item`June cleaver`);
    skipJuneCleaverChoices();
    withProperty("recoveryScript", "", () => {
      adventureMacro($location`Noob Cave`, Macro.abort());
      if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter"))) {
        uneffect($effect`Beaten Up`);
      }
    });

    cliExecute("outfit checkpoint");

    return [
      "Aunts not Ants",
      "Bath Time",
      "Beware of Aligator",
      "Delicious Sprouts",
      "Lost and Found",
      "Poetic Justice",
      "Summer Days",
      "Teacher's Pet",
    ].includes(get("lastEncounter"));
  }
  return false;
}
