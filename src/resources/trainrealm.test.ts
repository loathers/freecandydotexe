import {
  rotateTrainToOptimalCycle,
  willRotateTrainset,
} from "./trainrealm";

// Mock libram functions completely
jest.mock("libram", () => {
  // Define the TrainSet structure to match the actual libram interface
  const TrainSetStations = {
    COAL_HOPPER: 'coal_hopper',
    GAIN_MEAT: 'gain_meat',
    TRACKSIDE_DINER: 'trackside_diner',
    CANDY_FACTORY: 'candy_factory',
    GRAIN_SILO: 'grain_silo',
    ORE_HOPPER: 'ore_hopper',
    TOWER_FIZZY: 'tower_fizzy',
    VIEWING_PLATFORM: 'viewing_platform',
  };

  return {
    $item: jest.fn((template: TemplateStringsArray) => template.join('').trim()),
    $items: jest.fn((template: TemplateStringsArray) => {
      // When called with template literals like $items`item1, item2, item3`
      const str = template.join('').trim();
      return str.split(',').map(s => s.trim());
    }),
    arrayEquals: jest.fn((a: any[], b: any[]) => JSON.stringify(a) === JSON.stringify(b)),
    get: jest.fn((key: string) => {
      switch(key) {
        case "trainsetPosition": return 0;
        case "trainsetConfiguration": return "";
        default: return 0;
      }
    }),
    set: jest.fn((key: string, value: any) => undefined),
    maxBy: jest.fn((arr: any[], fn: (item: any) => number) => {
      if (arr.length === 0) return undefined;
      return arr.reduce((max, current) => {
        return fn(current) > fn(max) ? current : max;
      });
    }),
    sum: jest.fn((arr: any[], fn: (item: any) => number) => {
      return arr.reduce((total, item) => total + fn(item), 0);
    }),
    TrainSet: {
      Station: TrainSetStations,
      canConfigure: jest.fn(),
      next: jest.fn(),
      cycle: jest.fn(),
      setConfiguration: jest.fn()
    }
  };
});

// Mock the freecandyAverageValue function since it's imported from another module
jest.mock("../value", () => ({
  freecandyAverageValue: (...items: any[]) => {
    // Return a mock value based on items
    const itemCount = items.length;
    return itemCount > 0 ? itemCount * 10 : 0;
  },
}));

