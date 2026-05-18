import {
  bestAutumnatonLocation,
  juneCleaverChoices,
  juneCleaverBonusEquip,
  coldMedicineCabinet,
  getBestPantsgivingFood,
  rotateTrainToOptimalCycle,
  willRotateTrainset,
} from './index';
import { Location } from 'kolmafia';

// Mock the external dependencies that would normally come from kolmafia/libram
jest.mock('kolmafia', () => ({
  appearanceRates: jest.fn(() => ({})),
  availableAmount: jest.fn(() => 0),
  getLocationMonsters: jest.fn(() => ({})), // Return empty object for Object.keys
  itemDropsArray: jest.fn(() => []),
  Location: jest.fn(),
  myAdventures: jest.fn(() => 100),
  toMonster: jest.fn(() => ({ attributes: [], name: 'test monster' })),
  descToItem: jest.fn(() => 'test item'),
  Item: jest.fn(),
  runChoice: jest.fn(),
  visitUrl: jest.fn((url: string) => {
    // Return content that contains descitem matches for cold medicine cabinet
    if (url.includes('campground.php')) {
      return `
        <html>
          <body>
            <a onclick="javascript:descitem(123)">Aspirin</a>
            <a onclick="javascript:descitem(456)">Cold Medicine</a>
            <a onclick="javascript:descitem(789)">Other Item</a>
          </body>
        </html>
      `;
    }
    return '';
  }), // Return content with descitem matches
  abort: jest.fn(() => {}),
  isAccessible: jest.fn(() => true),
  mallPrice: jest.fn(() => 50),
  myLevel: jest.fn(() => 20),
  have: jest.fn((item: any) => {
    // Return true for some common items that might be checked to avoid aborts
    const availableItems = [
      'Rubee™',
      'FantasyRealm G. E. M.',
      'Freddy Kruegerand'
    ];
    return availableItems.includes(item);
  }),
  get: jest.fn((key: string) => {
    // Handle various config values that might be requested
    const configMap: { [key: string]: any } = {
      '_autumnatonQuests': 0,
      '_frToday': false,
      'frAlways': false,
      '_juneCleaverFightsLeft': 0,
      '_trainsetPosition': 0,
      'trainsetConfiguration': null,
      // Default value
      'valueOfAdventure': 1000,
      'trainsetPosition': 0,
      '_frFreeFights': 0,
      '_frCheckredux': false,
      '_juneCleaverChoice1467': 0,
      '_juneCleaverChoice1468': 0,
      'juneCleaverQueue': [],
    };
    return configMap[key] ?? 0;
  }),
}));

jest.mock('libram', () => ({
  $item: jest.fn((str) => str),
  $items: jest.fn((...items) => items),
  $coinmaster: jest.fn((str) => str),
  AutumnAton: {
    visualAcuity: jest.fn(() => 1),
    zoneItems: jest.fn(() => 3),
    turnsLeft: jest.fn(() => 0),
    legs: jest.fn(() => 2),
    currentUpgrades: jest.fn(() => []),
    getUniques: jest.fn(() => null),
  },
  JuneCleaver: {
    have: jest.fn(() => true),
    getInterval: jest.fn(() => 10),
    cleaver: 'june cleaver',
    skipsRemaining: jest.fn(() => 0),
    choices: [1467, 1468, 1469, 1470],
  },
  TrainSet: {
    Station: {
      COAL_HOPPER: 'coal_hopper',
      GAIN_MEAT: 'gain_meat',
      TRACKSIDE_DINER: 'trackside_diner',
      CANDY_FACTORY: 'candy_factory',
      GRAIN_SILO: 'grain_silo',
      ORE_HOPPER: 'ore_hopper',
      TOWER_FIZZY: 'tower_fizzy',
      VIEWING_PLATFORM: 'viewing_platform',
    },
    cycle: jest.fn(() => []),
    next: jest.fn(() => 'next'),
    canConfigure: jest.fn(() => true),
    setConfiguration: jest.fn(() => true),
  },
  get: jest.fn((key: string) => {
    // Handle various config values that might be requested
    const configMap: { [key: string]: any } = {
      '_autumnatonQuests': 0,
      '_frToday': false,
      'frAlways': false,
      '_juneCleaverFightsLeft': 0,
      '_trainsetPosition': 0,
      'trainsetConfiguration': null,
      // Default value
      'valueOfAdventure': 1000,
      'trainsetPosition': 0,
      '_frFreeFights': 0,
      '_frCheckredux': false,
      '_juneCleaverChoice1467': 0,
      '_juneCleaverChoice1468': 0,
      'juneCleaverQueue': [],
    };
    return configMap[key] ?? 0;
  }),
  have: jest.fn((item: any, count: number = 1) => {
    // Return true for some common items that might be checked to avoid aborts
    const availableItems = [
      'Rubee™',
      'FantasyRealm G. E. M.',
      'Freddy Kruegerand',
      'glass of raw eggs'
    ];
    return availableItems.includes(item);
  }),
  maxBy: jest.fn((arr: any[], fn: any, tiebreak = false) => {
    if (arr && arr.length > 0) {
      if (typeof fn === 'function') {
        return arr.reduce((max: any, current: any) => {
          const currentVal = typeof fn === 'string' ? current[fn] : fn(current);
          const maxVal = typeof fn === 'string' ? max[fn] : fn(max);
          return currentVal > maxVal ? current : max;
        });
      }
      return arr[0]; // fallback
    }
    return null; // Handle empty arrays
  }),
  sum: jest.fn((arr: any[], fn: any) => {
    if (arr && arr.length > 0) {
      if (fn) {
        return arr.reduce((acc: any, item: any) => acc + fn(item), 0);
      }
      return arr.reduce((acc: any, item: any) => acc + item, 0);
    }
    return 0; // Handle empty arrays
  }),
  arrayEquals: jest.fn(() => false),
}));

