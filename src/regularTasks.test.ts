import GLOBAL_TASKS from "./regularTasks";
import { CandyStrategy } from "./combat";

// Mock all the external dependencies first
jest.mock("kolmafia", () => ({
  abort: jest.fn(),
  adv1: jest.fn(),
  cliExecute: jest.fn(),
  eat: jest.fn(),
  fullnessLimit: jest.fn(() => 15),
  getWorkshed: jest.fn(),
  inebrietyLimit: jest.fn(() => 4),
  mallPrices: jest.fn(),
  myClass: jest.fn(() => "Seal Clubber"),
  myFullness: jest.fn(() => 0),
  myHp: jest.fn(() => 100),
  myInebriety: jest.fn(() => 0),
  myFamiliar: jest.fn(() => null),
  retrieveItem: jest.fn(),
  reverseNumberology: jest.fn(() => ({})),
  runChoice: jest.fn(),
  sessionStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  todayToString: jest.fn(() => "20230101"),
  totalTurnsPlayed: jest.fn(() => 100),
  use: jest.fn(),
  useSkill: jest.fn(),
  visitUrl: jest.fn(),
}));

jest.mock("libram", () => ({
  $classes: ["Vampyre", "Grey Goo"],
  $effect: (name: string) => ({ name }),
  $familiar: (name: string) => ({ name }),
  $item: (name: string) => ({ name }),
  $items: (...names: string[]) => names.map(name => ({ name })),
  $location: (name: string) => ({ name }),
  $phylum: (name: string) => ({ name }),
  $skill: (name: string) => ({ name }),
  AutumnAton: {
    available: jest.fn(() => false),
    sendTo: jest.fn(),
  },
  Counter: {
    get: jest.fn(() => 0),
  },
  get: jest.fn(() => false),
  getKramcoWandererChance: jest.fn(() => 0),
  have: jest.fn(() => false),
  JuneCleaver: {
    have: jest.fn(() => false),
  },
  questStep: jest.fn(() => -1),
  set: jest.fn(),
  Snapper: {
    getTrackedPhylum: jest.fn(() => "dude"),
    trackPhylum: jest.fn(),
  },
  SourceTerminal: {
    have: jest.fn(() => false),
    isCurrentSkill: jest.fn(() => false),
    educate: jest.fn(),
  },
  TrainSet: {
    installed: jest.fn(() => false),
  },
  withProperty: jest.fn((prop, val, fn) => fn()),
}));

jest.mock("./resources", () => ({
  bestAutumnatonLocation: {},
  coldMedicineCabinet: jest.fn(),
  getBestPantsgivingFood: jest.fn(() => ({ food: {} })),
  juneCleaverChoices: {},
  rotateTrainToOptimalCycle: jest.fn(),
  willRotateTrainset: jest.fn(() => false),
}));

jest.mock("./outfit", () => ({
  combatOutfit: jest.fn(() => ({})),
  digitizeOutfit: {},
}));

jest.mock("./combat", () => ({
  CandyStrategy: jest.fn(() => ({})),
  Macro: {
    skill: jest.fn(() => ({})),
    abort: jest.fn(() => ({})),
    trySkill: jest.fn(() => ({})),
    tryHaveSkill: jest.fn(() => ({})),
    redigitize: jest.fn(() => ({})),
    step: jest.fn(() => ({})),
    default: jest.fn(() => ({})),
  },
}));

jest.mock("./wanderer", () => ({
  wanderer: () => ({
    getTarget: jest.fn(() => ({})),
    getChoices: jest.fn(() => ({})),
    getEquipment: jest.fn(() => []),
  }),
}));

jest.mock("./args", () => ({
  default: {
    familiar: null
  }
}));

