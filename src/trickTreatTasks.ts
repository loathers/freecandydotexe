import {
  abort,
  handlingChoice,
  inMultiFight,
  lastChoice,
  myAdventures,
  runChoice,
  runCombat,
  visitUrl,
} from "kolmafia";
import { treatOutfit, trickOutfit } from "./outfit";
import { CandyTask } from "./lib";
import { CandyStrategy } from "./combat";
import CandyState from "./state";
const HOUSE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let blockHtml = "";
let treated = false;
let tricked: number[] = [];

function getBlockHtml(): string {
  blockHtml ||= visitUrl("place.php?whichplace=town&action=town_trickortreat");
  return blockHtml;
}

function refreshBlock(): void {
  blockHtml = visitUrl("place.php?whichplace=town&action=town_trickortreat");
}

function resetBlock(): void {
  refreshBlock();
  treated = false;
  tricked = [];
  CandyState.blocks++;
}

function ensureInHalloween(): void {
  const onPage = handlingChoice() && lastChoice() === 804;
  if (!onPage) refreshBlock();
}

const TRICK_TREAT_TASKS: CandyTask[] = [
  {
    name: "Treat",
    ready: () => !treated,
    completed: () => !getBlockHtml().match(/whichhouse=\d*>[^>]*?house_l/),
    outfit: treatOutfit,
    prepare: () => ensureInHalloween(),
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (getBlockHtml().match(RegExp(`whichhouse=${house}>[^>]*?house_l`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
        } else if (getBlockHtml().match(RegExp(`whichhouse=${house}>[^>]*?starhouse`))) {
          visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${house}&pwd`);
          runChoice(2);
          refreshBlock();
        }
      }
      treated = true;
    },
  },
  {
    name: "Trick",
    ready: () => tricked.length < HOUSE_NUMBERS.length,
    completed: () => !getBlockHtml().match(/whichhouse=\d*>[^>]*?house_d/),
    prepare: () => ensureInHalloween(),
    do: (): void => {
      for (const house of HOUSE_NUMBERS) {
        if (tricked.includes(house)) continue;
        tricked.push(house);
        if (getBlockHtml().match(RegExp(`whichhouse=${house}>[^>]*?house_d`))) {
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
    ready: () => myAdventures() >= 5,
    completed: (): boolean => {
      refreshBlock();
      return getBlockHtml().includes("whichhouse=");
    },
    prepare: () => ensureInHalloween(),
    do: (): void => {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
      resetBlock();
      if (!getBlockHtml().includes("whichhouse="))
        abort("Something went awry when finding a new block!");
    },
  },
];

export default TRICK_TREAT_TASKS;
