import { abort, inMultiFight, myAdventures, runChoice, runCombat, visitUrl } from "kolmafia";
import CandyEngine from "./engine";
import { treatOutfit, trickOutfit } from "./outfit";
import { CandyTask } from "./lib";

const HOUSE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const TRICK_TREAT_TASKS: CandyTask[] = [
  {
    name: "Treat",
    ready: () => !CandyEngine.treated,
    completed: () => !CandyEngine.blockHtml.match(/whichhouse=\d*>[^>]*?house_l/),
    outfit: treatOutfit,
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (CandyEngine.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_l`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
        } else if (CandyEngine.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?starhouse`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          runChoice(2);
          CandyEngine.refreshBlock();
        }
      }
      CandyEngine.treated = true;
    },
  },
  {
    name: "Trick",
    ready: () => CandyEngine.tricked.length < HOUSE_NUMBERS.length,
    completed: () => !CandyEngine.blockHtml.match(/whichhouse=\d*>[^>]*?house_d/),
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (CandyEngine.tricked.includes(house)) continue;
        CandyEngine.tricked.push(house);
        if (CandyEngine.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_d`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          do {
            runCombat();
          } while (inMultiFight());
          return;
        }
      }
      abort("We thought we had more blocks to trick, but we didn't!");
    },
    outfit: trickOutfit,
  },
  {
    name: "Reset Block",
    completed: () => CandyEngine.blockHtml.includes("whichhouse="),
    ready: () => myAdventures() >= 5,
    do: (): void => {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
      CandyEngine.resetBlock();
      if (!CandyEngine.blockHtml.includes("whichhouse="))
        abort("Something went awry when finding a new block!");
    },
  },
];

export default TRICK_TREAT_TASKS;
