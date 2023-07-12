import { Args, getTasks, Quest } from "grimoire-kolmafia";
import args from "./args";
import { $item, questStep } from "libram";
import { CandyTask, State } from "./lib";
import CandyEngine from "./engine";
import GLOBAL_TASKS from "./regularTasks";
import TRICK_TREAT_TASKS from "./trickTreatTasks";
import { itemAmount, myAdventures, print } from "kolmafia";

export default function main(argstring = ""): void {
  Args.fill(args, argstring);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const nemesisStep = () => questStep("questG04Nemesis");
  const doingNemesis = nemesisStep() >= 17 && nemesisStep() < 25;

  const noMoreAdventures = () => {
    if (myAdventures() <= 0) {
      print("Out of adventures! Stopping.", "red");
      return true;
    }
    return false;
  };

  const doneWithNemesis = () => {
    if (doingNemesis && nemesisStep() >= 25) {
      print("Fought the final nemesis wanderer! Stopping.", "red");
      return true;
    }
    return false;
  };

  const startingPrunets = itemAmount($item`Prunets`);
  const gainedPrunets = () => {
    if (itemAmount($item`Prunets`) > startingPrunets) {
      print("Gained prunets! We did it!", "red");
      return true;
    }
    return false;
  };

  const doneWithBlocks = () => {
    if (State.blocks >= args.blocks) {
      print(`Finished ${args.blocks} blocks!`, "red");
      return true;
    }
    return false;
  };

  const quest: Quest<CandyTask> = {
    name: "hacking your system",
    completed: () => gainedPrunets() || noMoreAdventures() || doneWithNemesis() || doneWithBlocks(),
    tasks: [...GLOBAL_TASKS, ...TRICK_TREAT_TASKS],
  };

  const engine = new CandyEngine(getTasks([quest]));

  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
