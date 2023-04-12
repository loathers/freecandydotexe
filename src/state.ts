import { abort, visitUrl } from "kolmafia";
import { ActionSource, ensureFreeRun, get, tryFindFreeRun } from "libram";

class CandyStateHandler {
  #blockHtml = "";
  treated = false;
  tricked: number[] = [];
  blocks = 0;
  digitizeInitialized = true;
  runSource: ActionSource | null = null;

  get blockHtml(): string {
    this.#blockHtml ||= visitUrl("place.php?whichplace=town&action=town_trickortreat");
    return this.#blockHtml;
  }

  refreshBlock(): void {
    this.#blockHtml = visitUrl("place.php?whichplace=town&action=town_trickortreat");
  }

  resetBlock(): void {
    this.refreshBlock();
    this.treated = false;
    this.tricked = [];
    this.blocks++;
  }

  initializeRunSource(): void {
    const run =
      tryFindFreeRun() ??
      ensureFreeRun({
        requireUnlimited: () => true,
        noFamiliar: () => true,
        noRequirements: () => true,
        maximumCost: () => get("autoBuyPriceLimit") ?? 20000,
      });
    if (!run) abort("Unable to find free run with which to initialize digitize!");
    this.runSource = run;
  }
}

const STATE = new CandyStateHandler();
export default STATE;
