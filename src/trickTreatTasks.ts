import { abort, handlingChoice, lastChoice, myAdventures, runChoice, visitUrl } from "kolmafia";
import { get } from "libram";
import { treatOutfit, trickOutfit } from "./outfit";
import { CandyTask, State } from "./lib";
import { CandyStrategy } from "./combat";

export function ensureInHalloween(): void {
  const onPage = handlingChoice() && lastChoice() === 804;
  if (!onPage) visitUrl("place.php?whichplace=town&action=town_trickortreat");
  if (!handlingChoice() || lastChoice() !== 804) {
    abort("Unable to enter the trick-or-treating block!");
  }
}

function visitHouse(house: number): void {
  ensureInHalloween();
  runChoice(3, `whichhouse=${house}`);
}

const TRICK_TREAT_TASKS: CandyTask[] = [
  {
    name: "Treat",
    completed: () => !/[LS]/.test(get("_trickOrTreatBlock")),
    outfit: treatOutfit,
    do: (): void => {
      // We do all treat houses in a row as one task for speed reasons
      for (const [index, house] of [...get("_trickOrTreatBlock")].entries()) {
        if (house === "L" || house === "S") {
          visitHouse(index);
          if (house === "S") runChoice(2);
        }
      }
    },
  },
  {
    name: "Trick",
    completed: () => !get("_trickOrTreatBlock").includes("D"),
    do: (): void => {
      // Return after one house so other tasks can react to changes from combat.
      // Grimoire handles combat and any following multifights.
      const house = get("_trickOrTreatBlock").indexOf("D");
      if (house >= 0) visitHouse(house);
    },
    outfit: trickOutfit,
    combat: new CandyStrategy(),
  },
  {
    name: "Reset Block",
    ready: () => myAdventures() >= 5,
    completed: () => /[LDS]/.test(get("_trickOrTreatBlock")),
    do: (): void => {
      ensureInHalloween();
      runChoice(1);
      if (!/[LDS]/.test(get("_trickOrTreatBlock"))) {
        abort("Something went awry when finding a new block!");
      }
      State.blocks++;
    },
  },
];

export default TRICK_TREAT_TASKS;
