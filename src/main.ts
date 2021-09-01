import {
  abort,
  fullnessLimit,
  inebrietyLimit,
  myFullness,
  myInebriety,
  mySpleenUse,
  print,
  runChoice,
  spleenLimit,
  userConfirm,
  visitUrl,
} from "kolmafia";
import { manager, questStep } from "./lib";
import { runBlocks } from "./trickin and treatin";

export function main(args: string): void {
  if (args.includes("help")) {
    print(
      "Set the property freecandy_TreatOutfit with the name of the outfit you'd like to get candies from. Or don't! We'll pick an outfit for you. Take out the familiar you want to use for trick-or-treat combats. Enjoy.",
      "blue"
    );
  } else {
    if (
      myFullness() < fullnessLimit() ||
      myInebriety() < inebrietyLimit() ||
      mySpleenUse() < spleenLimit()
    ) {
      const keepGoinCowboy = userConfirm(
        "Your organs are not full. Are you sure you wish to proceed?",
        69,
        false
      );
      if (!keepGoinCowboy) abort();
    }
    if (questStep("questM23Meatsmith") === -1) {
      visitUrl("shop.php?whichshop=meatsmith&action=talk");
      runChoice(1);
    }
    if (questStep("questM24Doc") === -1) {
      visitUrl("shop.php?whichshop=doc&action=talk");
      runChoice(1);
    }
    if (questStep("questM25Armorer") === -1) {
      visitUrl("shop.php?whichshop=armory&action=talk");
      runChoice(1);
    }
    const blocks = args ? parseInt(args) : undefined;
    manager.set({
      battleAction: "custom combat script",
      dontStopForCounters: true,
      maximizerFoldables: true,
      hpAutoRecoveryTarget: 1.0,
      trackVoteMonster: "free",
      customCombatScript: "twiddle",
      autoSatisfyWithMall: true,
      autoSatisfyWithNPCs: true,
      autoSatisfyWithStorage: true,
    });
    runBlocks(blocks);
    manager.resetAll();
  }
}

//note: set properties
