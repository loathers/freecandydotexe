import { descToItem, Item, runChoice, visitUrl } from "kolmafia";
import { getSaleValue } from "libram";

export function coldMedicineCabinet(): void {
  const options = visitUrl("campground.php?action=workshed");
  let i = 0;
  let match;
  const regexp = /descitem\((\d+)\)/g;
  const itemChoices = new Map<Item, number>();

  while ((match = regexp.exec(options)) !== null) {
    i++;
    const item = descToItem(match[1]);
    itemChoices.set(item, i);
  }

  const bestItem = Array.from(itemChoices.keys())
    .map((i) => [i, getSaleValue(i)] as [Item, number])
    .sort((a, b) => b[1] - a[1])[0][0];
  const bestChoice = itemChoices.get(bestItem);
  if (bestChoice && bestChoice > 0) {
    visitUrl("campground.php?action=workshed");
    runChoice(bestChoice);
  }
}
