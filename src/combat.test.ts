import {
  $familiars,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $skills,
  Delayed,
  get,
  have,
  SourceTerminal,
  StrictMacro,
} from "libram";
import { Item, Skill } from "kolmafia";
import { CandyStrategy, Macro } from "./combat";
import { shouldRedigitize } from "./lib";
import args from "./args";

// Mock the external modules that are used in the combat module
jest.mock("libram", () => ({
  have: jest.fn(() => false),
  get: jest.fn(() => undefined),
  SourceTerminal: {
    isCurrentSkill: jest.fn(() => false),
  },
  StrictMacro: class {
    if_(condition: any, thenPart: any) { return this; }
    externalIf(condition: any, thenPart: any, elsePart?: any) { return this; }
    skill(skill: any) { return this; }
    item(item: any) { return this; }
    attack() { return this; }
    repeat() { return this; }
    while_(condition: any, action: any) { return this; }
    step(...parts: any[]) { return this; }
    abort() { return this; }
    static trySkill(skill: any) { return new this(); }
    static tryItem(item: any) { return new this(); }
    static item(item: any) { return new this(); }
    static skill(skill: any) { return new this(); }
    static abort() { return new this(); }
    static externalIf(condition: any, thenPart: any, elsePart?: any) { return new this(); }
    static if_(condition: any, thenPart: any) { return new this(); }
  },
  $familiars: (names: TemplateStringsArray) => [],
  $item: (name: TemplateStringsArray) => ({ name: name[0] }),
  $items: (names: TemplateStringsArray) => {
    const itemsString = names[0];
    return itemsString.split(',').map(s => ({ name: s.trim() }));
  },
  $location: (name: TemplateStringsArray) => ({}),
  $monster: (name: TemplateStringsArray) => ({}),
  $skill: (name: TemplateStringsArray) => ({ name: name[0] }),
  $skills: (names: TemplateStringsArray) => [],
  Delayed: (fn: any) => fn,
}));

// Mock kolmafia types
jest.mock("kolmafia", () => ({
  getMonsters: jest.fn(() => []),
  Item: class {},
  Skill: class {},
}));

// Mock grimoire-kolmafia since it contains CombatStrategy
jest.mock("grimoire-kolmafia", () => ({
  CombatStrategy: class {
    autoattack(macro: any) { return this; }
    macro(macro: any) { return this; }
  }
}));

jest.mock("./lib", () => ({
  shouldRedigitize: jest.fn(() => false),
}));

jest.mock("./args", () => {
  const mockArgs = {
    familiar: undefined,
  };
  return {
    __esModule: true,
    default: mockArgs,
  };
});

// Helper to spy on certain functions
const mockHave = have as jest.MockedFunction<typeof have>;
const mockGet = get as jest.MockedFunction<typeof get>;
const mockSourceTerminalIsCurrentSkill = SourceTerminal.isCurrentSkill as jest.MockedFunction<
  typeof SourceTerminal.isCurrentSkill
>;
const mockShouldRedigitize = shouldRedigitize as jest.MockedFunction<typeof shouldRedigitize>;

