import {
  autosellPrice,
  eat,
  gametimeToInt,
  historicalAge,
  historicalPrice,
  Item,
  myAdventures,
  myHp,
  myMaxhp,
  myMaxmp,
  myMp,
  print,
  restoreHp,
  restoreMp,
} from "kolmafia";
import { $item, get, getSaleValue, have, SourceTerminal, sum } from "libram";
import { isDarkMode } from "kolmafia";
import { StrictCombatTask } from "grimoire-kolmafia";
import { CandyStrategy } from "./combat";

export function safeRestore(): void {
  if (myHp() < myMaxhp() * 0.5) {
    restoreHp(myMaxhp() * 0.9);
  }
  const mpTarget = Math.min(myMaxmp(), 200);
  if (myMp() < mpTarget) {
    if (
      (have($item`magical sausage`) || have($item`magical sausage casing`)) &&
      get("_sausagesEaten") < 23
    ) {
      eat($item`magical sausage`);
    } else restoreMp(mpTarget);
  }
}

export function printHighlight(message: string): void {
  const color = isDarkMode() ? "yellow" : "blue";
  print(message, color);
}

export function printError(message: string): void {
  const color = "red";
  print(message, color);
}

export type CandyTask = StrictCombatTask<never, CandyStrategy> & {
  sobriety?: "sober" | "drunk";
};

export function getHistoricalSaleValue(...items: Item[]): number {
  return (
    sum(items, (item) => {
      if (historicalAge(item) <= 7.0 && historicalPrice(item) > 0) {
        const isMallMin = historicalPrice(item) === Math.max(100, 2 * autosellPrice(item));
        return isMallMin ? autosellPrice(item) : 0.9 * historicalPrice(item);
      }
      return getSaleValue(item);
    }) / items.length
  );
}

export const State = {
  blocks: 0,
};

export const today = Date.now() - gametimeToInt() - 1000 * 60 * 3.5;

export function shouldRedigitize(): boolean {
  if (!SourceTerminal.have()) return false;
  return (
    myAdventures() * 1.1 <
    SourceTerminal.getDigitizeUsesRemaining() *
      (5 *
        (get("_sourceTerminalDigitizeMonsterCount") *
          (1 + get("_sourceTerminalDigitizeMonsterCount"))) -
        3)
  );
}
