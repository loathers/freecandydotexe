import {
  abort,
  adv1,
  cliExecute,
  eat,
  fullnessLimit,
  getWorkshed,
  inebrietyLimit,
  Location,
  myClass,
  myFullness,
  myHp,
  myInebriety,
  retrieveItem,
  reverseNumberology,
  runChoice,
  totalTurnsPlayed,
  use,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $classes,
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $phylum,
  $skill,
  ActionSource,
  AutumnAton,
  Counter,
  ensureFreeRun,
  get,
  getKramcoWandererChance,
  have,
  JuneCleaver,
  questStep,
  set,
  Snapper,
  SourceTerminal,
  TrainSet,
  tryFindFreeRun,
  withProperty,
} from "libram";
import { CandyTask, shouldRedigitize } from "./lib";
import {
  bestAutumnatonLocation,
  coldMedicineCabinet,
  getBestPantsgivingFood,
  juneCleaverChoices,
  rotateTrainToOptimalCycle,
  willRotateTrainset,
} from "./resources";
import { combatOutfit, digitizeOutfit } from "./outfit";
import { Outfit } from "grimoire-kolmafia";
import { CandyStrategy, Macro } from "./combat";
import args from "./args";
import { wanderer } from "./wanderer";

const MARKET_QUESTS = [
  { pref: "questM23Meatsmith", url: "shop.php?whichshop=meatsmith&action=talk" },
  { pref: "questM24Doc", url: "shop.php?whichshop=doc&action=talk" },
  { pref: "questM25Armorer", url: "shop.php?whichshop=armory&action=talk" },
];

let _digitizeInitialized = true;

function digitizeInitialized(): void {
  _digitizeInitialized = true;
}

let runSource: ActionSource | null = null;

function getRunSource(): ActionSource {
  if (!runSource) {
    runSource =
      tryFindFreeRun() ??
      ensureFreeRun({
        requireUnlimited: () => true,
        noFamiliar: () => true,
        noRequirements: () => true,
        maximumCost: () => get("autoBuyPriceLimit") ?? 20000,
      });
  }
  if (!runSource) abort("Unable to find free run with which to initialize digitize!");
  return runSource;
}

