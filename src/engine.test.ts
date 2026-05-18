import CandyEngine from "./engine";
import { Engine, Outfit, Task } from "grimoire-kolmafia";
import {
  equip,
  inebrietyLimit,
  itemAmount,
  myInebriety,
  myMaxhp,
  myMaxmp,
  restoreHp,
  restoreMp,
  useFamiliar,
  visitUrl,
  xpath,
} from "kolmafia";
import { CandyTask, State } from "./lib";
import { $familiar, $item, clamp, Session } from "libram";
import args from "./args";

// Mock the external dependencies
jest.mock("kolmafia", () => ({
  equip: jest.fn(),
  inebrietyLimit: jest.fn(),
  itemAmount: jest.fn(),
  myInebriety: jest.fn(),
  myMaxhp: jest.fn(),
  myMaxmp: jest.fn(),
  restoreHp: jest.fn(),
  restoreMp: jest.fn(),
  useFamiliar: jest.fn(),
  visitUrl: jest.fn(() => ""),
  xpath: jest.fn(() => []),
}));

jest.mock("libram", () => ({
  $familiar: jest.fn((fam) => ({ name: fam })),
  $item: jest.fn((item) => ({ name: item })),
  clamp: jest.fn((value, min, max) => Math.min(Math.max(value, min), max)),
  Session: {
    current: jest.fn(() => ({
      items: [],
      diff: jest.fn(() => ({ items: [] })),
    })),
  },
}));

jest.mock("./args", () => ({
  __esModule: true,
  default: {
    familiar: "Pocket Professor",
  },
}));

jest.mock("./lib", () => ({
  State: {
    blocks: 5,
  },
  printHighlight: jest.fn(),
}));

// Create mock implementations for grimoire-kolmafia types
jest.mock("grimoire-kolmafia", () => ({
  Engine: class MockEngine {
    tasks: any[];
    constructor(tasks: any[]) {
      this.tasks = tasks;
    }
    available(task: any) {
      return true;
    }
    dress(task: any, outfit: any) {}
    prepare(task: any) {}
    destruct() {}
  },
  Outfit: class MockOutfit {},
}));

// Create proper mock CandyTask objects
const createMockCandyTask = (overrides: Partial<CandyTask> = {}): CandyTask => {
  return {
    name: "test task",
    completed: () => false,
    do: () => {},
    sobriety: "either",
    ...overrides
  } as unknown as CandyTask;
};

