import { Engine, Outfit } from "grimoire-kolmafia";
import {
  abort,
  equip,
  handlingChoice,
  inebrietyLimit,
  itemAmount,
  myInebriety,
  useFamiliar,
  visitUrl,
  xpath,
} from "kolmafia";
import { CandyTask, printHighlight } from "./lib";
import {
  $familiar,
  $item,
  ActionSource,
  ensureFreeRun,
  get,
  PropertiesManager,
  Session,
  tryFindFreeRun,
  undelay,
} from "libram";
import args from "./args";

export default class CandyEngine extends Engine<never, CandyTask> {
  session: Session;

  static #blockHtml = "";
  static treated = false;
  static tricked: number[] = [];
  static blocks = 0;
  static digitizeInitialized = true;
  static runSource: ActionSource | null = null;
  static initializeRunSource(): void {
    const run =
      tryFindFreeRun() ??
      ensureFreeRun({
        requireUnlimited: () => true,
        noFamiliar: () => true,
        noRequirements: () => true,
        maximumCost: () => get("autoBuyPriceLimit") ?? 20000,
      });
    if (!run) abort("Unable to find free run with which to initialize digitize!");
    CandyEngine.runSource = run;
  }
  static propertyManager = new PropertiesManager();
  aaBossFlag: number;

  static get blockHtml(): string {
    this.#blockHtml ||= visitUrl("place.php?whichplace=town&action=town_trickortreat");
    return this.#blockHtml;
  }

  static refreshBlock(): void {
    this.#blockHtml = visitUrl("place.php?whichplace=town&action=town_trickortreat");
  }

  static resetBlock(): void {
    this.refreshBlock();
    this.treated = false;
    this.tricked = [];
    this.blocks++;
  }

  constructor(tasks: CandyTask[]) {
    super(tasks);
    this.aaBossFlag =
      xpath(
        visitUrl("account.php?tab=combat"),
        `//*[@id="opt_flag_aabosses"]/label/input[@type='checkbox']@checked`
      )[0] === "checked"
        ? 1
        : 0;
    this.propertyManager = CandyEngine.propertyManager;
    this.session = Session.current();
  }

  destruct(): void {
    super.destruct();
    visitUrl(
      `account.php?actions[]=flag_aabosses&flag_aabosses=${this.aaBossFlag}&action=Update`,
      true
    );
    useFamiliar(args.familiar);

    printHighlight(
      `freecandy has run ${CandyEngine.blocks} blocks, and produced the following items:`
    );
    for (const [item, quantity] of Session.current().diff(this.session).items) {
      printHighlight(` ${item}: ${quantity}`);
    }
  }

  available(task: CandyTask): boolean {
    const isDrunk = myInebriety() > inebrietyLimit();
    const { sobriety } = task;
    if (isDrunk && sobriety === "sober") return false;
    if (!isDrunk && sobriety === "drunk") return false;
    return super.available(task);
  }

  do(task: CandyTask): void {
    if (task.tricktreat) {
      const onPage = handlingChoice() && get("lastChoice") === "804";
      if (!onPage) CandyEngine.refreshBlock();
    }
    super.do(task);
    if (task.canInitializeDigitize) CandyEngine.digitizeInitialized = true;
  }

  dress(task: CandyTask, outfit: Outfit): void {
    super.dress(task, outfit);

    if (itemAmount($item`tiny stillsuit`)) {
      equip($familiar`Mosquito`, $item`tiny stillsuit`);
    }
  }

  setChoices(task: CandyTask, manager: PropertiesManager): void {
    for (const [key, func] of Object.entries(task.choices ?? {})) {
      manager.setChoice(parseInt(key), undelay(func));
    }
  }
}
