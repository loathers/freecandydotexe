import {
  cliExecute,
  eat,
  fullnessLimit,
  gametimeToInt,
  getCounters,
  inebrietyLimit,
  inMultiFight,
  myAdventures,
  myFullness,
  myInebriety,
  myMaxhp,
  myMaxmp,
  myName,
  myPathId,
  outfit,
  restoreHp,
  restoreMp,
  retrieveItem,
  reverseNumberology,
  runChoice,
  runCombat,
  toInt,
  totalTurnsPlayed,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  $familiar,
  $familiars,
  $item,
  $location,
  $monster,
  $skill,
  $skills,
  get,
  getKramcoWandererChance,
  have,
  SourceTerminal,
} from "libram";
import {
  advMacroAA,
  coldMedicineCabinet,
  determineDraggableZoneAndEnsureAccess,
  findFreeRun,
  juneCleave,
  meatFamiliar,
  printError,
  printHighlight,
  questStep,
  safeRestore,
  trickFamiliar,
} from "./lib";
import { bestOutfit, fightOutfit, getPantsgivingFood, meatOutfit } from "./outfit";
import Macro from "./combat";

const stasisFamiliars = $familiars`Stocking Mimic, Ninja Pirate Zombie Robot, Comma Chameleon, Feather Boa Constrictor, Cocoabo`;

const prepareToTrick = (trickMacro: Macro) => {
  trickMacro.setAutoAttack();
  useFamiliar(trickFamiliar());
  fightOutfit("Trick");
};

const treatOutfit = bestOutfit();
const tot = $familiar`Trick-or-Treating Tot`;
const prepareToTreat = () => {
  if (have(tot)) useFamiliar(tot);
  outfit("birthday suit");
  outfit(treatOutfit);
};

const block = () => visitUrl("place.php?whichplace=town&action=town_trickortreat");

function treat() {
  printHighlight("It's time to treat yourself (to the downfall of capitalism, ideally)");
  prepareToTreat();
  if (!block().includes("whichhouse=")) {
    if (myAdventures() < 5) {
      throw "Need a new block and I'm all out of turns, baby!";
    } else {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
    }
    if (!block().includes("whichhouse=")) throw "Something went awry when finding a new block!";
  }
  const thisBlock = block();
  for (let i = 0; i <= 11; i++) {
    if (thisBlock.match(RegExp(`whichhouse=${i}>[^>]*?house_l`))) {
      visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${i}&pwd`);
    } else if (thisBlock.match(RegExp(`whichhouse=${i}>[^>]*?starhouse`))) {
      visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${i}&pwd`);
      runChoice(2);
      block();
    }
  }
  if (block().match(/whichhouse=\d*>[^>]*?house_l/))
    throw "I thought I was out of light houses, but I wasn't. Alas!";
}

