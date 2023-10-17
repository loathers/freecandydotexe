import { WandererManager } from "garbo-lib";
import { getMonsters, myAdventures } from "kolmafia";
import { $location } from "libram";
import { freecandyValue } from "./value";

let _wanderer: WandererManager | null = null;
export function wanderer(): WandererManager {
  return (_wanderer ??= new WandererManager({
    ascend: true,
    estimatedTurns: myAdventures,
    itemValue: freecandyValue,
    effectValue: () => 0,
    prioritizeCappingGuzzlr: false,
    plentifulMonsters: [...getMonsters($location`Trick-or-Treating`)],
    freeFightExtraValue: () => 0,
  }));
}
