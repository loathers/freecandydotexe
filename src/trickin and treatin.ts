import {
  eat,
  fullnessLimit,
  gametimeToInt,
  getCounters,
  haveFamiliar,
  inebrietyLimit,
  inMultiFight,
  myAdventures,
  myFamiliar,
  myFullness,
  myInebriety,
  myName,
  outfit,
  print,
  retrieveItem,
  runChoice,
  runCombat,
  totalTurnsPlayed,
  use,
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
  get,
  have,
  Macro,
  maximizeRequirementsCached,
  set,
  SourceTerminal,
} from "libram";
import {
  advMacroAA,
  determineDraggableZoneAndEnsureAccess,
  findRun,
  getPantsgivingFood,
} from "./lib";
import { fightOutfit } from "./outfit";

const stasisFamiliars = $familiars`Stocking Mimic, Ninja Pirate Zombie Robot, Comma Chameleon, Feather Boa Constrictor`;

const prepareToTrick = (trickFamiliar: Familiar, trickMacro: Macro) => {
  trickMacro.setAutoAttack();
  useFamiliar(trickFamiliar);
  fightOutfit("Trick");
};

const treatOutfit = get<string>("fcdeTreatOutfit") || "Eldritch Equipage";
const tot = $familiar`Trick-or-Treating Tot`;
const prepareToTreat = () => {
  if (haveFamiliar(tot)) useFamiliar(tot);
  outfit("birthday suit");
  outfit(treatOutfit);
};

const block = () => visitUrl("place.php?whichplace=town&action=town_trickortreat");

function treat() {
  print("It's time to treat yourself (to the downfall of capitalism, ideally)", "blue");
  set("choiceAdventure806", "1");
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

function trick(trickFamiliar: Familiar, trickMacro: Macro) {
  print(
    `Illusion, ${myName()}. A trick is something an adventurer does for meat. Or candy!`,
    "blue"
  );
  prepareToTrick(trickFamiliar, trickMacro);
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

function trickTreat(trickFamiliar: Familiar, trickMacro: Macro) {
  treat();
  trick(trickFamiliar, trickMacro);
}

function fillPantsgivingFullness(): void {
  if (myFullness() >= fullnessLimit()) return;
  if (!get("_fudgeSporkUsed")) {
    retrieveItem($item`fudge spork`);
    use($item`fudge spork`);
  }
  retrieveItem(getPantsgivingFood());
  eat(getPantsgivingFood());
}

export function runBlocks(blocks = -1): void {
  SourceTerminal.educate([$skill`Digitize`, $skill`Extract`]);
  const terminal = SourceTerminal.have();

  const kramco = $item`Kramco Sausage-o-Matic™`;
  const sausage = have(kramco);

  const proton = $item`protonic accelerator pack`;
  const ghost = have(proton);

  const voteBadge = $item`"I Voted!" sticker`;
  const voting = have(voteBadge) && get("_voteToday");

  const trickFamiliar = myFamiliar();

  const trickMacro = stasisFamiliars.includes(trickFamiliar)
    ? Macro.trySkill($skill`Curse of Weaksauce`)
        .trySkill($skill`Micrometeorite`)
        .trySkill($skill`Shadow Noodles`)
        .trySkill($skill`Sing Along`)
        .trySkill($skill`Extract`)
        .trySkill($skill`Summon Love Gnats`)
        .trySkill($skill`Shell Up`)
        .tryItem([$item`Great Wolf's lice`, $item`HOA citation pad`])
        .tryItem($item`little red book`)
        .tryItem($item`Time-Spinner`)
        .tryItem($item`nasty-smelling moss`)
        .tryItem($item`Mayor Ghost's scissors`)
        .trySkill($skill`Silent Treatment`)
        .trySkillRepeat($skill`Shieldbutt`)
        .trySkillRepeat($skill`Kneebutt`)
        .attack()
        .repeat()
    : Macro.trySkill($skill`Curse of Weaksauce`)
        .trySkill($skill`Sing Along`)
        .trySkill($skill`Extract`)
        .attack()
        .repeat();

  const n = 0;
  const condition = () => (blocks >= 0 ? n < blocks : myAdventures() >= 5);
  const nemesisStep = () =>
    get("questG04Nemesis") === "unstarted"
      ? -1
      : get("questG04Nemesis") === "started"
      ? 0
      : get("questG04Nemesis") === "finished"
      ? 69
      : parseInt(get("questG04Nemesis").substring(4), 10);
  const doingNemesis = nemesisStep() >= 17 && nemesisStep() < 25;
  const nemesis = () => {
    return !doingNemesis || nemesisStep() < 25;
  };
  const startTime = gametimeToInt();
  try {
    while (condition() && nemesis()) {
      const digitizes = get("_sourceTerminalDigitizeUses");
      const sausages = get("_sausageFights");
      const votes = get("_voteFreeFights");
      if (terminal) {
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
      }

      if (sausage) {
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

      if (voting) {
        print(
          "The first Tuesday in November approaches, which makes perfect sense given that it's October.",
          "blue"
        );
        if (getCounters("Vote", 0, 0) !== "" && get("_voteFreeFights") < 3) {
          const voteMacro = Macro.externalIf(
            get("_voteMonster") === $monster`angry ghost`,
            Macro.trySkill($skill`Silent Treatment`)
          ).step(trickMacro);
          fightOutfit("Voter");
          advMacroAA(
            determineDraggableZoneAndEnsureAccess(),
            voteMacro,
            () => getCounters("Vote", 0, 0) !== "" && get("_voteFreeFights") < 3,
            fillPantsgivingFullness
          );
        }
      }
      const ghosting = get("questPAGhost") !== "unstarted";
      if (ghost && ghosting && myInebriety() < inebrietyLimit()) {
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
        if (runSource.requirement) maximizeRequirementsCached([runSource.requirement]);
        advMacroAA($location`The Dire Warren`, runSource.macro);
        fillPantsgivingFullness();
      }
      trickTreat(trickFamiliar, trickMacro);

      if (doingNemesis && getCounters("Nemesis Assassin window end", -11, 0) !== "") {
        useFamiliar(trickFamiliar);
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