describe("CandyEngine", () => {
  let candyEngine: CandyEngine;
  let mockTasks: CandyTask[];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup default mock returns
    (visitUrl as jest.MockedFunction<typeof visitUrl>).mockReturnValue("");
    (xpath as jest.MockedFunction<typeof xpath>).mockReturnValue([""]);
    (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(0);
    (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

    mockTasks = [];
    candyEngine = new CandyEngine(mockTasks);
  });

  describe("constructor", () => {
    it("should initialize with tasks and set up AA boss flag properly", () => {
      expect(candyEngine).toBeDefined();
      expect(candyEngine.aaBossFlag).toBeDefined();
      expect(candyEngine.session).toBeDefined();
    });

    it("should set aaBossFlag to 1 when checkbox is checked", () => {
      (xpath as jest.MockedFunction<typeof xpath>).mockReturnValue(["checked"]);

      const newEngine = new CandyEngine([]);
      expect(newEngine.aaBossFlag).toBe(1);
    });

    it("should set aaBossFlag to 0 when checkbox is not checked", () => {
      (xpath as jest.MockedFunction<typeof xpath>).mockReturnValue(["unchecked"]);

      const newEngine = new CandyEngine([]);
      expect(newEngine.aaBossFlag).toBe(0);
    });
  });

  describe("destruct", () => {
    it("should call parent destruct method", () => {
      const superDestructSpy = jest.spyOn(Engine.prototype, 'destruct');
      candyEngine.destruct();
      expect(superDestructSpy).toHaveBeenCalled();
    });

    it("should reset AA boss flag setting", () => {
      candyEngine.destruct();
      expect(visitUrl).toHaveBeenCalledWith(
        `account.php?actions[]=flag_aabosses&flag_aabosses=${candyEngine.aaBossFlag}&action=Update`,
        true
      );
    });

    it("should use the familiar from args", () => {
      candyEngine.destruct();
      expect(useFamiliar).toHaveBeenCalledWith("Pocket Professor");
    });
  });

  describe("available", () => {
    const soberTask = createMockCandyTask({ sobriety: "sober" });
    const drunkTask = createMockCandyTask({ sobriety: "drunk" });
    const noSobrietyTask = createMockCandyTask({ sobriety: undefined });

    it("should return false for sober task when player is drunk", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(6);
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      const result = candyEngine.available(soberTask);
      expect(result).toBe(false);
    });

    it("should return true for sober task when player is sober", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(3);
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      const result = candyEngine.available(soberTask);
      expect(result).toBe(true);
    });

    it("should return false for drunk task when player is sober", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(3);
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      const result = candyEngine.available(drunkTask);
      expect(result).toBe(false);
    });

    it("should return true for drunk task when player is drunk", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(6);
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      const result = candyEngine.available(drunkTask);
      expect(result).toBe(true);
    });

    it("should return true for task with no sobriety requirement regardless of sobriety", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(6); // drunk
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      let result = candyEngine.available(noSobrietyTask);
      expect(result).toBe(true);

      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(3); // sober
      result = candyEngine.available(noSobrietyTask);
      expect(result).toBe(true);
    });

    it("should call parent available method when sobriety conditions are met", () => {
      (myInebriety as jest.MockedFunction<typeof myInebriety>).mockReturnValue(3);
      (inebrietyLimit as jest.MockedFunction<typeof inebrietyLimit>).mockReturnValue(5);

      const parentAvailableSpy = jest.spyOn(Engine.prototype, 'available').mockReturnValue(true);
      const result = candyEngine.available(soberTask);

      expect(parentAvailableSpy).toHaveBeenCalledWith(soberTask);
      expect(result).toBe(true);
    });
  });

  describe("dress", () => {
    let mockOutfit: Outfit;
    let mockTask: CandyTask;

    beforeEach(() => {
      mockOutfit = new (Outfit as any)();
      mockTask = createMockCandyTask();
    });

    it("should call parent dress method", () => {
      const parentDressSpy = jest.spyOn(Engine.prototype, 'dress');
      candyEngine.dress(mockTask, mockOutfit);

      expect(parentDressSpy).toHaveBeenCalledWith(mockTask, mockOutfit);
    });

    it("should equip tiny stillsuit to mosquito familiar when available", () => {
      (itemAmount as jest.MockedFunction<typeof itemAmount>).mockReturnValue(1);

      candyEngine.dress(mockTask, mockOutfit);

      expect(equip).toHaveBeenCalledWith($familiar`Mosquito`, $item`tiny stillsuit`);
    });

    it("should not equip tiny stillsuit when not available", () => {
      (itemAmount as jest.MockedFunction<typeof itemAmount>).mockReturnValue(0);

      candyEngine.dress(mockTask, mockOutfit);

      expect(equip).not.toHaveBeenCalled();
    });
  });

  describe("prepare", () => {
    const combatTask = createMockCandyTask({ combat: {} as any });
    const nonCombatTask = createMockCandyTask({});

    beforeEach(() => {
      (myMaxhp as jest.MockedFunction<typeof myMaxhp>).mockReturnValue(1000);
      (myMaxmp as jest.MockedFunction<typeof myMaxmp>).mockReturnValue(200);
    });

    it("should call parent prepare method", () => {
      const parentPrepareSpy = jest.spyOn(Engine.prototype, 'prepare');
      candyEngine.prepare(nonCombatTask);

      expect(parentPrepareSpy).toHaveBeenCalledWith(nonCombatTask);
    });

    it("should restore HP and MP when task is combat task", () => {
      candyEngine.prepare(combatTask);

      expect(clamp).toHaveBeenCalledWith(0.4 * 1000, 200, 2000);
      expect(restoreHp).toHaveBeenCalled();
      expect(restoreMp).toHaveBeenCalledWith(150); // Min of 150 and myMaxmp (200)
    });

    it("should not restore HP and MP when task is non-combat task", () => {
      candyEngine.prepare(nonCombatTask);

      expect(restoreHp).not.toHaveBeenCalled();
      expect(restoreMp).not.toHaveBeenCalled();
    });

    it("should calculate HP restoration with proper clamp values", () => {
      (myMaxhp as jest.MockedFunction<typeof myMaxhp>).mockReturnValue(1500);

      candyEngine.prepare(combatTask);

      expect(clamp).toHaveBeenCalledWith(600, 200, 2000); // 40% of 1500 = 600
    });

    it("should handle low HP thresholds", () => {
      (myMaxhp as jest.MockedFunction<typeof myMaxhp>).mockReturnValue(300);

      candyEngine.prepare(combatTask);

      expect(clamp).toHaveBeenCalledWith(120, 200, 2000); // 40% of 300 = 120, but clamped to min 200
    });

    it("should handle high HP thresholds", () => {
      (myMaxhp as jest.MockedFunction<typeof myMaxhp>).mockReturnValue(8000);

      candyEngine.prepare(combatTask);

      expect(clamp).toHaveBeenCalledWith(3200, 200, 2000); // 40% of 8000 = 3200, but clamped to max 2000
    });

    it("should cap MP restoration at 150", () => {
      (myMaxmp as jest.MockedFunction<typeof myMaxmp>).mockReturnValue(250);

      candyEngine.prepare(combatTask);

      expect(restoreMp).toHaveBeenCalledWith(150); // Should cap at 150 despite higher max MP
    });

    it("should restore MP to max if less than 150", () => {
      (myMaxmp as jest.MockedFunction<typeof myMaxmp>).mockReturnValue(100);

      candyEngine.prepare(combatTask);

      expect(restoreMp).toHaveBeenCalledWith(100); // Should use lower max MP when it's under 150
    });
  });
});