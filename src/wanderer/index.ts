import { inebrietyLimit, Location, myInebriety } from "kolmafia";
import { $location } from "libram";
import { manager, printHighlight } from "../lib";
import { guzzlrFactory } from "./guzzlr";
import {
  canAdventureOrUnlock,
  defaultFactory,
  DraggableFight,
  maxBy,
  unlock,
  unsupportedChoices,
  WandererFactory,
  WandererLocation,
} from "./lib";
import { lovebugsFactory } from "./lovebugs";
import { yellowRayFactory } from "./yellowray";

export { DraggableFight };

const wanderFactories: WandererFactory[] = [
  defaultFactory,
  yellowRayFactory,
  lovebugsFactory,
  guzzlrFactory,
];

export function bestWander(
  type: DraggableFight,
  locationSkiplist: Location[],
  nameSkiplist: string[]
): WandererLocation {
  const possibleLocations = new Map<Location, WandererLocation>();

  for (const wanderFactory of wanderFactories) {
    const wanderTargets = wanderFactory(type, locationSkiplist);
    for (const wanderTarget of wanderTargets) {
      if (
        !nameSkiplist.includes(wanderTarget.name) &&
        !locationSkiplist.includes(wanderTarget.location)
      ) {
        const wandererLocation: WandererLocation = possibleLocations.get(wanderTarget.location) ?? {
          location: wanderTarget.location,
          targets: [],
          value: 0,
        };
        wandererLocation.targets = [...wandererLocation.targets, wanderTarget];
        wandererLocation.value += wanderTarget.value;
        possibleLocations.set(wandererLocation.location, wandererLocation);
      }
    }
  }

  if (possibleLocations.size === 0) {
    throw "Could not determine a wander target!";
  }

  return maxBy([...possibleLocations.values()], (w: WandererLocation) => w.value);
}

/**
 * Recursively Check for zones to wander to
 * @param type type of fight we are looking for
 * @param nameSkiplist Any wanderer tasks that should be skipped because they could not be prepared
 * @param locationSkiplist Any locations that should be skipped because they could not be unlocked
 * @returns A location at which to wander
 */
export function wanderWhere(
  type: DraggableFight,
  nameSkiplist: string[] = [],
  locationSkiplist: Location[] = []
): Location {
  const candidate = bestWander(type, locationSkiplist, nameSkiplist);
  const failed = candidate.targets.filter((target) => !target.prepareTurn());

  const badLocation =
    !canAdventureOrUnlock(candidate.location) || !unlock(candidate.location, candidate.value)
      ? [candidate.location]
      : [];

  if (failed.length > 0 || badLocation.length > 0) {
    return wanderWhere(
      type,
      [...nameSkiplist, ...failed.map((target) => target.name)],
      [...locationSkiplist, ...badLocation]
    );
  } else {
    manager.setChoices(unsupportedChoices.get(candidate.location) ?? {});
    const targets = candidate.targets.map((t) => t.name).join("; ");
    const value = candidate.value.toFixed(2);
    printHighlight(`Wandering at ${candidate.location} for expected value ${value} (${targets})`);

    return candidate.location;
  }
}

const sober = () => myInebriety() <= inebrietyLimit();
export function drunkSafeWander(type: DraggableFight): Location {
  return sober() ? wanderWhere(type) : $location`Drunken Stupor`;
}
