import { print } from "kolmafia";
import { runBlocks } from "./trickin and treatin";

export function main(args: string): void {
  if (args.includes("help")) {
    print(
      "Set the property fcdeTreatOutfit with the name of the outfit you'd like to trick or treat in. Take out the familiar you want to use for trick or treating. Enjoy.",
      "blue"
    );
  } else if (args) runBlocks(parseInt(args));
  else runBlocks();
}

//note: set properties
