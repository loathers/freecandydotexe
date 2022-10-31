import "core-js/modules/es.object.entries";
import {
  abort,
  bjornifyFamiliar,
  buy,
  canEquip,
  cliExecute,
  effectModifier,
  enthroneFamiliar,
  equip,
  equippedItem,
  Familiar,
  fullnessLimit,
  getOutfits,
  haveEquipped,
  inebrietyLimit,
  isAccessible,
  Item,
  itemAmount,
  mallPrice,
  myAdventures,
  myClass,
  myEffects,
  myFamiliar,
  myFullness,
  myInebriety,
  myLevel,
  numericModifier,
  outfit,
  outfitPieces,
  outfitTreats,
  runChoice,
  Slot,
  toEffect,
  toItem,
  toSlot,
  totalTurnsPlayed,
  userConfirm,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $coinmaster,
  $familiar,
  $familiars,
  $item,
  $items,
  $skill,
  $slot,
  $slots,
  clamp,
  get,
  getAverageAdventures,
  getFoldGroup,
  getSaleValue,
  have,
  JuneCleaver,
  maximizeCached,
  property,
  Requirement,
  sum,
  sumNumbers,
} from "libram";
import { pickBjorn, riderValue } from "./bjorn";
import {
  bestJuneCleaverOption,
  cache,
  juneCleaverChoiceValues,
  leprechaunMultiplier,
  meatFamiliar,
  PantsgivingFood,
  printError,
  trickFamiliar,
  valueJuneCleaverOption,
} from "./lib";

const actionRateBonus = () =>
  numericModifier("Familiar Action Bonus") / 100 +
  ($items`short stack of pancakes, short stick of butter, short glass of water`
    .map((item) => effectModifier(item, "Effect"))
    .some((effect) => have(effect))
    ? 1
    : 0);

const trickHats = $items`invisible bag, witch hat, beholed bedsheet, wolfman mask, pumpkinhead mask, mummy costume`;
const adventureFamiliars = $familiars`Temporal Riftlet, Reagnimated Gnome`;

type stasisValue = {
  baseRate: number;
  meatPerLb: number;
};

