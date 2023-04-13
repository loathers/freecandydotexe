import { Args } from "grimoire-kolmafia";
import { myFamiliar } from "kolmafia";

const args = Args.create(
  "freecandydotexe",
  "A script that will not steal your identity but will do halloween for you",
  {
    blocks: Args.number({
      help: "The number of blocks to run (defaults to infinite)",
      default: Infinity,
    }),
    treatOutfit: Args.string({
      help: "The outfit to use when checking houses for trick-or-treating",
      setting: "freecandy_treatOutfit",
      default: "",
    }),
    trickOutfit: Args.string({
      help: "A custom outfit to use when doing fights for trick-or-treating",
      setting: "freecandy_trickOutfit",
      default: "",
    }),
    familiar: Args.familiar({
      help: "The familiar to use for combats",
      setting: "freecandy_familiar",
      default: myFamiliar(),
    }),
  },
  { positionalArgs: ["blocks"] }
);

export default args;
