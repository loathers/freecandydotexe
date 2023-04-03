import { Args, getTasks, Quest } from "grimoire-kolmafia";
import args from "./args";
import { questStep } from "libram";
import { CandyTask } from "./lib";
import CandyEngine from "./engine";
import GLOBAL_TASKS from "./regularTasks";
import TRICK_TREAT_TASKS from "./trickTreatTasks";
import { myAdventures } from "kolmafia";

export default function main(argstring = ""): void {
  Args.fill(args, argstring);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const nemesisStep = () => questStep("questG04Nemesis");
  const doingNemesis = nemesisStep() >= 17 && nemesisStep() < 25;
  const quest: Quest<CandyTask> = {
    name: "hacking your system",
    completed: () =>
      myAdventures() <= 0 ||
      !(doingNemesis || nemesisStep() < 25) ||
      CandyEngine.blocks >= args.blocks,
    tasks: [...GLOBAL_TASKS, ...TRICK_TREAT_TASKS],
  };

  const engine = new CandyEngine(getTasks([quest]));

  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
