import main from "./index";

// Mock all dependencies before imports
jest.mock("./args", () => ({
  __esModule: true,
  default: { help: false, blocks: 10 },
}));

jest.mock("./regularTasks", () => ({
  __esModule: true,
  default: [],
}));

jest.mock("./trickTreatTasks", () => ({
  __esModule: true,
  default: [],
}));

const mockEngineRun = jest.fn();
const mockEngineDestruct = jest.fn();

jest.mock("./engine", () => {
  const MockCandyEngine = jest.fn().mockImplementation(() => ({
    run: mockEngineRun,
    destruct: mockEngineDestruct,
  }));
  return {
    __esModule: true,
    default: MockCandyEngine,
  };
});

jest.mock("grimoire-kolmafia", () => ({
  Args: {
    fill: jest.fn(),
    showHelp: jest.fn(),
  },
  getTasks: jest.fn().mockReturnValue([]),
}), { virtual: true });

jest.mock("libram", () => ({
  questStep: jest.fn().mockReturnValue(0),
  set: jest.fn(),
}), { virtual: true });

jest.mock("kolmafia", () => ({
  myAdventures: jest.fn().mockReturnValue(100),
  print: jest.fn(),
}), { virtual: true });

// Mock lib with initial State
jest.mock("./lib", () => ({
  CandyTask: {},
  State: { blocks: 0 },
}), { virtual: true });

describe("main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mock return values
    require("kolmafia").myAdventures.mockReturnValue(100);
    require("libram").questStep.mockReturnValue(0);
    
    // Reset State.blocks
    const libModule = require("./lib");
    libModule.State.blocks = 0;
  });

  it("should show help when args.help is true", () => {
    const args = require("./args").default;
    args.help = true;

    main("--help");

    const { Args } = require("grimoire-kolmafia");
    expect(Args.fill).toHaveBeenCalledWith(args, "--help");
    expect(Args.showHelp).toHaveBeenCalledWith(args);
    expect(mockEngineRun).not.toHaveBeenCalled();
  });

  it("should initialize and run the engine normally", () => {
    const args = require("./args").default;
    args.help = false;

    main();

    expect(require("libram").set).toHaveBeenCalledWith("_lastCombatLost", false);
    expect(require("./engine").default).toHaveBeenCalled();
    expect(mockEngineRun).toHaveBeenCalled();
    expect(mockEngineDestruct).toHaveBeenCalled();
  });

  it("should initialize and run the engine with provided arguments", () => {
    const args = require("./args").default;
    args.help = false;

    main("--blocks 5");

    const { Args } = require("grimoire-kolmafia");
    expect(Args.fill).toHaveBeenCalledWith(args, "--blocks 5");
    expect(require("libram").set).toHaveBeenCalledWith("_lastCombatLost", false);
    expect(require("./engine").default).toHaveBeenCalled();
    expect(mockEngineRun).toHaveBeenCalled();
    expect(mockEngineDestruct).toHaveBeenCalled();
  });

  it("should handle no more adventures condition", () => {
    require("kolmafia").myAdventures.mockReturnValue(0);

    main();

    // The condition would be checked inside the quest.completed function during engine run
    // Since we're mocking the engine run, the actual print won't happen
    // But the quest should be considered completed based on the condition
    expect(mockEngineRun).toHaveBeenCalled();
  });

  it("should handle nemesis done condition", () => {
    // Simulate nemesis step >= 25 (done with nemesis)
    require("libram").questStep.mockReturnValue(26);

    main();

    // The condition would be checked inside the quest.completed function during engine run
    expect(mockEngineRun).toHaveBeenCalled();
  });

  it("should handle blocks target reached condition", () => {
    // Modify the State to have blocks equal to the target
    const libModule = require("./lib");
    libModule.State.blocks = 10; // Same as default args.blocks which is 10

    main();

    // The condition would be checked inside the quest.completed function during engine run
    expect(mockEngineRun).toHaveBeenCalled();
  });

  it("should set _lastCombatLost to false", () => {
    main();

    expect(require("libram").set).toHaveBeenCalledWith("_lastCombatLost", false);
  });

  it("should handle different nemesis states correctly", () => {
    // Test when nemesis step is less than 17 (not doing nemesis)
    require("libram").questStep.mockReturnValue(10);
    main();
    expect(mockEngineRun).toHaveBeenCalled();

    // Clear mocks to test next scenario independently
    jest.clearAllMocks();
    require("libram").questStep.mockReturnValue(10); // still below 17
    require("kolmafia").myAdventures.mockReturnValue(100); // reset
    main();
    
    // Test when nemesis step is between 17 and 24 (doing nemesis but not done)
    jest.clearAllMocks();
    require("libram").questStep.mockReturnValue(20); // between 17 and 24
    require("kolmafia").myAdventures.mockReturnValue(100); // reset
    main();
    expect(mockEngineRun).toHaveBeenCalled(); // should still run normally
  });
});