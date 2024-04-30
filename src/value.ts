import { Item } from "kolmafia";
import { makeValue, ValueFunctions } from "garbo-lib";

import { $item } from "libram";

let _valueFunctions: ValueFunctions | undefined = undefined;
function freecandyValueFunctions(): ValueFunctions {
  if (!_valueFunctions) {
    _valueFunctions = makeValue({
      itemValues: new Map([[$item`fake hand`, 50000]]),
    });
  }
  return _valueFunctions;
}

export function freecandyValue(item: Item, useHistorical = false): number {
  return freecandyValueFunctions().value(item, useHistorical);
}

export function freecandyAverageValue(...items: Item[]): number {
  return freecandyValueFunctions().averageValue(...items);
}
