import {
  abort,
  fullnessLimit,
  inebrietyLimit,
  myFullness,
  myInebriety,
  myLevel,
  myPrimestat,
  mySpleenUse,
  print,
  retrieveItem,
  runChoice,
  spleenLimit,
  userConfirm,
  visitUrl,
} from "kolmafia";
import { $item, $stat, get, have } from "libram";
import { manager, questStep } from "./lib";
import { runBlocks } from "./trickin and treatin";

export function main(args: string): void {
  if (args.includes("help")) {
    print(
      "Set the property freecandy_treatOutfit with the name of the outfit you'd like to get candies from. Or don't! We'll pick an outfit for you. Take out the familiar you want to use for trick-or-treat combats. Enjoy.",
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
      currentMood: "apathetic",
    });

    if (get("hpAutoRecovery") < 0.35) manager.set({ hpAutoRecovery: 0.35 });
    if (get("mpAutoRecovery") < 0.25) manager.set({ mpAutoRecovery: 0.25 });
    const mpTarget = myLevel() < 18 ? 0.5 : 0.3;
    if (get("mpAutoRecoveryTarget") < mpTarget) manager.set({ mpAutoRecoveryTarget: mpTarget });

    if (have($item`portable pantogram`) && !have($item`pantogram pants`)) {
      retrieveItem($item`ten-leaf clover`);
      retrieveItem($item`bubblin' crude`);
      const m = new Map([
        [$stat`Muscle`, 1],
        [$stat`Mysticality`, 2],
        [$stat`Moxie`, 3],
      ]).get(myPrimestat());
      visitUrl("inv_use.php?pwd&whichitem=9573");
      visitUrl(`choice.php?whichchoice=1270&pwd&option=1&m=${m}&e=5&s1=5789,1&s2=-1,0&s3=24,1`);
    }
    runBlocks(blocks);
    manager.resetAll();
  }
}

//note: set properties
