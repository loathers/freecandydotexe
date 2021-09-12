import {
  eat,
  fullnessLimit,
  gametimeToInt,
  getCounters,
  inebrietyLimit,
  inMultiFight,
  myAdventures,
  myFullness,
  myInebriety,
  myName,
  outfit,
  print,
  retrieveItem,
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
  have,
  SourceTerminal,
} from "libram";
import {
  advMacroAA,
  determineDraggableZoneAndEnsureAccess,
  findRun,
  questStep,
  trickFamiliar,
} from "./lib";
import { bestOutfit, fightOutfit, getPantsgivingFood } from "./outfit";
import Macro from "./combat";

const stasisFamiliars = $familiars`Stocking Mimic, Ninja Pirate Zombie Robot, Comma Chameleon, Feather Boa Constrictor`;

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
  print("It's time to treat yourself (to the downfall of capitalism, ideally)", "blue");
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
      /value="l+/;
    }
  }
  if (block().match(/whichhouse=\d*>[^>]*?house_l/))
    throw "I thought I was out of light houses, but I wasn't. Alas!";
}

function trick(trickMacro: Macro) {
  print(
    `Illusion, ${myName()}. A trick is something an adventurer does for meat. Or candy!`,
    "blue"
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
      visitUrl(`choice.php?whichchoice=804&option=3&whichhouse=${i}&pwd`);
      runCombat(trickMacro.toString());
      while (inMultiFight()) runCombat(trickMacro.toString());
      fillPantsgivingFullness();
    }
  }
  if (block().match(/whichhouse=\d*>[^>]*?house_d/))
    throw "I thought I was out of dark houses, but I wasn't. Alas!";
}

function trickTreat(trickMacro: Macro) {
  treat();
  trick(trickMacro);
}

function fillPantsgivingFullness(): void {
  if (myFullness() >= fullnessLimit()) return;
  if (!get("_fudgeSporkUsed")) {
    retrieveItem($item`fudge spork`);
    eat($item`fudge spork`);
  }
  retrieveItem(getPantsgivingFood());
  eat(getPantsgivingFood());
}

export function runBlocks(blocks = -1): void {
  SourceTerminal.educate([$skill`Digitize`, $skill`Extract`]);

  trickFamiliar();
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

  const n = 0;
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

      if (getCounters("Digitize", -11, 0) !== "") {
        print(`It's digitize time!`, "blue");
        const digitizeMacro = Macro.externalIf(
          myAdventures() * 1.1 <
            (3 - digitizes) *
              (5 *
                (get("_sourceTerminalDigitizeMonsterCount") *
                  (1 + get("_sourceTerminalDigitizeMonsterCount"))) -
                3),
          Macro.trySkill($skill`Digitize`)
        ).step(trickMacro);
        fightOutfit("Digitize");
        advMacroAA(
          determineDraggableZoneAndEnsureAccess(),
          digitizeMacro,
          () => getCounters("Digitize", -11, 0) !== "",
          fillPantsgivingFullness
        );
      }

      if (have($item`Kramco Sausage-o-Matic™`)) {
        const kramcoNumber =
          5 + 3 * get("_sausageFights") + Math.pow(Math.max(0, get("_sausageFights") - 5), 3);
        if (totalTurnsPlayed() - get("_lastSausageMonsterTurn") + 1 >= kramcoNumber) {
          fightOutfit("Kramco");
          advMacroAA(
            determineDraggableZoneAndEnsureAccess(),
            trickMacro,
            () => totalTurnsPlayed() - get("_lastSausageMonsterTurn") + 1 >= kramcoNumber,
            fillPantsgivingFullness
          );
        }
      }

      if (have($item`"I Voted!" sticker`)) {
        print(
          "The first Tuesday in November approaches, which makes perfect sense given that it's October.",
          "blue"
        );
        if (getCounters("Vote", 0, 0) !== "" && get("_voteFreeFights") < 3) {
          fightOutfit("Voter");
          advMacroAA(
            determineDraggableZoneAndEnsureAccess(),
            trickMacro,
            () => getCounters("Vote", 0, 0) !== "" && get("_voteFreeFights") < 3,
            fillPantsgivingFullness
          );
        }
      }
      const ghosting = get("questPAGhost") !== "unstarted";
      if (have($item`protonic accelerator pack`) && ghosting && myInebriety() < inebrietyLimit()) {
        const ghostLocation = get("ghostLocation") || $location`none`;
        if (ghostLocation === $location`none`) {
          throw `Something went wrong with my ghosts. Dammit, Walter Peck!`;
        }
        print(`Lonely rivers flow to the sea, to the sea. Time to wrastle a ghost.`, "blue");
        advMacroAA(
          ghostLocation,
          Macro.trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`),
          () => get("questPAGhost") !== "unstarted",
          fillPantsgivingFullness
        );
      }
      if (
        digitizes !== get("_sourceTerminalDigitizeUses") &&
        !(votes !== get("_voteFreeFights") || sausages !== get("_sausageFights"))
      ) {
        print(
          `Sorry, we encountered a digitized monster but haven't initialized the counter yet!`,
          "red"
        );
        print("Sorry if that red message freaked you out, everything is cool and good.", "grey");
        const runSource = findRun();
        if (runSource.prepare) runSource.prepare();
        if (runSource.requirement) runSource.requirement.maximize();
        advMacroAA($location`Noob Cave`, runSource.macro);
        fillPantsgivingFullness();
      }
      trickTreat(trickMacro);

      if (doingNemesis && getCounters("Nemesis Assassin window end", -11, 0) !== "") {
        useFamiliar(trickFamiliar());
        fightOutfit("Digitize");
        advMacroAA(determineDraggableZoneAndEnsureAccess(), trickMacro);
        fillPantsgivingFullness();
      }
    }
  } finally {
    const endTime = gametimeToInt();
    const duration = endTime - startTime;
    print(`I spent ${duration} milliseconds!`, "blue");
  }
}