const GLOBAL_TASKS: CandyTask[] = [
  ...MARKET_QUESTS.map(({ pref, url }) => ({
    name: `Start Quest: ${pref}`,
    completed: () => questStep(pref) > -1,
    do: (): void => {
      visitUrl(url);
      runChoice(1);
    },
  })),
  {
    name: "Acquire Kgnee",
    ready: () =>
      have($familiar`Reagnimated Gnome`) &&
      !have($item`gnomish housemaid's kgnee`) &&
      !get("_freecandy_checkedGnome", false),
    completed: () => get("_freecandy_checkedGnome", false),
    do: (): void => {
      visitUrl("arena.php");
      runChoice(4);
      set("_freecandy_checkedGnome", true);
    },
    outfit: { familiar: $familiar`Reagnimated Gnome` },
    limit: { tries: 1 },
  },
  {
    name: "Ow!",
    completed: () => myHp() > 0,
    do: () => abort("Ow! I have 0 hp!"),
  },
  {
    name: "Check combat lost",
    completed: () => !get("_lastCombatLost", false),
    do: () => abort("Lost in combat!"),
  },
  {
    name: "Lick wounds",
    ready: () => have($skill`Tongue of the Walrus`),
    completed: () => !have($effect`Beaten Up`),
    do: () => useSkill($skill`Tongue of the Walrus`),
  },
  {
    name: "Sweat Out some Booze",
    completed: () => get("_sweatOutSomeBoozeUsed") >= 3,
    ready: () => myInebriety() > 0 && get("sweat") >= 25,
    do: () => useSkill($skill`Sweat Out Some Booze`),
    outfit: { pants: $item`designer sweatpants` },
    sobriety: "sober",
  },
  {
    name: "Numberology",
    ready: () => Object.values(reverseNumberology()).includes(69) && get("skillLevel144") <= 3,
    completed: () => get("_universeCalculated") >= get("skillLevel144"),
    do: () => cliExecute("numberology 69"),
  },
  {
    name: "Magical Sauasage",
    ready: () =>
      $items`magical sausage, magical sausage casing`.some((i) => have(i)) &&
      $items`Kramco Sausage-o-Matic™, replica Kramco Sausage-o-Matic™`.some((i) => have(i)),
    completed: () => get("_sausagesEaten") >= 23,
    do: () => eat($item`magical sausage`),
  },
  {
    name: "License to Chill",
    ready: () => have($item`License to Chill`),
    completed: () => get("_licenseToChillUsed"),
    do: () => use($item`License to Chill`),
  },
  {
    name: "Fill Pantsgiving Fullness",
    ready: () =>
      !$classes`Vampyre, Grey Goo`.includes(myClass()) && myFullness() + 1 === fullnessLimit(),
    completed: () => myFullness() >= fullnessLimit(),
    do: (): void => {
      const { food } = getBestPantsgivingFood();
      if (!get("_fudgeSporkUsed")) {
        retrieveItem($item`fudge spork`);
        eat($item`fudge spork`);
      }
      retrieveItem(food);
      eat(food);
    },
  },
  {
    name: "Autumn-Aton",
    completed: () => !AutumnAton.available(),
    do: (): void => {
      AutumnAton.sendTo(bestAutumnatonLocation);
    },
  },
  {
    name: "Cold Medicine Cabinet",
    ready: () => getWorkshed() === $item`cold medicine cabinet`,
    completed: () =>
      get("_coldMedicineConsults") >= 5 || get("_nextColdMedicineConsult") > totalTurnsPlayed(),
    do: coldMedicineCabinet,
  },
  {
    name: "Trainset",
    ready: () => TrainSet.installed(),
    completed: () => !willRotateTrainset(),
    do: rotateTrainToOptimalCycle,
  },
  {
    name: "Tune Snapper",
    ready: () => args.familiar === $familiar`Red-Nosed Snapper`,
    completed: () => Snapper.getTrackedPhylum() === $phylum`dude`,
    do: () => Snapper.trackPhylum($phylum`dude`),
  },
  {
    name: "June Cleaver",
    completed: () => !JuneCleaver.have() || !!get("_juneCleaverFightsLeft"),
    do: () =>
      withProperty("recoveryScript", "", () => {
        const target =
          myInebriety() > inebrietyLimit() ? $location`Drunken Stupor` : $location`Noob Cave`;
        adv1(target, -1, "");
      }),
    choices: juneCleaverChoices,
    outfit: { weapon: $item`June cleaver` },
    combat: new CandyStrategy(Macro.abort()),
  },
  {
    name: "Terminal Skills",
    ready: () => SourceTerminal.have(),
    completed: () => SourceTerminal.isCurrentSkill([$skill`Extract`, $skill`Duplicate`]),
    do: () => SourceTerminal.educate([$skill`Extract`, $skill`Duplicate`]),
  },
  {
    name: "Proton Ghost",
    completed: () => get("questPAGhost") === "unstarted",
    ready: () => have($item`protonic accelerator pack`) && !!get("ghostLocation"),
    do: () => get("ghostLocation") ?? abort("Failed to find proper ghost location"),
    outfit: () => combatOutfit({ back: $item`protonic accelerator pack` }),
    combat: new CandyStrategy(() =>
      Macro.trySkill($skill`Shoot Ghost`)
        .trySkill($skill`Shoot Ghost`)
        .trySkill($skill`Shoot Ghost`)
        .trySkill($skill`Trap Ghost`)
    ),
  },
  {
    name: "Vote Wanderer",
    ready: () =>
      have($item`"I Voted!" sticker`) &&
      totalTurnsPlayed() % 11 === 1 &&
      get("_voteFreeFights") < 3,
    do: () => wanderer().getTarget({ wanderer: "wanderer", drunkSafe: true }),
    choices: () => wanderer().getChoices({ wanderer: "wanderer", drunkSafe: true }),
    completed: () => get("lastVoteMonsterTurn") === totalTurnsPlayed(),
    outfit: () => combatOutfit({ acc1: $item`"I Voted!" sticker` }),
    combat: new CandyStrategy(),
  },
  {
    name: "Digitize Wanderer",
    completed: () => Counter.get("Digitize") > 0,
    do: () => wanderer().getTarget({ wanderer: "wanderer", drunkSafe: true }),
    choices: () => wanderer().getChoices({ wanderer: "wanderer", drunkSafe: true }),
    prepare: () =>
      shouldRedigitize() && SourceTerminal.educate([$skill`Digitize`, $skill`Extract`]),
    post: () => get("_sourceTerminalDigitizeMonsterCount") || (_digitizeInitialized = false),
    outfit: digitizeOutfit,
    combat: new CandyStrategy(() => Macro.redigitize().default()),
  },
  {
    name: "Void Monster",
    ready: () => have($item`cursed magnifying glass`) && get("cursedMagnifyingGlassCount") === 13,
    completed: () => get("_voidFreeFights") >= 5,
    do: () => wanderer().getTarget({ wanderer: "wanderer", drunkSafe: true }),
    choices: () => wanderer().getChoices({ wanderer: "wanderer", drunkSafe: true }),
    outfit: () => combatOutfit({ offhand: $item`cursed magnifying glass` }),
    combat: new CandyStrategy(),
  },
  {
    name: "Kramco",
    ready: () => have($item`Kramco Sausage-o-Matic™`),
    completed: () => getKramcoWandererChance() < 1,
    do: () => wanderer().getTarget({ wanderer: "wanderer", drunkSafe: true }),
    choices: () => wanderer().getChoices({ wanderer: "wanderer", drunkSafe: true }),
    post: digitizeInitialized,
    outfit: () => combatOutfit({ offhand: $item`Kramco Sausage-o-Matic™` }),
    combat: new CandyStrategy(),
  },
  {
    name: "Yellow Ray: Fondeluge",
    ready: () => have($skill`Fondeluge`),
    completed: () => have($effect`Everything Looks Yellow`),
    do: () => wanderer().getTarget("yellow ray"),
    choices: () => wanderer().getChoices("yellow ray"),
    sobriety: "sober",
    post: digitizeInitialized,
    outfit: combatOutfit,
    combat: new CandyStrategy(() =>
      Macro.tryHaveSkill($skill`Duplicate`)
        .trySkill($skill`Fondeluge`)
        .abort()
    ),
  },
  {
    name: "Yellow Ray: Jurassic Parka",
    ready: () => have($item`Jurassic Parka`) && have($skill`Torso Awareness`),
    completed: () => have($effect`Everything Looks Yellow`),
    do: () => wanderer().getTarget("yellow ray"),
    choices: () => wanderer().getChoices("yellow ray"),
    sobriety: "sober",
    post: digitizeInitialized,
    outfit: () => combatOutfit({ shirt: $item`Jurassic Parka`, modes: { parka: "dilophosaur" } }),
    combat: new CandyStrategy(() =>
      Macro.tryHaveSkill($skill`Duplicate`)
        .trySkill($skill`Spit jurassic acid`)
        .abort()
    ),
  },
  {
    name: "Free-for-All",
    ready: () => have($skill`Free-For-All`),
    completed: () => have($effect`Everything Looks Red`),
    do: () => wanderer().getTarget("freefight"),
    choices: () => wanderer().getChoices("freefight"),
    sobriety: "sober",
    post: digitizeInitialized,
    outfit: combatOutfit,
    combat: new CandyStrategy(Macro.skill($skill`Free-For-All`)),
  },
  {
    name: "Nemesis Assassin",
    completed: () => Counter.get("Nemesis Assassin window end") > 0,
    do: () => wanderer().getTarget({ wanderer: "wanderer", drunkSafe: true }),
    choices: () => wanderer().getChoices({ wanderer: "wanderer", drunkSafe: true }),
    post: digitizeInitialized,
    outfit: combatOutfit,
    combat: new CandyStrategy(),
  },
  {
    name: "Initialize Digitize",
    completed: () => _digitizeInitialized,
    do: (): Location => {
      getRunSource()?.prepare();
      return wanderer().getTarget("backup");
    },
    choices: () => wanderer().getChoices("backup"),
    post: (): void => {
      digitizeInitialized();
      runSource = null;
    },
    outfit: (): Outfit => {
      const run = getRunSource();
      const req = run?.constraints?.equipmentRequirements?.();
      const familiar = run?.constraints?.familiar?.();
      const outfit = new Outfit();
      if (familiar) outfit.equip(familiar);
      if (req) {
        if (req.maximizeParameters) outfit.modifier = req.maximizeParameters;
        for (const item of req.maximizeOptions.forceEquip ?? []) {
          if (!outfit.equip(item)) abort(`Failed to equip item ${item} for free running`);
        }
      }
      return combatOutfit(outfit.spec());
    },
    combat: new CandyStrategy(() => Macro.step(getRunSource()?.macro ?? Macro.abort())),
    sobriety: "sober",
  },
];

export default GLOBAL_TASKS;
