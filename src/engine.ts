import { Engine, Outfit } from "grimoire-kolmafia";
import {
  equip,
  handlingChoice,
  inebrietyLimit,
  itemAmount,
  myInebriety,
  visitUrl,
  xpath,
} from "kolmafia";
import { CandyTask } from "./lib";
import { $familiar, $item, ActionSource, get, PropertiesManager } from "libram";

export default class CandyEngine extends Engine<never, CandyTask> {
  static #blockHtml = "";
  static treated = false;
  static tricked: number[] = [];
  static blocks = 0;
  static digitizeInitialized = true;
  static runSource: ActionSource | null = null;
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
  }

  destruct(): void {
    super.destruct();
    visitUrl(
      `account.php?actions[]=flag_aabosses&flag_aabosses=${this.aaBossFlag}&action=Update`,
      true
    );
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
}
