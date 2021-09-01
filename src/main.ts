import { print } from "kolmafia";
import { manager } from "./lib";
import { runBlocks } from "./trickin and treatin";

export function main(args: string): void {
  if (args.includes("help")) {
    print(
      "Set the property fcdeTreatOutfit with the name of the outfit you'd like to trick or treat in. Take out the familiar you want to use for trick or treating. Enjoy.",
      "blue"
    );
  } else {
    const blocks = args ? parseInt(args) : undefined;
    manager.set({
      battleAction: "custom combat script",
      dontStopForCounters: true,
      maximizerFoldables: true,
      hpAutoRecoveryTarget: 1.0,
      trackVoteMonster: "free",
      customCombatScript: "twiddle",
    });
    runBlocks(blocks);
    manager.resetAll();
  }
}

//note: set properties
