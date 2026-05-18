// Mock the external modules before importing the module under test
jest.mock("kolmafia", () => ({
  eat: jest.fn(),
  fullnessLimit: jest.fn(),
  myAdventures: jest.fn(),
  myFullness: jest.fn(),
  myHp: jest.fn(),
  myMaxhp: jest.fn(),
  myMaxmp: jest.fn(),
  myMp: jest.fn(),
  print: jest.fn(),
  restoreHp: jest.fn(),
  restoreMp: jest.fn(),
  isDarkMode: jest.fn(),
}));

// Create a proper mock for $item that behaves like a template literal function
const mockItemFn = jest.fn((name: string) => name);
(mockItemFn as any).none = "none";

jest.mock("libram", () => ({
  $item: mockItemFn,
  get: jest.fn(),
  have: jest.fn(),
  SourceTerminal: {
    have: jest.fn(),
    getDigitizeUsesRemaining: jest.fn(),
  },
}));

// Now import the functions after mocking
import {
  eat,
  fullnessLimit,
  myAdventures,
  myFullness,
  myHp,
  myMaxhp,
  myMaxmp,
  myMp,
  print,
  restoreHp,
  restoreMp,
  isDarkMode,
} from "kolmafia";
import { $item, get, have, SourceTerminal } from "libram";
import { safeRestore, printHighlight, printError, shouldRedigitize, State, CandyTask } from "./lib";

describe("safeRestore", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set default mock implementations
    (myHp as jest.Mock).mockReturnValue(50);
    (myMaxhp as jest.Mock).mockReturnValue(100);
    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(100);
    (fullnessLimit as jest.Mock).mockReturnValue(15);
    (myFullness as jest.Mock).mockReturnValue(5);

    // Mock items availability
    (have as jest.Mock).mockImplementation((item) => {
      // item will be processed as a string like 'magical sausage' or 'magical sausage casing'
      const itemName = String(item);
      return itemName.includes('magical sausage');
    });

    // Mock _sausagesEaten
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sausagesEaten") return 10;
      return 0;
    });
  });

  it("should restore HP when below 50% max HP", () => {
    (myHp as jest.Mock).mockReturnValue(40); // Below 50% of 100
    (myMaxhp as jest.Mock).mockReturnValue(100);

    safeRestore();

    expect(restoreHp).toHaveBeenCalledWith(90); // 90% of 100
  });

  it("should not restore HP when above 50% max HP", () => {
    (myHp as jest.Mock).mockReturnValue(60); // Above 50% of 100
    (myMaxhp as jest.Mock).mockReturnValue(100);

    safeRestore();

    expect(restoreHp).not.toHaveBeenCalled();
  });

  it("should eat magical sausage to restore MP when available and within limits", () => {
    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(100);
    // Set up conditions for eating sausage
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sausagesEaten") return 10; // Below limit of 23
      return 0;
    });
    (myFullness as jest.Mock).mockReturnValue(5);
    (fullnessLimit as jest.Mock).mockReturnValue(15);

    safeRestore();

    expect(eat).toHaveBeenCalledWith(["magical sausage"]);
    expect(restoreMp).not.toHaveBeenCalled();
  });

  it("should restore MP directly when magical sausage is not available", () => {
    (have as jest.Mock).mockImplementation((item) => {
      const itemName = String(item);
      return itemName === "nonexistent item"; // Make sausage unavailable
    });

    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(100);

    safeRestore();

    expect(restoreMp).toHaveBeenCalledWith(100); // Min of maxmp (100) and 200
    expect(eat).not.toHaveBeenCalled();
  });

  it("should restore MP directly when sausage limit is reached", () => {
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sausagesEaten") return 30; // Over limit of 23
      return 0;
    });

    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(100);

    safeRestore();

    expect(restoreMp).toHaveBeenCalledWith(100);
    expect(eat).not.toHaveBeenCalled();
  });

  it("should restore MP directly when fullness limit would be exceeded", () => {
    (myFullness as jest.Mock).mockReturnValue(20);
    (fullnessLimit as jest.Mock).mockReturnValue(15);

    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(100);

    safeRestore();

    expect(restoreMp).toHaveBeenCalledWith(100);
    expect(eat).not.toHaveBeenCalled();
  });

  it("should cap MP restoration at 200", () => {
    (myMp as jest.Mock).mockReturnValue(50);
    (myMaxmp as jest.Mock).mockReturnValue(300); // More than 200 to test capping

    // Make sausage unavailable to trigger direct MP restoration
    (have as jest.Mock).mockImplementation((item) => {
      const itemName = String(item);
      return false; // Make all items unavailable including sausages
    });

    safeRestore();

    expect(restoreMp).toHaveBeenCalledWith(200); // Capped at 200
  });
});