function trick(trickMacro: Macro) {
  printHighlight(
    `Illusion, ${myName()}. A trick is something an adventurer does for meat. Or candy!`
  );
  prepareToTrick(trickMacro);
  if (!block().includes("whichhouse=")) {
    if (myAdventures() < 5) {
      throw "Need a new block and I'm all out of turns, baby!";
    } else {
      visitUrl("choice.php?whichchoice=804&pwd&option=1");
    }
    if (!block().includes("whichhouse=")) throw "Something went awry when finding a new block!";
  }
  for (let i = 0; i <= 11; i++) {
    if (block().match(RegExp(`whichhouse=${i}>[^>]*?house_d`))) {
      restoreMp(Math.max(myMaxmp() * get("mpAutoRecoveryTarget")));
      restoreHp(Math.max(myMaxhp() * get("hpAutoRecoveryTarget")));
      cliExecute("mood execute");
      visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${i}&pwd`);
      runCombat(trickMacro.toString());
      while (inMultiFight()) runCombat(trickMacro.toString());
      fillPantsgivingFullness();
      safeRestore();
      if (juneCleave()) block();
    }
  }
  if (block().match(/whichhouse=\d*>[^>]*?house_d/))
    throw "I thought I was out of dark houses, but I wasn't. Alas!";
}

function trickTreat(trickMacro: Macro) {
  treat();
  trick(trickMacro);
}

export function canGorge(): boolean {
  const noFoodPaths = [
    35, // Dark Gyffte
    44, // Grey You
  ];

  return myFullness() < fullnessLimit() && !noFoodPaths.includes(myPathId());
}

function fillPantsgivingFullness(): void {
  if (!canGorge()) return;
  if (!get("_fudgeSporkUsed")) {
    retrieveItem($item`fudge spork`);
    eat($item`fudge spork`);
  }
  retrieveItem(getPantsgivingFood().food);
  eat(getPantsgivingFood().food);
}

export function runBlocks(blocks = -1): void {
  if (SourceTerminal.have()) SourceTerminal.educate([$skill`Digitize`, $skill`Extract`]);

  trickFamiliar();
  retrieveItem($item`seal tooth`);
  const trickMacro = stasisFamiliars.includes(trickFamiliar())
    ? Macro.if_(`monsterid ${toInt($monster`All-Hallow's Steve`)}`, Macro.abort())
        .stasis()
        .kill()
    : Macro.if_(`monsterid ${toInt($monster`All-Hallow's Steve`)}`, Macro.abort())
        .try([
          ...$skills`Curse of Weaksauce, Micrometeorite, Sing Along`,
          $item`porquoise-handled sixgun`,
        ])
        .externalIf(SourceTerminal.isCurrentSkill($skill`Extract`), Macro.skill($skill`Extract`))
        .kill();

  let n = 0;
  const hasBlocksRemaining = () => (blocks >= 0 ? n < blocks : myAdventures() >= 5);
  const nemesisStep = () => questStep("questG04Nemesis");
  const doingNemesis = nemesisStep() >= 17 && nemesisStep() < 25;
  const nemesis = () => {
    return !doingNemesis || nemesisStep() < 25;
  };
  const startTime = gametimeToInt();
  try {
    while (hasBlocksRemaining() && nemesis()) {
      const digitizes = get("_sourceTerminalDigitizeUses");
      const sausages = get("_sausageFights");
      const votes = get("_voteFreeFights");

      n++;

      const canFightWanderers =
        myInebriety() <= inebrietyLimit() || have($item`Drunkula's wineglass`);

      if (getCounters("Digitize", -11, 0) !== "" && canFightWanderers) {
        printHighlight(`It's digitize time!`);
        const digitizeMacro = Macro.externalIf(
          myAdventures() * 1.1 <
            (3 - digitizes) *
              (5 *
                (get("_sourceTerminalDigitizeMonsterCount") *
                  (1 + get("_sourceTerminalDigitizeMonsterCount"))) -
                3),
          Macro.trySkill($skill`Digitize`)
        ).step(trickMacro);
        if (get("_sourceTerminalDigitizeMonster") === $monster`Knob Goblin Embezzler`) {
          useFamiliar(meatFamiliar());
          meatOutfit();
        } else fightOutfit("Digitize");
        advMacroAA(
          determineDraggableZoneAndEnsureAccess(),
          digitizeMacro,
          () => getCounters("Digitize", -11, 0) !== "",
          () => {
            fillPantsgivingFullness();
            safeRestore();
            juneCleave();
          }
        );
        useFamiliar(trickFamiliar());
      }

      if (have($item`Kramco Sausage-o-Matic™`) && myInebriety() <= inebrietyLimit()) {
        if (getKramcoWandererChance() >= 1) {
          fightOutfit("Kramco");
          advMacroAA(
            determineDraggableZoneAndEnsureAccess(),
            trickMacro,
            () => getKramcoWandererChance() >= 1,
            () => {
              fillPantsgivingFullness();
              safeRestore();
              juneCleave();
            }
          );
        }
      }

      if (have($item`"I Voted!" sticker`) && canFightWanderers) {
        if (totalTurnsPlayed() % 11 === 1 && get("_voteFreeFights") < 3) {
          printHighlight(
            "The first Tuesday in November approaches, which makes perfect sense given that it's October."
          );
          fightOutfit("Voter");
          const currentVotes = get("_voteFreeFights");
          advMacroAA(
            determineDraggableZoneAndEnsureAccess(),
            trickMacro,
            () => totalTurnsPlayed() % 11 === 1 && get("_voteFreeFights") === currentVotes,
            () => {
              fillPantsgivingFullness();
              safeRestore();
              juneCleave();
            }
          );
        }
      }

      const ghosting = get("questPAGhost") !== "unstarted";
      if (have($item`protonic accelerator pack`) && ghosting && myInebriety() <= inebrietyLimit()) {
        const ghostLocation = get("ghostLocation") || $location`none`;
        if (ghostLocation === $location`none`) {
          throw `Something went wrong with my ghosts. Dammit, Walter Peck!`;
        }
        printHighlight(`Lonely rivers flow to the sea, to the sea. Time to wrastle a ghost.`);
        fightOutfit("Ghost");
        advMacroAA(
          ghostLocation,
          Macro.trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`),
          () => get("questPAGhost") !== "unstarted",
          () => {
            fillPantsgivingFullness();
            safeRestore();
            juneCleave();
          }
        );
      }
      if (
        digitizes !== get("_sourceTerminalDigitizeUses") &&
        !(votes !== get("_voteFreeFights") || sausages !== get("_sausageFights")) &&
        myInebriety() <= inebrietyLimit()
      ) {
        printError(
          `Sorry, we encountered a digitized monster but haven't initialized the counter yet!`
        );
        printHighlight("Sorry if that red message freaked you out, everything is cool and good.");
        const runSource = findFreeRun();
        runSource.constraints.preparation?.();
        if (runSource.constraints?.familiar) useFamiliar(runSource.constraints.familiar());
        runSource.constraints.equipmentRequirements?.().maximize?.();
        advMacroAA($location`Noob Cave`, runSource.macro);
        fillPantsgivingFullness();
        safeRestore();
        juneCleave();
      }
      trickTreat(trickMacro);

      if (doingNemesis && getCounters("Nemesis Assassin window end", -11, 0) !== "") {
        useFamiliar(trickFamiliar());
        fightOutfit("Digitize");
        advMacroAA(determineDraggableZoneAndEnsureAccess(), trickMacro);
        () => {
          fillPantsgivingFullness();
          safeRestore();
          juneCleave();
        };
      }

      if (
        get("_universeCalculated") < get("skillLevel144") &&
        Object.keys(reverseNumberology()).includes("69")
      ) {
        cliExecute("numberology 69");
      }
      coldMedicineCabinet();
    }
  } finally {
    const totalMS = gametimeToInt() - startTime;
    const ms = Math.floor(totalMS % 1000);
    const sec = Math.floor((totalMS / 1000) % 60);
    const min = Math.floor((totalMS / 1000 / 60) % 60);
    const hours = Math.floor(totalMS / 1000 / 60 / 60);

    printHighlight(`Total milliseconds for sanity check: ${totalMS}`);
    printHighlight(
      `I spent ${hours.toFixed(2)}:${min.toFixed(2)}:${sec.toFixed(2)}.${ms} running ${n} blocks!`
    );
  }
}
