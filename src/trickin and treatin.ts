import {
  equip,
  gametimeToInt,
  getCounters,
  haveFamiliar,
  inebrietyLimit,
  inMultiFight,
  myAdventures,
  myFamiliar,
  myInebriety,
  outfit,
  print,
  runChoice,
  runCombat,
  totalTurnsPlayed,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $familiar,
  $familiars,
  $item,
  $location,
  $monster,
  $skill,
  $slot,
  get,
  have,
  Macro,
  set,
  SourceTerminal,
} from "libram";
import { pickBjorn } from "./bjorn";
import { advMacroAA, determineDraggableZoneAndEnsureAccess } from "./lib";

const stasisFamiliars = $familiars`stocking mimic, ninja pirate zombie robot, comma chameleon, feather boa constrictor`;

const prepareToTrick = (trickFamiliar: Familiar, trickMacro: Macro) => {
  trickMacro.setAutoAttack();
  useFamiliar(trickFamiliar);
  outfit("trick");
};

const treatOutfit = get<string>("spoopTreatOutfit") || "Eldritch Equipage";
const tot = $familiar`trick-or-treating tot`;
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
      /value="\l+/;
    }
  }
  if (block().match(RegExp(`whichhouse=\d+>[^>]*?house_l`)))
    throw "I thought I was out of light houses, but I wasn't. Alas!";
}

function trick(trickFamiliar: Familiar, trickMacro: Macro) {
  print(`You're a tricksy little hobbitses, aren't you?`, "blue");
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
    }
  }
  if (block().match(RegExp(`whichhouse=\d+>[^>]*?house_d`)))
    throw "I thought I was out of dark houses, but I wasn't. Alas!";
}

function trickTreat(trickFamiliar: Familiar, trickMacro: Macro) {
  treat();
  trick(trickFamiliar, trickMacro);
}

const proton = $item`protonic accelerator pack`;
function ghostCheck() {
  if (get("questPAGhost") === "unstarted" && get("nextParanormalActivity") <= totalTurnsPlayed()) {
    equip($slot`back`, proton);
  }
}

const bjorn = $item`buddy bjorn`;

function freeFight(macro: Macro, condition?: () => boolean, prep?: () => void) {
  outfit("freefight stasis");
  if (have(bjorn)) pickBjorn();
  if (have(proton)) ghostCheck();
  if (prep) prep();
  advMacroAA(determineDraggableZoneAndEnsureAccess(), macro, condition);
}

export function runBlocks(blocks: number = -1) {
  SourceTerminal.educate([$skill`digitize`, $skill`extract`]);

  const terminal = SourceTerminal.have();

  const kramco = $item`Kramco Sausage-o-Matic™`;
  const sausage = have(kramco);

  const ghost = have(proton);

  const voteBadge = $item`"I Voted!" sticker`;
  const voting = have(voteBadge) && get("_voteToday");

  const trickFamiliar = myFamiliar();

  const trickMacro = stasisFamiliars.includes(trickFamiliar)
    ? Macro.skill("curse of weaksauce")
        .skill("micrometeor")
        .skill("shadow noodles")
        .skill("sing along")
        .skill("extract")
        .skill("summon love gnats")
        .skill("shell up")
        .item("time-spinner", "HOA citation pad")
        .item("little red book")
        .item("nasty-smelling moss")
        .item("great wolf's lice")
        .item("mayor ghost's scissors")
        .skill("silent treatment")
        .trySkillRepeat("shieldbutt")
        .trySkillRepeat("kneebutt")
        .attack()
        .repeat()
    : Macro.skill("curse of weaksauce")
        .trySkill("sing along")
        .trySkill("extract")
        .attack()
        .repeat();

  let n = 0;
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
    return !doingNemesis ? true : nemesisStep() < 25;
  };
  const startTime = gametimeToInt();
  try {
    while (condition() && nemesis()) {
      const digitizes = get("_sourceTerminalDigitizeUses");
      const sausages = get("_sausageFights");
      const votes = get("_voteFreeFights");
      outfit("trick");
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
            Macro.trySkill("digitize")
          ).step(trickMacro);
          freeFight(digitizeMacro, () => {
            return getCounters("Digitize", -11, 0) !== "";
          });
        }
      }

      if (sausage) {
        const kramcoNumber =
          5 + 3 * get("_sausageFights") + Math.pow(Math.max(0, get("_sausageFights") - 5), 3);
        if (totalTurnsPlayed() - get("_lastSausageMonsterTurn") + 1 >= kramcoNumber) {
          freeFight(
            trickMacro,
            () => totalTurnsPlayed() - get("_lastSausageMonsterTurn") + 1 >= kramcoNumber,
            () => equip($slot`off-hand`, kramco)
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
            Macro.skill("silent treatment")
          ).step(trickMacro);
          freeFight(
            voteMacro,
            () => getCounters("Vote", 0, 0) !== "" && get("_voteFreeFights") < 3,
            () => equip($slot`acc3`, voteBadge)
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
        () => equip($slot`back`, proton);
        advMacroAA(
          ghostLocation,
          Macro.skill("shoot ghost").skill("shoot ghost").skill("shoot ghost").skill("trap ghost"),
          () => get("questPAGhost") !== "unstarted"
        );
      }
      if (
        digitizes !== get("_sourceTerminalDigitizeUses") &&
        !(
          votes !== get("_voteFreeFights") ||
          sausages !== get("_sausageFights") ||
          ghosting !== (get("questPAGhost") !== "unstarted")
        )
      ) {
        print(
          `Sorry, we encountered a digitized monster but haven't initialized the counter yet!`,
          "red"
        );
        print("Sorry if that red message freaked you out, we're all fine.", "grey");
        useFamiliar($familiar`frumious bandersnatch`);
        useSkill(1, $skill`ode to booze`);
        advMacroAA($location`the dire warren`, Macro.step("runaway"));
      }
      trickTreat(trickFamiliar, trickMacro);

      if (doingNemesis && getCounters("Nemesis Assassin window end", -11, 0) !== "") {
        useFamiliar(trickFamiliar);
        advMacroAA(determineDraggableZoneAndEnsureAccess(), trickMacro);
        outfit("freefight stasis");
        if (have(bjorn)) pickBjorn();
        if (have(proton)) ghostCheck();
      }
    }
  } finally {
    const endTime = gametimeToInt();
    const duration = endTime - startTime;
    print(`I spent ${duration} milliseconds!`, "blue");
  }
}