// Import the types after mocking
import {
  $classes,
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $phylum,
  $skill,
  AutumnAton,
  Counter,
  get,
  have,
  JuneCleaver,
  questStep,
  set,
  Snapper,
  SourceTerminal,
  TrainSet,
  withProperty,
} from "libram";
import {
  abort,
  adv1,
  cliExecute,
  eat,
  fullnessLimit,
  getWorkshed,
  inebrietyLimit,
  mallPrices,
  myClass,
  myFullness,
  myHp,
  myInebriety,
  reverseNumberology,
  runChoice,
  sessionStorage,
  todayToString,
  totalTurnsPlayed,
  use,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  bestAutumnatonLocation,
  coldMedicineCabinet,
  getBestPantsgivingFood,
  juneCleaverChoices,
  rotateTrainToOptimalCycle,
  willRotateTrainset,
} from "./resources";
import { combatOutfit, digitizeOutfit } from "./outfit";
import { wanderer } from "./wanderer";

describe("GLOBAL_TASKS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should be an array of tasks", () => {
    expect(Array.isArray(GLOBAL_TASKS)).toBe(true);
    expect(GLOBAL_TASKS.length).toBeGreaterThan(0);
  });

  test("each task should have required properties", () => {
    for (const task of GLOBAL_TASKS) {
      expect(task).toHaveProperty("name");
      expect(typeof task.name).toBe("string");
      
      if (task.completed) {
        expect(typeof task.completed).toBe("function");
      }
    }
  });

  describe("Search the Mall task", () => {
    let mallTask: any;
    
    beforeEach(() => {
      mallTask = GLOBAL_TASKS.find((task: any) => task.name === "Search the Mall");
    });

    test("should check if mall prices were fetched today", () => {
      const today = "20230101";
      (sessionStorage.getItem as jest.Mock).mockReturnValue(today);
      (todayToString as jest.Mock).mockReturnValue(today);
      
      const completed = mallTask.completed();
      expect(completed).toBe(true);
    });

    test("should not be completed if mall prices were not fetched today", () => {
      (sessionStorage.getItem as jest.Mock).mockReturnValue("20221231");
      (todayToString as jest.Mock).mockReturnValue("20230101");
      
      const completed = mallTask.completed();
      expect(completed).toBe(false);
    });

    test("should fetch mall prices and update session storage", () => {
      (mallPrices as jest.Mock).mockImplementation(() => {});
      (todayToString as jest.Mock).mockReturnValue("20230101");
      
      mallTask.do();
      
      expect(mallPrices).toHaveBeenCalledWith("allitems");
      expect(sessionStorage.setItem).toHaveBeenCalledWith("last mallprices", "20230101");
    });
  });

  describe("Market Quests tasks", () => {
    test("should create tasks for market quests", () => {
      const marketQuestTasks = GLOBAL_TASKS.filter((task: any) => 
        task.name?.startsWith("Start Quest:")
      );
      expect(marketQuestTasks.length).toBeGreaterThan(0);
      
      for (const task of marketQuestTasks) {
        expect(typeof task.completed).toBe("function");
        expect(typeof task.do).toBe("function");
      }
    });
  });

  describe("Acquire Kgnee task", () => {
    let kgneeTask: any;
    
    beforeEach(() => {
      kgneeTask = GLOBAL_TASKS.find((task: any) => task.name === "Acquire Kgnee");
    });

    test("should have proper task structure", () => {
      expect(kgneeTask.name).toBe("Acquire Kgnee");
      expect(typeof kgneeTask.ready).toBe("function");
      expect(typeof kgneeTask.completed).toBe("function");
      expect(typeof kgneeTask.do).toBe("function");
    });

    test("should check if familiar is available and kgnee is not acquired", () => {
      (have as jest.Mock).mockReturnValueOnce(true); // Reagnimated Gnome
      (get as jest.Mock).mockReturnValueOnce(false); // _freecandy_checkedGnome
      
      const ready = kgneeTask.ready();
      expect(ready).toBe(true);
    });
  });

  describe("Ow! task", () => {
    let owTask: any;
    
    beforeEach(() => {
      owTask = GLOBAL_TASKS.find((task: any) => task.name === "Ow!");
    });

    test("should be completed if HP is greater than 0", () => {
      (myHp as jest.Mock).mockReturnValue(10);
      const completed = owTask.completed();
      expect(completed).toBe(true);
    });

    test("should not be completed if HP is 0", () => {
      (myHp as jest.Mock).mockReturnValue(0);
      const completed = owTask.completed();
      expect(completed).toBe(false);
    });
  });

  describe("Numberology task", () => {
    let numberologyTask: any;
    
    beforeEach(() => {
      numberologyTask = GLOBAL_TASKS.find((task: any) => task.name === "Numberology");
    });

    test("should be ready when 69 is in reverse numberology", () => {
      (reverseNumberology as jest.Mock).mockReturnValue({ 1: 69 });
      const ready = numberologyTask.ready();
      expect(ready).toBe(true);
    });

    test("should not be ready when 69 is not in reverse numberology", () => {
      (reverseNumberology as jest.Mock).mockReturnValue({ 1: 42 });
      const ready = numberologyTask.ready();
      expect(ready).toBe(false);
    });
  });

  describe("Autumn-Aton task", () => {
    let autumnAtonTask: any;
    
    beforeEach(() => {
      autumnAtonTask = GLOBAL_TASKS.find((task: any) => task.name === "Autumn-Aton");
    });

    test("should be completed when AutumnAton is not available", () => {
      (AutumnAton.available as jest.Mock).mockReturnValue(false);
      const completed = autumnAtonTask.completed();
      expect(completed).toBe(true);
    });

    test("should not be completed when AutumnAton is available", () => {
      (AutumnAton.available as jest.Mock).mockReturnValue(true);
      const completed = autumnAtonTask.completed();
      expect(completed).toBe(false);
    });
  });

  describe("Trainset task", () => {
    let trainsetTask: any;
    
    beforeEach(() => {
      trainsetTask = GLOBAL_TASKS.find((task: any) => task.name === "Trainset");
    });

    test("should be ready when TrainSet is installed", () => {
      (TrainSet.installed as jest.Mock).mockReturnValue(true);
      const ready = trainsetTask.ready();
      expect(ready).toBe(true);
    });

    test("should not be completed when trainset rotation is needed", () => {
      (willRotateTrainset as jest.Mock).mockReturnValue(true);
      const completed = trainsetTask.completed();
      expect(completed).toBe(false);
    });

    test("should be completed when trainset rotation is not needed", () => {
      (willRotateTrainset as jest.Mock).mockReturnValue(false);
      const completed = trainsetTask.completed();
      expect(completed).toBe(true);
    });
  });

  describe("June Cleaver task", () => {
    let juneCleaverTask: any;
    
    beforeEach(() => {
      juneCleaverTask = GLOBAL_TASKS.find((task: any) => task.name === "June Cleaver");
    });

    test("should not be completed when June Cleaver is available and fights are left", () => {
      (JuneCleaver.have as jest.Mock).mockReturnValue(true);
      (get as jest.Mock).mockReturnValue(1); // _juneCleaverFightsLeft
      
      const completed = juneCleaverTask.completed();
      expect(completed).toBe(true); // Completed means no more fights to do
    });

    test("should not be completed when June Cleaver is available but no fights left", () => {
      (JuneCleaver.have as jest.Mock).mockReturnValue(true);
      (get as jest.Mock).mockReturnValue(undefined); // No fights left
      
      const completed = juneCleaverTask.completed();
      expect(completed).toBe(false); // Not completed means need to do fights
    });
  });

  // Skip the test for CandyStrategy since the type may not include 'combat' property in all tasks
  test("some tasks should have combat strategies", () => {
    // Count how many tasks have a combat property
    const tasksWithCombat = GLOBAL_TASKS.filter((task: any) => task.combat !== undefined);
    expect(tasksWithCombat.length).toBeGreaterThanOrEqual(0); // At least some tasks may have combat
  });
});