const stasisFamiliars = new Map<Familiar, stasisValue>([
  [$familiar`Ninja Pirate Zombie Robot`, { baseRate: 1 / 2, meatPerLb: 14.52 }],
  [$familiar`Cocoabo`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Stocking Mimic`, { baseRate: 1 / 3, meatPerLb: 13.2 }],
  [$familiar`Feather Boa Constrictor`, { baseRate: 1 / 3, meatPerLb: 27.5 }],
]);

//Note: both this and the weight --> weightvalue function undervalue weight. Consider fixing that.
function estimateOutfitWeight(): number {
  if (!cache.outfightWeight) {
    const accessoriesFree =
      3 -
      $items`Mr. Screege's spectacles, Mr. Cheeng's spectacles, lucky gold ring`.filter((item) =>
        have(item)
      ).length;

    const openSlots = [
      ...$slots`shirt, weapon, off-hand`,
      ...(have($item`Buddy Bjorn`) ? [] : $slots`back`),
      ...(get("_pantogramModifier").includes("Drops Items") ? [] : $slots`pants`),
    ];

    const viableItems = Item.all().filter(
      (item) =>
        have(item) &&
        (openSlots.includes(toSlot(item)) || (toSlot(item) === $slot`acc1` && accessoriesFree))
    );

    const nonAccessoryWeightEquips = openSlots.map(
      (slot) =>
        viableItems
          .filter((item) => toSlot(item) === slot)
          .sort(
            (a, b) => numericModifier(b, "Familiar Weight") - numericModifier(a, "Familiar Weight")
          )[0]
    );
    const accessoryWeightEquips = accessoriesFree
      ? viableItems
          .filter((item) => toSlot(item) === $slot`acc1`)
          .sort(
            (a, b) => numericModifier(b, "Familiar Weight") - numericModifier(a, "Familiar Weight")
          )
          .splice(0, accessoriesFree)
      : [];

    cache.outfightWeight =
      sum([...accessoryWeightEquips, ...nonAccessoryWeightEquips], (item: Item) =>
        numericModifier(item, "Familiar Weight")
      ) +
      (have($familiar`Temporal Riftlet`) ? 10 : 0) +
      (have($skill`Amphibian Sympathy`) ? 5 : 0);
  }
  return cache.outfightWeight;
}

function getEffectWeight(): number {
  if (!cache.effectWeight) {
    cache.effectWeight = sum(
      Object.entries(myEffects())
        .map(([name, duration]) => {
          return {
            effect: toEffect(name),
            duration: duration,
          };
        })
        .filter(
          ({ effect, duration }) =>
            numericModifier(effect, "Familiar Weight") && duration >= myAdventures()
        ),
      ({ effect }) => numericModifier(effect, "Familiar Weight")
    );
  }
  return cache.effectWeight;
}

let askedAboutTwoPiece = false;
export type fightType = "Kramco" | "Digitize" | "Voter" | "Trick" | "Ghost" | "Spit Acid";
export function fightOutfit(type: fightType = "Trick"): void {
  if (property.getString("freecandy_trickOutfit")) {
    const success = outfit(property.getString("freecandy_trickOutfit"));
    if (!success) throw new Error("Unable to properly equip trickOutfit!");
    switch (type) {
      case "Kramco":
        equip($slot`off-hand`, $item`Kramco Sausage-o-Matic™`);
        break;
      case "Voter":
        equip($slot`acc1`, $item`"I Voted!" sticker`);
        break;
      case "Ghost":
        equip($slot`back`, $item`protonic accelerator pack`);
        break;
      case "Spit Acid":
        equip($item`Jurassic Parka`);
        cliExecute("parka dilophosaur");
        break;
    }
  } else {
    if (!trickHats.some((hat) => have(hat))) {
      buy(1, trickHats.sort((a, b) => mallPrice(a) - mallPrice(b))[0]);
    }
    const trickHat = trickHats.find((hat) => have(hat));
    const twoPieces = ["Bugbear Costume", "Filthy Hippy Disguise"]
      .map((name) => outfitPieces(name))
      .find((fit) => fit.every((it) => have(it) && canEquip(it)));
    if (!trickHat) {
      if (twoPieces) {
        if (
          !askedAboutTwoPiece &&
          !userConfirm(
            "We don't have access to a one-piece outfit, but we did find a two-piece outfit. Is that alright?"
          )
        ) {
          printError("We cannot create a good trick outfit, and must give up.");
          abort();
        } else {
          askedAboutTwoPiece = true;
        }
      } else {
        printError("We couldn't find any one- or two-piece outfits!");
        abort();
      }
    }

    const forceEquips: Item[] = [];
    const maximizeTargets: string[] = [];

    const bonusEquips = new Map<Item, number>([
      [$item`lucky gold ring`, 400],
      [$item`Mr. Cheeng's spectacles`, 250],
      [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
      [$item`Mr. Screege's spectacles`, 180],
      [
        $item`bag of many confections`,
        getSaleValue(...$items`Polka Pop, BitterSweetTarts, Piddles`) / 6,
      ],
      ...snowSuit(),
      ...mayflowerBouquet(),
      ...pantsgiving(),
      ...juneCleaver(),
    ]);

    switch (type) {
      case "Kramco":
        forceEquips.push($item`Kramco Sausage-o-Matic™`);
        break;
      case "Voter":
        forceEquips.push($item`"I Voted!" sticker`);
        break;
      case "Ghost":
        forceEquips.push($item`protonic accelerator pack`);
        maximizeTargets.push("DA");
        maximizeTargets.push("DR");
        break;
      case "Trick":
        if (trickHat) forceEquips.push(trickHat);
        else if (twoPieces) forceEquips.push(...twoPieces);
        else abort("Cannot wear a sensible outfit");
        break;
      case "Spit Acid":
        forceEquips.push($item`Jurassic Parka`);
        break;
    }

    if (
      have($item`protonic accelerator pack`) &&
      forceEquips.every((item) => toSlot(item) !== $slot`back`) &&
      get("questPAGhost") === "unstarted" &&
      get("nextParanormalActivity") <= totalTurnsPlayed() &&
      myInebriety() <= inebrietyLimit()
    )
      forceEquips.push($item`protonic accelerator pack`);

    if (trickFamiliar() === $familiar`Reagnimated Gnome`) {
      forceEquips.push($item`gnomish housemaid's kgnee`);
      if (!have($item`gnomish housemaid's kgnee`)) {
        visitUrl("arena.php");
        runChoice(4);
      }
    }
    if (
      !adventureFamiliars.includes(trickFamiliar()) &&
      !stasisFamiliars.has(trickFamiliar()) &&
      have($item`tiny stillsuit`)
    ) {
      forceEquips.push($item`tiny stillsuit`);
    }

    const stasisData = stasisFamiliars.get(myFamiliar());
    if (stasisData) {
      if (
        stasisData.baseRate + actionRateBonus() < 1 &&
        getFoldGroup($item`Loathing Legion helicopter`).some((foldable) => have(foldable))
      ) {
        forceEquips.push($item`Loathing Legion helicopter`);
      }
    }

    const weightValue = stasisData
      ? //action rate times weight per lb
        clamp(
          stasisData.baseRate +
            actionRateBonus() +
            (forceEquips.includes($item`Loathing Legion helicopter`) &&
            !haveEquipped($item`Loathing Legion helicopter`)
              ? 0.25
              : 0),
          0,
          1
        ) * stasisData.meatPerLb
      : adventureFamiliars.includes(trickFamiliar())
      ? // https://www.desmos.com/calculator/y8iszw6rfk
        // Very basic linear approximation of the value of additional weight
        0.00123839009288 * baseAdventureValue()
      : 0;

    const bjornalikeToUse = bestBjornalike(forceEquips);
    if (bjornalikeToUse) bonusEquips.set(bjornalikeToUse, riderValue(pickBjorn()));

    maximizeCached(
      [
        `${Math.round(weightValue * 100) / 100} Familiar Weight`,
        ...(have($item`SongBoom™ BoomBox`) ? ["0.25 Meat Drop"] : []),
        "0.01 Item Drop",
        ...maximizeTargets,
      ],
      {
        forceEquip: forceEquips,
        bonusEquip: bonusEquips,
        preventSlot: $slots`buddy-bjorn, crown-of-thrones`,
        preventEquip:
          bjornalikeToUse === $item`Buddy Bjorn` ? $items`Crown of Thrones` : $items`Buddy Bjorn`,
        useOutfitCaching: true,
      }
    );

    if (bjornalikeToUse && equippedItem(toSlot(bjornalikeToUse)) === $item`none`)
      equip(toSlot(bjornalikeToUse), bjornalikeToUse);

    if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(pickBjorn().familiar);
    if (haveEquipped($item`Crown of Thrones`)) enthroneFamiliar(pickBjorn().familiar);
    if (type === "Spit Acid" && haveEquipped($item`Jurassic Parka`))
      cliExecute("parka dilophosaur");
  }
}

