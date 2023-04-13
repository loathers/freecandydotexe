import { Item, Location } from "kolmafia";
import { $item, $location, get, getSaleValue } from "libram";
import { realmAvailable, RealmType, WandererTarget } from "./lib";

type LovebugTarget = { element: RealmType; location: Location; target: Item; cost: number };
const LovebugTargets: LovebugTarget[] = [
  {
    element: "cold",
    location: $location`VYKEA`,
    target: $item`one-day ticket to The Glaciest`,
    cost: 50,
  },
  {
    element: "sleaze",
    location: $location`The Fun-Guy Mansion`,
    target: $item`one-day ticket to Spring Break Beach`,
    cost: 100,
  },
  {
    element: "spooky",
    location: $location`The Deep Dark Jungle`,
    target: $item`one-day ticket to Conspiracy Island`,
    cost: 50,
  },
];

export function lovebugsFactory(): WandererTarget[] {
  if (get("lovebugsUnlocked")) {
    return LovebugTargets.filter((t) => realmAvailable(t.element)).map(
      (t) =>
        new WandererTarget(
          `Lovebugs ${t.location}`,
          t.location,
          (getSaleValue(t.target) * 0.05) / t.cost
        )
    );
  }
  return [];
}
