import {
  createRiderMode,
  FamiliarRider,
  pickRider,
} from "libram/dist/resources/2010/CrownOfThrones";

createRiderMode("default", () => 0, false, true);

export function chooseRider(): FamiliarRider {
  const attempt = pickRider("default");
  if (attempt) return attempt;
  throw new Error("Unable to make a sensible bjorn decision.");
}

export const riderValue: (choice: FamiliarRider) => number = (choice: FamiliarRider) =>
  choice.dropPredicate?.() ?? true ? choice.meatVal() * choice.probability : 0;
