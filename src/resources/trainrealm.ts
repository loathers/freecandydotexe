import { getHistoricalSaleValue, today } from "../lib";
import { $item, $items, get, getSaleValue, maxBy, set, sum, TrainSet } from "libram";

const TRAIN_CANDIES = [
  $item`cotton candy bale`,
  $item`cotton candy cone`,
  $item`cotton candy pillow`,
  $item`cotton candy pinch`,
  $item`cotton candy plug`,
  $item`cotton candy skoshe`,
  $item`cotton candy smidgen`,
  $item`crazy little Turkish delight`,
  $item`Daffy Taffy`,
  $item`Elvish delight`,
  $item`explosion-flavored chewing gum`,
  $item`green candy heart`,
  $item`green gummi ingot`,
  $item`gummi canary`,
  $item`gummi salamander`,
  $item`gummi snake`,
  $item`Gummi-Gnauga`,
  $item`honey stick`,
  $item`honey-dipped locust`,
  $item`jabañero-flavored chewing gum`,
  $item`lavender candy heart`,
  $item`lime-and-chile-flavored chewing gum`,
  $item`marzipan skull`,
  $item`Mr. Mediocrebar`,
  $item`orange candy heart`,
  $item`pack of chewing gum`,
  $item`pickle-flavored chewing gum`,
  $item`Piddles`,
  $item`pile of candy`,
  $item`pink candy heart`,
  $item`pixellated candy heart`,
  $item`Polka Pop`,
  $item`red gummi ingot`,
  $item`Rock Pops`,
  $item`Senior Mints`,
  $item`Steal This Candy`,
  $item`Sugar Cog`,
  $item`sugar shard`,
  $item`tamarind-flavored chewing gum`,
  $item`Tasty Fun Good rice candy`,
  $item`white candy heart`,
  $item`white chocolate chips`,
  $item`Wint-O-Fresh mint`,
  $item`yellow candy heart`,
  $item`yellow gummi ingot`,
  $item`Yummy Tummy bean`,
];

function candyFactoryValue(): number {
  const lastCalculated = get("garbo_candyFactoryValueDate", 0);
  if (!get("garbo_candyFactoryValue", 0) || today - lastCalculated > 7 * 24 * 60 * 60 * 1000) {
    const averageDropValue = getHistoricalSaleValue(...TRAIN_CANDIES);
    set("garbo_candyFactoryValue", averageDropValue);
    set("garbo_candyFactoryValueDate", today);
  }
  return get("garbo_candyFactoryValue", 0);
}

const GOOD_TRAIN_STATIONS = [
  { piece: TrainSet.Station.GAIN_MEAT, value: () => 900 },
  {
    // Some day this'll be better
    piece: TrainSet.Station.TRACKSIDE_DINER,
    value: () => getSaleValue(...$items`bowl of cottage cheese, hot buttered roll, toast`),
  },
  { piece: TrainSet.Station.CANDY_FACTORY, value: candyFactoryValue },
  {
    piece: TrainSet.Station.GRAIN_SILO,
    value: () =>
      2 *
      getSaleValue(
        ...$items`bottle of gin, bottle of vodka, bottle of whiskey, bottle of rum, bottle of tequila, boxed wine`
      ),
  },
  {
    piece: TrainSet.Station.ORE_HOPPER,
    value: () =>
      getSaleValue(
        ...$items`linoleum ore, asbestos ore, chrome ore, teflon ore, vinyl ore, velcro ore, bubblewrap ore, cardboard ore, styrofoam ore`
      ),
  },
];

let trainCycle: TrainSet.Cycle;
function getBestCycle(): TrainSet.Cycle {
  if (!trainCycle) {
    const cycle = [
      TrainSet.Station.COAL_HOPPER,
      ...GOOD_TRAIN_STATIONS.sort(({ value: a }, { value: b }) => b() - a()).map(
        ({ piece }) => piece
      ),
      TrainSet.Station.TOWER_FIZZY,
      TrainSet.Station.VIEWING_PLATFORM,
    ] as TrainSet.Cycle;
    trainCycle = cycle;
  }
  return [...trainCycle];
}

function valueStation(station: TrainSet.Station): number {
  if (station === TrainSet.Station.COAL_HOPPER) {
    return valueStation(getBestCycle()[1]);
  }
  return GOOD_TRAIN_STATIONS.find(({ piece }) => piece === station)?.value() ?? 0;
}

function valueOffset(offset: number): number {
  const firstFortyTurns = 5 * sum(getBestCycle(), valueStation);
  const extraTurns = sum(getBestCycle().slice(0, offset - 1), valueStation);
  return (firstFortyTurns + extraTurns) / (40 + offset);
}

let bestOffset: number | null = null;
function getBestOffset(): number {
  return (bestOffset ??= maxBy([2, 3, 4, 5, 6, 7, 8], valueOffset));
}

function getPrioritizedStations(): TrainSet.Station[] {
  return getBestCycle().slice(0, getBestOffset() - 1);
}

function getRotatedCycle(): TrainSet.Cycle {
  const offset = get("trainsetPosition") % 8;
  const newPieces: TrainSet.Station[] = [];
  const defaultPieces = getBestCycle();
  for (let i = 0; i < 8; i++) {
    const newPos = (i + offset) % 8;
    newPieces[newPos] = defaultPieces[i];
  }
  return newPieces as TrainSet.Cycle;
}

export function rotateTrainToOptimalCycle(): boolean {
  return TrainSet.setConfiguration(getRotatedCycle());
}

export function willRotateTrainset(): boolean {
  return !get("trainsetConfiguration") || !getPrioritizedStations().includes(TrainSet.next());
}