jest.mock('../value', () => ({
  freecandyValue: jest.fn((item) => 100),
  freecandyAverageValue: jest.fn(() => 50),
}));

describe('Resources Index Barrel File Exports', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('bestAutumnatonLocation', () => {
    it('should be defined and callable', () => {
      expect(bestAutumnatonLocation).toBeDefined();
      expect(typeof bestAutumnatonLocation).toBe('function');
    });

    it('should call the underlying function with provided locations', () => {
      const mockLocations: Location[] = [{name: 'Location1'}, {name: 'Location2'}] as any;
      const result = bestAutumnatonLocation(mockLocations);
      expect(result).toBeDefined(); // Will depend on maxBy implementation
    });
  });

  describe('juneCleaverChoices', () => {
    it('should be defined and callable', () => {
      expect(juneCleaverChoices).toBeDefined();
      expect(typeof juneCleaverChoices).toBe('function');
    });

    it('should return an object with choice mappings', () => {
      const result = juneCleaverChoices();
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('juneCleaverBonusEquip', () => {
    it('should be defined and callable', () => {
      expect(juneCleaverBonusEquip).toBeDefined();
      expect(typeof juneCleaverBonusEquip).toBe('function');
    });

    it('should return a Map object', () => {
      const result = juneCleaverBonusEquip();
      expect(result).toBeInstanceOf(Map);
    });
  });

  describe('coldMedicineCabinet', () => {
    it('should be defined and callable', () => {
      expect(coldMedicineCabinet).toBeDefined();
      expect(typeof coldMedicineCabinet).toBe('function');
    });

    it('should execute without throwing when called', () => {
      expect(() => coldMedicineCabinet()).not.toThrow();
    });
  });

  describe('getBestPantsgivingFood', () => {
    it('should be defined and callable', () => {
      expect(getBestPantsgivingFood).toBeDefined();
      expect(typeof getBestPantsgivingFood).toBe('function');
    });

    it('should return a food object', () => {
      const result = getBestPantsgivingFood();
      expect(result).toBeDefined();
    });
  });

  describe('rotateTrainToOptimalCycle', () => {
    it('should be defined and callable', () => {
      expect(rotateTrainToOptimalCycle).toBeDefined();
      expect(typeof rotateTrainToOptimalCycle).toBe('function');
    });

    it('should return a boolean value', () => {
      const result = rotateTrainToOptimalCycle();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('willRotateTrainset', () => {
    it('should be defined and callable', () => {
      expect(willRotateTrainset).toBeDefined();
      expect(typeof willRotateTrainset).toBe('function');
    });

    it('should return a boolean value', () => {
      const result = willRotateTrainset();
      expect(typeof result).toBe('boolean');
    });
  });
});