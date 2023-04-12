import { Engine, Outfit } from "grimoire-kolmafia";
import {
  equip,
  inebrietyLimit,
  itemAmount,
  myInebriety,
  useFamiliar,
  visitUrl,
  xpath,
} from "kolmafia";
import { CandyTask, printHighlight, State } from "./lib";
import { $familiar, $item, PropertiesManager, Session, undelay } from "libram";
import args from "./args";

export default class CandyEngine extends Engine<never, CandyTask> {
  static propertyManager = new PropertiesManager();

  session: Session;
  aaBossFlag: number;

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

    printHighlight(`freecandy has run ${State.blocks} blocks, and produced the following items:`);
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

  dress(task: CandyTask, outfit: Outfit): void {
    super.dress(task, outfit);

    if (itemAmount($item`tiny stillsuit`)) {
      equip($familiar`Mosquito`, $item`tiny stillsuit`);
    }
  }

  // I have no idea why this is necessary but it is.
  setChoices(task: CandyTask, manager: PropertiesManager): void {
    for (const [key, func] of Object.entries(task.choices ?? {})) {
      manager.setChoice(parseInt(key), undelay(func));
    }
  }
}