describe("printHighlight", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should print in yellow when dark mode is enabled", () => {
    (isDarkMode as jest.Mock).mockReturnValue(true);

    printHighlight("Test message");

    expect(print).toHaveBeenCalledWith("Test message", "yellow");
  });

  it("should print in blue when dark mode is disabled", () => {
    (isDarkMode as jest.Mock).mockReturnValue(false);

    printHighlight("Test message");

    expect(print).toHaveBeenCalledWith("Test message", "blue");
  });
});

describe("printError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should always print in red", () => {
    printError("Test error message");

    expect(print).toHaveBeenCalledWith("Test error message", "red");
  });
});

describe("shouldRedigitize", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (SourceTerminal.have as jest.Mock).mockReturnValue(true);
    (myAdventures as jest.Mock).mockReturnValue(100);
    (SourceTerminal.getDigitizeUsesRemaining as jest.Mock).mockReturnValue(5);
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sourceTerminalDigitizeMonsterCount") return 2;
      return 0;
    });
  });

  it("should return false if Source Terminal is not available", () => {
    (SourceTerminal.have as jest.Mock).mockReturnValue(false);

    const result = shouldRedigitize();

    expect(result).toBe(false);
  });

  it("should return true when adventures threshold is met", () => {
    (myAdventures as jest.Mock).mockReturnValue(100);
    (SourceTerminal.getDigitizeUsesRemaining as jest.Mock).mockReturnValue(5);
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sourceTerminalDigitizeMonsterCount") return 2;
      return 0;
    });

    // Threshold calculation:
    // myAdventures() * 1.1 = 100 * 1.1 = 110
    // SourceTerminal.getDigitizeUsesRemaining() * (5 * (_sourceTerminalDigitizeMonsterCount * (1 + _sourceTerminalDigitizeMonsterCount)) - 3)
    // = 5 * (5 * (2 * (1 + 2)) - 3) = 5 * (5 * (2 * 3) - 3) = 5 * (5 * 6 - 3) = 5 * (30 - 3) = 5 * 27 = 135
    // Since 110 < 135, should return true

    const result = shouldRedigitize();

    expect(result).toBe(true);
  });

  it("should return false when adventures threshold is not met", () => {
    (myAdventures as jest.Mock).mockReturnValue(200);
    (SourceTerminal.getDigitizeUsesRemaining as jest.Mock).mockReturnValue(1);
    (get as jest.Mock).mockImplementation((property: string) => {
      if (property === "_sourceTerminalDigitizeMonsterCount") return 1;
      return 0;
    });

    // Threshold calculation:
    // myAdventures() * 1.1 = 200 * 1.1 = 220
    // SourceTerminal.getDigitizeUsesRemaining() * (5 * (_sourceTerminalDigitizeMonsterCount * (1 + _sourceTerminalDigitizeMonsterCount)) - 3)
    // = 1 * (5 * (1 * (1 + 1)) - 3) = 1 * (5 * (1 * 2) - 3) = 1 * (5 * 2 - 3) = 1 * (10 - 3) = 1 * 7 = 7
    // Since 220 > 7, should return false

    const result = shouldRedigitize();

    expect(result).toBe(false);
  });
});

describe("State", () => {
  it("should initialize with blocks at 0", () => {
    expect(State.blocks).toBe(0);
  });
});

describe("CandyTask type", () => {
  it("should be a type definition that can be imported", () => {
    // Simply test that the type can be imported without errors
    expect(safeRestore).toBeDefined(); // This is just confirming the import works
  });
});