describe("trainrealm", () => {
  const libram = require("libram");

  beforeEach(() => {
    // Reset any cached values and mocks
    jest.clearAllMocks();

    // Set up a clean game state
    (libram.set as jest.Mock).mockImplementation((key: string, value: any) => undefined);
    (libram.get as jest.Mock).mockImplementation((key: string) => {
      switch(key) {
        case "trainsetPosition": return 0;
        case "trainsetConfiguration": return "";
        case "_lastCombat": return 0;
        default: return 0;
      }
    });

    // Mock TrainSet methods
    (libram.TrainSet.canConfigure as jest.Mock).mockReturnValue(true);
    (libram.TrainSet.next as jest.Mock).mockReturnValue(libram.TrainSet.Station.COAL_HOPPER);
    (libram.TrainSet.cycle as jest.Mock).mockReturnValue([
      libram.TrainSet.Station.COAL_HOPPER,
      libram.TrainSet.Station.GAIN_MEAT,
      libram.TrainSet.Station.CANDY_FACTORY,
      libram.TrainSet.Station.GRAIN_SILO,
      libram.TrainSet.Station.ORE_HOPPER,
      libram.TrainSet.Station.TRACKSIDE_DINER,
      libram.TrainSet.Station.TOWER_FIZZY,
      libram.TrainSet.Station.VIEWING_PLATFORM,
    ]);

    (libram.TrainSet.setConfiguration as jest.Mock).mockReturnValue(true);

    // Mock Date.now for consistent tests
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2019-04-22T10:20:30Z').valueOf());
  });

  afterEach(() => {
    (global.Date.now as jest.Mock).mockRestore();
  });

  describe("rotateTrainToOptimalCycle", () => {
    it("should attempt to configure train set with optimal cycle", () => {
      const result = rotateTrainToOptimalCycle();

      expect(libram.TrainSet.setConfiguration).toHaveBeenCalledWith(expect.any(Array));
      expect(result).toBe(true);
    });

    it("should return false if train set configuration fails", () => {
      (libram.TrainSet.setConfiguration as jest.Mock).mockReturnValue(false);

      const result = rotateTrainToOptimalCycle();

      expect(libram.TrainSet.setConfiguration).toHaveBeenCalledWith(expect.any(Array));
      expect(result).toBe(false);
    });
  });

  describe("willRotateTrainset", () => {
    beforeEach(() => {
      // Ensure TrainSet methods are mocked consistently
      (libram.TrainSet.canConfigure as jest.Mock).mockReturnValue(true);
      (libram.TrainSet.next as jest.Mock).mockReturnValue(libram.TrainSet.Station.COAL_HOPPER);
      (libram.TrainSet.cycle as jest.Mock).mockReturnValue([
        libram.TrainSet.Station.COAL_HOPPER,
        libram.TrainSet.Station.GAIN_MEAT,
        libram.TrainSet.Station.CANDY_FACTORY,
        libram.TrainSet.Station.GRAIN_SILO,
        libram.TrainSet.Station.ORE_HOPPER,
        libram.TrainSet.Station.TRACKSIDE_DINER,
        libram.TrainSet.Station.TOWER_FIZZY,
        libram.TrainSet.Station.VIEWING_PLATFORM,
      ]);
    });

    it("should return true when train set configuration is empty", () => {
      (require("libram").get as jest.Mock).mockImplementation((key: string) => {
        if (key === "trainsetConfiguration") return "";
        if (key === "trainsetPosition") return 0;
        return 0;
      });

      const result = willRotateTrainset();
      expect(result).toBe(true);
    });

    it("should return false when train set cannot be configured", () => {
      (require("libram").TrainSet.canConfigure as jest.Mock).mockReturnValue(false);
      (require("libram").get as jest.Mock).mockImplementation((key: string) => {
        if (key === "trainsetConfiguration") return "some-config";
        if (key === "trainsetPosition") return 0;
        return 0;
      });

      const result = willRotateTrainset();
      expect(result).toBe(false);
    });

    it("should return true when current station is not in prioritized stations", () => {
      (require("libram").get as jest.Mock).mockImplementation((key: string) => {
        if (key === "trainsetConfiguration") return "some-config";
        if (key === "trainsetPosition") return 0;
        return 0;
      });
      // Mock a different cycle to ensure that cycles are not equal
      (require("libram").TrainSet.cycle as jest.Mock).mockReturnValue([
        require("libram").TrainSet.Station.VIEWING_PLATFORM,
        require("libram").TrainSet.Station.COAL_HOPPER,
        require("libram").TrainSet.Station.GAIN_MEAT,
        require("libram").TrainSet.Station.CANDY_FACTORY,
        require("libram").TrainSet.Station.GRAIN_SILO,
        require("libram").TrainSet.Station.ORE_HOPPER,
        require("libram").TrainSet.Station.TRACKSIDE_DINER,
        require("libram").TrainSet.Station.TOWER_FIZZY,
      ]);
      // Use a station that will likely not be in the prioritized stations
      (require("libram").TrainSet.next as jest.Mock).mockReturnValue(require("libram").TrainSet.Station.TOWER_FIZZY);

      const result = willRotateTrainset();
      expect(result).toBe(true);
    });

    it("should return true when current cycle is different from rotated cycle", () => {
      (require("libram").get as jest.Mock).mockImplementation((key: string) => {
        if (key === "trainsetConfiguration") return "some-config";
        if (key === "trainsetPosition") return 0;
        return 0;
      });
      (require("libram").TrainSet.next as jest.Mock).mockReturnValue(require("libram").TrainSet.Station.VIEWING_PLATFORM);
      // Mock a different cycle than what will be computed internally
      (require("libram").TrainSet.cycle as jest.Mock).mockReturnValue([
        require("libram").TrainSet.Station.VIEWING_PLATFORM,
        require("libram").TrainSet.Station.COAL_HOPPER,
        require("libram").TrainSet.Station.GAIN_MEAT,
        require("libram").TrainSet.Station.CANDY_FACTORY,
        require("libram").TrainSet.Station.GRAIN_SILO,
        require("libram").TrainSet.Station.ORE_HOPPER,
        require("libram").TrainSet.Station.TRACKSIDE_DINER,
        require("libram").TrainSet.Station.TOWER_FIZZY,
      ]);

      const result = willRotateTrainset();
      expect(result).toBe(true);
    });
  });
});