function snowSuit() {
  if (!have($item`Snow Suit`) || get("_carrotNoseDrops") >= 3) return new Map<Item, number>([]);

  return new Map<Item, number>([[$item`Snow Suit`, getSaleValue($item`carrot nose`) / 10]]);
}

function mayflowerBouquet() {
  // +40% meat drop 12.5% of the time (effectively 5%)
  // Drops flowers 50% of the time, wiki says 5-10 a day.
  // Theorized that flower drop rate drops off but no info on wiki.
  // During testing I got 4 drops then the 5th took like 40 more adventures
  // so let's just assume rate drops by 11% with a min of 1% ¯\_(ツ)_/¯

  if (!have($item`Mayflower bouquet`) || get("_mayflowerDrops") >= 10)
    return new Map<Item, number>([]);

  const averageFlowerValue =
    getSaleValue(
      ...$items`tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia`
    ) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return new Map<Item, number>([[$item`Mayflower bouquet`, averageFlowerValue]]);
}

function pantsgiving(): Map<Item, number> {
  if (!have($item`Pantsgiving`)) return new Map<Item, number>();
  const count = get("_pantsgivingCount");
  const turnArray = [5, 50, 500, 5000];
  const index =
    myFullness() === fullnessLimit()
      ? get("_pantsgivingFullness")
      : turnArray.findIndex((x) => count < x);
  const turns = turnArray[index] || 50000;

  if (turns - count > myAdventures()) return new Map<Item, number>();
  const foodPick = getPantsgivingFood();
  const fullnessValue =
    overallAdventureValue() *
      (getAverageAdventures(foodPick.food) + 1 + (get("_fudgeSporkUsed") ? 3 : 0)) -
    (foodPick.costOverride?.() ?? mallPrice(foodPick.food)) -
    mallPrice($item`Special Seasoning`) -
    (get("_fudgeSporkUsed") ? mallPrice($item`fudge spork`) : 0);
  const pantsgivingBonus = fullnessValue / (turns * 0.9);
  return new Map<Item, number>([[$item`Pantsgiving`, pantsgivingBonus]]);
}

