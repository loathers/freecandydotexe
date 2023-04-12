import {
  appearanceRates,
  getLocationMonsters,
  itemDropsArray,
  Location,
  toMonster,
} from "kolmafia";
import { maxBy, SourceTerminal, sum } from "libram";
import {
  canAdventureOrUnlock,
  canWander,
  DraggableFight,
  underwater,
  UnlockableZones,
  WandererTarget,
} from "./lib";
import { getHistoricalSaleValue } from "../lib";

function averageYrValue(location: Location) {
  const badAttributes = ["LUCKY", "ULTRARARE", "BOSS"];
  const rates = appearanceRates(location);
  const monsters = Object.keys(getLocationMonsters(location))
    .map((m) => toMonster(m))
    .filter((m) => !badAttributes.some((s) => m.attributes.includes(s)) && rates[m.name] > 0);

  const canDuplicate = SourceTerminal.have() && SourceTerminal.duplicateUsesRemaining() > 0;
  if (monsters.length === 0) {
    return 0;
  } else {
    return (
      sum(monsters, (m) => {
        const items = itemDropsArray(m).filter((drop) => ["", "n"].includes(drop.type));
        const duplicateFactor = canDuplicate && !m.attributes.includes("NOCOPY") ? 2 : 1;
        return (
          duplicateFactor *
          sum(items, (drop) => {
            const yrRate = (drop.type === "" ? 100 : drop.rate) / 100;
            return yrRate * getHistoricalSaleValue(drop.drop);
          })
        );
      }) / monsters.length
    );
  }
}

function yrValues(): Map<Location, number> {
  const values = new Map<Location, number>();
  for (const location of Location.all().filter((l) => canAdventureOrUnlock(l) && !underwater(l))) {
    values.set(location, averageYrValue(location));
  }
  return values;
}

// Doing a free fight + yellow ray combination against a random enemy
export function yellowRayFactory(
  type: DraggableFight,
  locationSkiplist: Location[]
): WandererTarget[] {
  if (type === "yellow ray") {
    const validLocations = Location.all().filter(
      (location) => canWander(location, "yellow ray") && canAdventureOrUnlock(location)
    );
    const locationValues = yrValues();

    const bestZones = new Set<Location>([
      maxBy(validLocations, (l: Location) => locationValues.get(l) ?? 0),
    ]);
    for (const unlockableZone of UnlockableZones) {
      const extraLocations = Location.all().filter(
        (l) => l.zone === unlockableZone.zone && !locationSkiplist.includes(l)
      );
      bestZones.add(maxBy([...extraLocations], (l: Location) => locationValues.get(l) ?? 0));
    }
    if (bestZones.size > 0) {
      return [...bestZones].map(
        (l: Location) => new WandererTarget(`Yellow Ray ${l}`, l, locationValues.get(l) ?? 0)
      );
    }
  }
  return [];
}