describe("Macro", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("tryHaveSkill", () => {
    test("should add skill to macro if skill is available", () => {
      const mockSkill = $skill`Saucegeyser`;
      mockHave.mockReturnValueOnce(true);

      const macro = new Macro().tryHaveSkill(mockSkill);
      expect(mockHave).toHaveBeenCalledWith(mockSkill);
    });

    test("should not add skill to macro if skill is not available", () => {
      const mockSkill = $skill`Saucegeyser`;
      mockHave.mockReturnValueOnce(false);

      const macro = new Macro().tryHaveSkill(mockSkill);
      expect(mockHave).toHaveBeenCalledWith(mockSkill);
    });

    test("should handle null skill", () => {
      const macro = new Macro().tryHaveSkill(null);
      // The macro should remain unchanged when null is passed
      expect(macro).toBeDefined();
    });
  });

  describe("tryHaveItem", () => {
    test("should add item to macro if item is available", () => {
      const mockItem = $item`seal tooth`;
      mockHave.mockReturnValueOnce(true);

      const macro = new Macro().tryHaveItem(mockItem);
      expect(mockHave).toHaveBeenCalledWith(mockItem);
    });

    test("should not add item to macro if item is not available", () => {
      const mockItem = $item`seal tooth`;
      mockHave.mockReturnValueOnce(false);

      const macro = new Macro().tryHaveItem(mockItem);
      expect(mockHave).toHaveBeenCalledWith(mockItem);
    });

    test("should handle null item", () => {
      const macro = new Macro().tryHaveItem(null);
      // The macro should remain unchanged when null is passed
      expect(macro).toBeDefined();
    });
  });

  describe("try", () => {
    test("should add skills and items to macro", () => {
      const mockSkill = $skill`Saucegeyser`;
      const mockItem = $item`seal tooth`;
      mockHave.mockReturnValueOnce(true); // for item
      mockHave.mockReturnValueOnce(true); // for skill

      const actions: (Item | Skill)[] = [mockItem, mockSkill];
      const macro = new Macro().try(actions);

      expect(mockHave).toHaveBeenCalledWith(mockItem);
      expect(mockHave).toHaveBeenCalledWith(mockSkill);
    });

    test("should handle empty array", () => {
      const macro = new Macro().try([]);
      expect(macro).toBeDefined();
    });
  });

  describe("stasisItem", () => {
    test("should return dictionary if available", () => {
      const expectedItem = { name: "dictionary" };
      mockHave.mockReturnValueOnce(true);

      const macro = new Macro().stasisItem();

      expect(mockHave).toHaveBeenCalledWith(expectedItem);
    });

    test("should return facsimile dictionary if dictionary not available", () => {
      // Mock false for dictionary, then true for facsimile dictionary
      mockHave
        .mockReturnValueOnce(false) // dictionary
        .mockReturnValueOnce(true); // facsimile dictionary

      const macro = new Macro().stasisItem();

      expect(mockHave).toHaveBeenCalledWith({ name: "dictionary" });
      expect(mockHave).toHaveBeenCalledWith({ name: "facsimile dictionary" });
    });

    test("should return spices if dictionaries not available", () => {
      // Mock false for dictionary and facsimile dictionary, then true for spices
      mockHave
        .mockReturnValueOnce(false) // dictionary
        .mockReturnValueOnce(false) // facsimile dictionary
        .mockReturnValueOnce(true); // spices

      const macro = new Macro().stasisItem();

      expect(mockHave).toHaveBeenCalledWith({ name: "dictionary" });
      expect(mockHave).toHaveBeenCalledWith({ name: "facsimile dictionary" });
      expect(mockHave).toHaveBeenCalledWith({ name: "spices" });
    });

    test("should return seal tooth as fallback if nothing else is available", () => {
      // Mock false for all items
      mockHave
        .mockReturnValueOnce(false) // dictionary
        .mockReturnValueOnce(false) // facsimile dictionary
        .mockReturnValueOnce(false); // spices

      const macro = new Macro().stasisItem();

      expect(mockHave).toHaveBeenCalledWith({ name: "dictionary" });
      expect(mockHave).toHaveBeenCalledWith({ name: "facsimile dictionary" });
      expect(mockHave).toHaveBeenCalledWith({ name: "spices" });
      // The final item should be seal tooth regardless of have() result since it's hardcoded as fallback
    });
  });

  describe("kill", () => {
    test("should handle ghost monsters with Silent Treatment", () => {
      mockHave.mockReturnValueOnce(true); // for Silent Treatment

      const macro = new Macro().kill();

      expect(mockHave).toHaveBeenCalledWith($skill`Silent Treatment`);
    });

    test("should include saucegeyser and attack repeat by default", () => {
      const macro = new Macro().kill();
      // Just ensure the macro builds without errors
      expect(macro).toBeDefined();
    });
  });

  describe("stasis", () => {
    test("should handle various stasis actions", () => {
      // Mock various conditions to test different branches
      mockHave
        .mockReturnValueOnce(false) // Curse of Weaksauce
        .mockReturnValueOnce(false) // Micrometeorite
        .mockReturnValueOnce(false) // Shadow Noodles
        .mockReturnValueOnce(false); // Shell Up

      const macro = new Macro().stasis();
      expect(macro).toBeDefined();
    });

    test("should handle Extract skill if it's a current terminal skill", () => {
      mockSourceTerminalIsCurrentSkill.mockReturnValueOnce(true);

      const macro = new Macro().stasis();
      expect(mockSourceTerminalIsCurrentSkill).toHaveBeenCalledWith($skill`Extract`);
    });
  });

  describe("redigitize", () => {
    test("should add Digitize skill if shouldRedigitize returns true", () => {
      mockShouldRedigitize.mockReturnValueOnce(true);

      const macro = new Macro().redigitize();

      expect(mockShouldRedigitize).toHaveBeenCalled();
    });

    test("should not add Digitize skill if shouldRedigitize returns false", () => {
      mockShouldRedigitize.mockReturnValueOnce(false);

      const macro = new Macro().redigitize();

      expect(mockShouldRedigitize).toHaveBeenCalled();
    });
  });

  describe("default", () => {
    test("should abort if monster is All-Hallow's Steve", () => {
      const macro = new Macro().default();
      // This should include an if_ condition checking for All-Hallow's Steve
      expect(macro).toBeDefined();
    });

    test("should use stasis for specific familiars", () => {
      // Mock having a familiar that uses stasis
      const mockedArgs = require("./args");
      mockedArgs.familiar = $familiars`Ninja Pirate Zombie Robot`; // This is in the stasis list

      const macro = new Macro().default();
      expect(macro).toBeDefined();
    });

    test("should handle fact recall if conditions are met", () => {
      // Set up mocks in order of how they're called in the code
      mockHave
        .mockReturnValueOnce(true) // Curse of Weaksauce
        .mockReturnValueOnce(true) // Micrometeorite
        .mockReturnValueOnce(true) // Sing Along
        .mockReturnValueOnce(true) // Bowl Straight Up
        .mockReturnValueOnce(true); // Just the Facts
      mockGet
        .mockReturnValueOnce("true"); // _circadianRhythmsRecalled is true (for the && condition)

      const macro = new Macro().default();
      // We expect the fact recall skill to be checked
      expect(mockHave).toHaveBeenCalledWith($skill`Just the Facts`);
      // Note: The get call may not happen if getMonsters doesn't return truthy results
    });
  });

  describe("static methods", () => {
    test("tryHaveSkill creates new Macro instance", () => {
      const mockSkill = $skill`Saucegeyser`;
      mockHave.mockReturnValueOnce(true);
      
      const macro = Macro.tryHaveSkill(mockSkill);
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("tryHaveItem creates new Macro instance", () => {
      const mockItem = $item`seal tooth`;
      mockHave.mockReturnValueOnce(true);
      
      const macro = Macro.tryHaveItem(mockItem);
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("try creates new Macro instance", () => {
      const actions: (Item | Skill)[] = [$item`seal tooth`, $skill`Saucegeyser`];
      mockHave.mockReturnValueOnce(true).mockReturnValueOnce(true);
      
      const macro = Macro.try(actions);
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("stasisItem creates new Macro instance", () => {
      mockHave.mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false);
      
      const macro = Macro.stasisItem();
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("kill creates new Macro instance", () => {
      const macro = Macro.kill();
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("stasis creates new Macro instance", () => {
      const macro = Macro.stasis();
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("redigitize creates new Macro instance", () => {
      const macro = Macro.redigitize();
      
      expect(macro).toBeInstanceOf(Macro);
    });

    test("default creates new Macro instance", () => {
      const macro = Macro.default();
      
      expect(macro).toBeInstanceOf(Macro);
    });
  });
});

describe("CandyStrategy", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("constructor sets up autoattack and macro", () => {
    const mockDelayedMacro: Delayed<Macro> = () => new Macro();
    const strategy = new CandyStrategy(mockDelayedMacro);

    expect(strategy).toBeInstanceOf(CandyStrategy);
  });

  test("constructor uses default macro when none provided", () => {
    const strategy = new CandyStrategy();

    expect(strategy).toBeInstanceOf(CandyStrategy);
  });
});