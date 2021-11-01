import {
  abort,
  fullnessLimit,
  itemAmount,
  myFullness,
  myLevel,
  myPrimestat,
  print,
  retrieveItem,
  runChoice,
  setAutoAttack,
  userConfirm,
  visitUrl,
  xpath,
} from "kolmafia";
import { $familiar, $item, $stat, get, have, property, set, sinceKolmafiaRevision } from "libram";
import { cache, manager, questStep } from "./lib";
import { runBlocks } from "./trickin and treatin";

export function main(args: string): void {
  if (args && args.includes("help")) {
    print(
      "Set the property freecandy_treatOutfit with the name of the outfit you'd like to get candies from. Or don't! We'll pick an outfit for you. Take out the familiar you want to use for trick-or-treat combats. Enjoy.",
      "blue"
    );
  } else {
    if (myFullness() < fullnessLimit()) {
      const keepGoinCowboy = userConfirm(
        "Your stomach is not currently full. My pantsgiving support will slowly fill your stomach with 1-fullness items, which is likely suboptimal. Are you sure you wish to proceed?",
        69000,
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

    sinceKolmafiaRevision(20901);
    const forbiddenStores = property.getString("forbiddenStores").split(",");
    if (!forbiddenStores.includes("3408540")) {
      //Van & Duffel's Baleet Shop
      forbiddenStores.push("3408540");
      set("forbiddenStores", forbiddenStores.join(","));
    }

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
    manager.setChoices({ 806: 1 });

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

    cache.startingBowls = itemAmount($item`huge bowl of candy`);
    if (have($familiar`Trick-or-Treating Tot`))
      cache.startingCandies.set($item`Prunets`, itemAmount($item`Prunets`));

    const aaBossFlag =
      xpath(
        visitUrl("account.php?tab=combat"),
        `//*[@id="opt_flag_aabosses"]/label/input[@type='checkbox']@checked`
      )[0] === "checked"
        ? 1
        : 0;
    visitUrl(`account.php?actions[]=flag_aabosses&flag_aabosses=1&action=Update`, true);

    const blocks = args ? parseInt(args) : undefined;
    try {
      runBlocks(blocks);
    } catch {
      print(
        "Looks like we've aborted! That's bad. Contact phreddrickkv2 in the freecandydotexe thread on Discord, and let him know what's going on. Unless you're fighting Steve. Then it's fine.",
        "red"
      );
    } finally {
      manager.resetAll();
      visitUrl(
        `account.php?actions[]=flag_aabosses&flag_aabosses=${aaBossFlag}&action=Update`,
        true
      );
      setAutoAttack(0);
    }
  }
}
