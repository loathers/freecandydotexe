import { AutumnAtonManager } from "garbo-lib";
import { freecandyAverageValue } from "../value";

export const bestAutumnatonLocation = new AutumnAtonManager({
  averageItemValue: freecandyAverageValue,
}).bestLocation;
