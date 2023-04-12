import { abort, inMultiFight, myAdventures, runChoice, runCombat, visitUrl } from "kolmafia";
import { treatOutfit, trickOutfit } from "./outfit";
import { CandyTask } from "./lib";
import { CandyStrategy } from "./combat";
import CandyState from "./state";

const HOUSE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const TRICK_TREAT_TASKS: CandyTask[] = [
  {
    name: "Treat",
    ready: () => !CandyState.treated,
    completed: () => !CandyState.blockHtml.match(/whichhouse=\d*>[^>]*?house_l/),
    outfit: treatOutfit,
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (CandyState.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_l`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
        } else if (CandyState.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?starhouse`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          runChoice(2);
          CandyState.refreshBlock();
        }
      }
      CandyState.treated = true;
    },
  },
  {
    name: "Trick",
    ready: () => CandyState.tricked.length < HOUSE_NUMBERS.length,
    completed: () => !CandyState.blockHtml.match(/whichhouse=\d*>[^>]*?house_d/),
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (CandyState.tricked.includes(house)) continue;
        CandyState.tricked.push(house);
        if (CandyState.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_d`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          do {
            runCombat();
          } while (inMultiFight());
          return;
        }
      }
    },
    outfit: trickOutfit,
    combat: new CandyStrategy(),
  },
  {
    name: "Reset Block",
    completed: (): boolean => {
      CandyState.refreshBlock();
      return CandyState.blockHtml.includes("whichhouse=");
    },
    ready: () => myAdventures() >= 5,
    do: (): void => {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
      CandyState.resetBlock();
      if (!CandyState.blockHtml.includes("whichhouse="))
        abort("Something went awry when finding a new block!");
    },
  },
].map((task) => ({ ...task, tricktreat: true }));

export default TRICK_TREAT_TASKS;