function overallAdventureValue(): number {
  const bonuses = new Map<Item, number>([
    [$item`lucky gold ring`, 400],
    [$item`Mr. Cheeng's spectacles`, 250],
    [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
    [$item`Mr. Screege's spectacles`, 180],
    [
      $item`bag of many confections`,
      getSaleValue(...$items`Polka Pop, BitterSweetTarts, Piddles`) / 6,
    ],
    ...snowSuit(),
    ...mayflowerBouquet(),
    ...juneCleaver(),
    ...sweatpants(),
  ]);
  const treatsAndBonusEquips =
    sum(
      Slot.all().map((slot) => {
        const equip = equippedItem(slot);
        const bonus = bonuses.get(equip);
        return bonus === undefined ? 0 : bonus;
      }),
      (number: number) => number
    ) +
    baseAdventureValue() +
    (haveEquipped($item`Buddy Bjorn`) || haveEquipped($item`Crown of Thrones`)
      ? riderValue(pickBjorn())
      : 0);
  const stasisData = stasisFamiliars.get(trickFamiliar());
  if (stasisData) {
    return (
      treatsAndBonusEquips +
      (20 + estimateOutfitWeight() + getEffectWeight()) *
        (stasisData.meatPerLb * clamp(stasisData.baseRate + actionRateBonus(), 0, 1))
    );
  } else if (adventureFamiliars.includes(trickFamiliar())) {
    return (treatsAndBonusEquips * 1000) / (1000 - getEffectWeight() - estimateOutfitWeight() - 20);
  } else return treatsAndBonusEquips;
}

const pantsgivingFoods: PantsgivingFood[] = [
  {
    food: $item`glass of raw eggs`,
    costOverride: () => 0,
    canGet: () => have($item`glass of raw eggs`),
  },
  {
    food: $item`Affirmation Cookie`,
    canGet: () => true,
  },
  {
    food: $item`disco biscuit`,
    canGet: () => true,
  },
  {
    food: $item`ice rice`,
    canGet: () => true,
  },
  {
    food: $item`Tea, Earl Grey, Hot`,
    canGet: () => true,
  },
  {
    food: $item`Dreadsylvanian stew`,
    costOverride: () =>
      (10 / 20) *
      Math.max(getSaleValue($item`electric Kool-Aid`), getSaleValue($item`bottle of Bloodweiser`)),
    canGet: () =>
      have($item`Freddy Kruegerand`, 10) &&
      isAccessible($coinmaster`The Terrified Eagle Inn`) &&
      myLevel() >= 20,
  },
  {
    food: $item`FantasyRealm turkey leg`,
    costOverride: () => 0,
    canGet: () => {
      if (!have($item`Rubee™`, 100)) return false;
      if (!get("_frToday") && !get("frAlways")) return false;
      if (have($item`FantasyRealm G. E. M.`)) return true;
      visitUrl("place.php?whichplace=realm_fantasy&action=fr_initcenter");
      runChoice(1);
      return have($item`FantasyRealm G. E. M.`);
    },
  },
];

const valuePantsgivingFood = (foodChoice: PantsgivingFood) =>
  getAverageAdventures(foodChoice.food) * overallAdventureValue() -
  (foodChoice.costOverride?.() ?? mallPrice(foodChoice.food));

export function getPantsgivingFood(): PantsgivingFood {
  if (cache.pantsgivingFood) {
    if (!have(cache.pantsgivingFood.food) && !cache.pantsgivingFood.canGet()) {
      cache.pantsgivingFood = undefined;
    }
  }
  if (!cache.pantsgivingFood) {
    cache.pantsgivingFood = pantsgivingFoods
      .filter((x) => have(x.food) || x.canGet())
      .reduce((a, b) => (valuePantsgivingFood(a) > valuePantsgivingFood(b) ? a : b));
  }
  return cache.pantsgivingFood;
}

export function baseAdventureValue(): number {
  if (cache.baseAdventureValue === undefined) {
    cache.baseAdventureValue =
      (1 / 5) *
      (3 *
        sumNumbers(
          Object.entries(outfitTreats(bestOutfit())).map(
            ([candyName, probability]) => getSaleValue(toItem(candyName)) * probability
          )
        ) *
        (have($familiar`Trick-or-Treating Tot`) ? 1.6 : 0) +
        (1 / 5) * getSaleValue($item`huge bowl of candy`) +
        (have($familiar`Trick-or-Treating Tot`) ? 4 * 0.2 * getSaleValue($item`Prunets`) : 0));
  }
  return cache.baseAdventureValue;
}

export function bestOutfit(): string {
  if (!cache.bestOutfit) {
    const playerChosenOutfit = property.getString("freecandy_treatOutfit");
    if (playerChosenOutfit) cache.bestOutfit = playerChosenOutfit;
    else {
      const flyestFit = getOutfits()
        .filter((outfitName) => outfitPieces(outfitName).every((piece) => canEquip(piece)))
        .map(
          (outfitName) =>
            [
              outfitName,
              sumNumbers(
                Object.entries(outfitTreats(outfitName)).map(
                  ([candyName, probability]) => getSaleValue(toItem(candyName)) * probability
                )
              ),
            ] as [string, number]
        )
        .sort((a, b) => b[1] - a[1])[0][0];

      if (!flyestFit) throw "You somehow have no outfits, dude!";
      cache.bestOutfit = flyestFit;
    }
  }

  Object.entries(outfitTreats(cache.bestOutfit)).forEach(([candy]) => {
    if (!cache.startingCandies.has(toItem(candy)))
      cache.startingCandies.set(toItem(candy), itemAmount(toItem(candy)));
  });
  return cache.bestOutfit;
}

export function meatOutfit(): void {
  const bjornFam = pickBjorn();
  const bjornalike = bestBjornalike([]);
  new Requirement(["1000 Meat Drop"], {
    bonusEquip: new Map<Item, number>([
      [$item`lucky gold ring`, 400],
      [$item`Mr. Cheeng's spectacles`, 250],
      [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
      [$item`Mr. Screege's spectacles`, 180],
      [
        $item`bag of many confections`,
        getSaleValue(...$items`Polka Pop, BitterSweetTarts, Piddles`) / 6,
      ],
      ...snowSuit(),
      ...mayflowerBouquet(),
      ...juneCleaver(),
      [$item`mafia thumb ring`, 0.04 * overallAdventureValue()],
      ...(bjornalike ? new Map([[bjornalike, riderValue(bjornFam)]]) : []),
    ]),
    preventEquip: $items`Buddy Bjorn, Crown of Thrones`.filter((bjorn) => bjorn !== bjornalike),
    forceEquip: myInebriety() > inebrietyLimit() ? $items`Drunkula's wineglass` : [],
  }).maximize();
  if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(bjornFam.familiar);
  else if (haveEquipped($item`Crown of Thrones`)) enthroneFamiliar(bjornFam.familiar);
}

function bestBjornalike(existingForceEquips: Item[]): Item | undefined {
  const bjornalikes = $items`Buddy Bjorn, Crown of Thrones`;
  const slots = bjornalikes
    .map((bjornalike) => toSlot(bjornalike))
    .filter((slot) => !existingForceEquips.some((equipment) => toSlot(equipment) === slot));
  if (!slots.length) return undefined;
  if (slots.length < 2 || bjornalikes.some((thing) => !have(thing))) {
    return bjornalikes.find((thing) => have(thing) && slots.includes(toSlot(thing)));
  }

  const hasStrongLep = leprechaunMultiplier(meatFamiliar()) >= 2;
  const goodRobortHats = $items`crumpled felt fedora`;
  if (myClass() === $class`Turtle Tamer`) goodRobortHats.push($item`warbear foil hat`);
  if (numericModifier($item`shining star cap`, "Familiar Weight") === 10)
    goodRobortHats.push($item`shining star cap`);
  if (have($item`carpe`) && (!hasStrongLep || !goodRobortHats.some((hat) => have(hat)))) {
    return $item`Crown of Thrones`;
  }
  return $item`Buddy Bjorn`;
}

let juneCleaverEV: number | null = null;
function juneCleaver(): Map<Item, number> {
  if (!have($item`June cleaver`) || get("_juneCleaverFightsLeft") > myAdventures()) {
    return new Map();
  }
  if (!juneCleaverEV) {
    juneCleaverEV =
      JuneCleaver.choices.reduce(
        (total, choice) =>
          total +
          valueJuneCleaverOption(juneCleaverChoiceValues[choice][bestJuneCleaverOption(choice)]),
        0
      ) / JuneCleaver.choices.length;
  }

  return new Map<Item, number>([[$item`June cleaver`, juneCleaverEV / JuneCleaver.getInterval()]]);
}

function sweatpants() {
  if (!have($item`designer sweatpants`)) return new Map();

  const needSweat = get("sweat", 0) < 25 * (3 - get("_sweatOutSomeBoozeUsed", 0));

  if (!needSweat) return new Map();

  const VOA = get("valueOfAdventure");

  const bestPerfectDrink =
    $items`perfect cosmopolitan, perfect negroni, perfect dark and stormy, perfect mimosa, perfect old-fashioned, perfect paloma`
      .map((item) => ({ item, price: mallPrice(item) }))
      .reduce((a, b) => (a.price < b.price ? a : b)).item;
  const perfectDrinkValuePerDrunk =
    ((getAverageAdventures(bestPerfectDrink) + 3) * VOA - mallPrice(bestPerfectDrink)) / 3;
  const splendidMartiniValuePerDrunk = (getAverageAdventures($item`splendid martini`) + 2) * VOA;

  const bonus = (Math.max(perfectDrinkValuePerDrunk, splendidMartiniValuePerDrunk) * 2) / 25;
  return new Map([[$item`designer sweatpants`, bonus]]);
}
