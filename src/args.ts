import { Args } from "grimoire-kolmafia";
import { getCustomOutfits, getOutfits, haveOutfit } from "kolmafia";

export const args = Args.create(
  "freecandy",
  `This script aims to rob old grannies of their candy, hijack embezzlers on the way and crash the economy`,
  {
    treatOutfit: Args.string({
      help: "The name of the outfit to wear for treats",
      default: "",
      options: [
        ["", "Best Judgement"],
        ...getOutfits()
          .filter((outfit) => outfit.length > 0 && haveOutfit(outfit))
          .map((outfit) => [outfit, outfit] as [string, string]),
      ],
    }),
    trickOutfit: Args.string({
      help: "The name of the outfit to wear for tricks",
      default: "",
      options: [
        ["", "Best Judgement"],
        ...getCustomOutfits()
          .filter((outfit) => outfit.length > 0 && haveOutfit(outfit))
          .map((outfit) => [outfit, `Custom: ${outfit}`] as [string, string]),
        ...getOutfits()
          .filter((outfit) => outfit.length > 0 && haveOutfit(outfit))
          .map((outfit) => [outfit, outfit] as [string, string]),
      ],
    }),
  }
);
