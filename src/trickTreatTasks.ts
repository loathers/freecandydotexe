import { abort, inMultiFight, myAdventures, runChoice, runCombat, visitUrl } from "kolmafia";
import { treatOutfit, trickOutfit } from "./outfit";
import { CandyTask } from "./lib";
import { CandyStrategy } from "./combat";
import STATE from "./state";

const HOUSE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const TRICK_TREAT_TASKS: CandyTask[] = [
  {
    name: "Treat",
    ready: () => !STATE.treated,
    completed: () => !STATE.blockHtml.match(/whichhouse=\d*>[^>]*?house_l/),
    outfit: treatOutfit,
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (STATE.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_l`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
        } else if (STATE.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?starhouse`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          runChoice(2);
          STATE.refreshBlock();
        }
      }
      STATE.treated = true;
    },
    tricktreat: true,
  },
  {
    name: "Trick",
    ready: () => STATE.tricked.length < HOUSE_NUMBERS.length,
    completed: () => !STATE.blockHtml.match(/whichhouse=\d*>[^>]*?house_d/),
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (STATE.tricked.includes(house)) continue;
        STATE.tricked.push(house);
        if (STATE.blockHtml.match(RegExp(`whichhouse=${house}>[^>]*?house_d`))) {
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
    tricktreat: true,
  },
  {
    name: "Reset Block",
    completed: (): boolean => {
      STATE.refreshBlock();
      return STATE.blockHtml.includes("whichhouse=");
    },
    ready: () => myAdventures() >= 5,
    do: (): void => {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
      STATE.resetBlock();
      if (!STATE.blockHtml.includes("whichhouse="))
        abort("Something went awry when finding a new block!");
    },
    tricktreat: true,
  },
];

export default TRICK_TREAT_TASKS;
