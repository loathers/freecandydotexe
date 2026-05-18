import { WandererManager } from "garbo-lib";
import { getMonsters, myAdventures, Monster } from "kolmafia";
import { $location } from "libram";
import { freecandyValue } from "./value";
import args from "./args";
import { State } from "./lib";
import { wanderer } from "./wanderer";

// Define types that match the expected interface for the configuration
type WandererConfig = {
  ascend: boolean;
  estimatedTurns: () => number;
  itemValue: typeof freecandyValue;
  effectValue: () => number;
  prioritizeCappingGuzzlr: boolean;
  plentifulMonsters: Monster[];
  freeFightExtraValue: () => number;
};

describe("wanderer", () => {
  beforeEach(() => {
    // Reset the module to clear the singleton cache for each test
    jest.resetModules();
  });

  it("should create a WandererManager instance with correct configuration", async () => {
    // Dynamically import to ensure fresh module state
    const { wanderer } = await import('./wanderer');
    const { WandererManager } = require('garbo-lib');
    const { getMonsters, myAdventures } = require('kolmafia');
    const { $location } = require('libram');
    const { freecandyValue } = await import('./value');
    const args = await import('./args');
    const { State } = await import('./lib');

    const mockGetMonsters = getMonsters as jest.MockedFunction<typeof getMonsters>;
    const mockMyAdventures = myAdventures as jest.MockedFunction<typeof myAdventures>;
    const mockLocation = $location as jest.MockedFunction<typeof $location>;
    const mockWandererManager = WandererManager as any;
    const mockFreecandyValue = freecandyValue as jest.MockedFunction<typeof freecandyValue>;

    // Arrange
    const mockTrickOrTreatLocation = { name: "Trick-or-Treating" } as any;
    const mockMonsters: Monster[] = [{ name: "monster1" }, { name: "monster2" }] as Monster[];
    const mockAdv = 20;

    mockLocation.mockReturnValue(mockTrickOrTreatLocation);
    mockGetMonsters.mockReturnValue(mockMonsters);
    mockMyAdventures.mockReturnValue(mockAdv);

    // Act
    const result = wanderer();

    // Assert
    expect(mockWandererManager).toHaveBeenCalledWith({
      ascend: true,
      estimatedTurns: expect.any(Function),
      itemValue: mockFreecandyValue,
      effectValue: expect.any(Function),
      prioritizeCappingGuzzlr: false,
      plentifulMonsters: mockMonsters,
      freeFightExtraValue: expect.any(Function),
    });

    // Test the estimatedTurns function specifically
    const config = mockWandererManager.mock.calls[0][0] as WandererConfig;
    const turns = config.estimatedTurns();
    expect(turns).toBe(Math.min(mockAdv, 5 * (args.default.blocks - State.blocks))); // args.blocks - State.blocks = 10 - 2 = 8, 5 * 8 = 40, min(20, 40) = 20

    // Test the effectValue function returns 0
    const effectValueResult = config.effectValue();
    expect(effectValueResult).toBe(0);

    // Test the freeFightExtraValue function returns 0
    const freeFightValueResult = config.freeFightExtraValue();
    expect(freeFightValueResult).toBe(0);
  });

  it("should return the same WandererManager instance on subsequent calls", async () => {
    // Dynamically import to ensure fresh module state
    const { wanderer } = await import('./wanderer');
    const { WandererManager } = require('garbo-lib');
    const { getMonsters, myAdventures } = require('kolmafia');
    const { $location } = require('libram');

    const mockGetMonsters = getMonsters as jest.MockedFunction<typeof getMonsters>;
    const mockMyAdventures = myAdventures as jest.MockedFunction<typeof myAdventures>;
    const mockLocation = $location as jest.MockedFunction<typeof $location>;
    const mockWandererManager = WandererManager as any;

    // Arrange
    const mockTrickOrTreatLocation = { name: "Trick-or-Treating" } as any;
    const mockMonsters: Monster[] = [{ name: "monster1" }, { name: "monster2" }] as Monster[];
    const mockAdv = 20;

    mockLocation.mockReturnValue(mockTrickOrTreatLocation);
    mockGetMonsters.mockReturnValue(mockMonsters);
    mockMyAdventures.mockReturnValue(mockAdv);

    // Act
    const firstCallResult = wanderer();
    const secondCallResult = wanderer();

    // Assert
    expect(firstCallResult).toBe(secondCallResult); // Same instance
    expect(mockWandererManager).toHaveBeenCalledTimes(1); // Constructor called only once at first call
  });

  it("should handle different adventure counts in estimatedTurns calculation", async () => {
    // Dynamically import to ensure fresh module state
    const { wanderer } = await import('./wanderer');
    const { WandererManager } = require('garbo-lib');
    const { getMonsters, myAdventures } = require('kolmafia');
    const { $location } = require('libram');
    const args = await import('./args');
    const { State } = await import('./lib');

    const mockGetMonsters = getMonsters as jest.MockedFunction<typeof getMonsters>;
    const mockMyAdventures = myAdventures as jest.MockedFunction<typeof myAdventures>;
    const mockLocation = $location as jest.MockedFunction<typeof $location>;
    const mockWandererManager = WandererManager as any;

    // Arrange
    const mockTrickOrTreatLocation = { name: "Trick-or-Treating" } as any;
    const mockMonsters: Monster[] = [{ name: "monster1" }, { name: "monster2" }] as Monster[];
    const mockAdv = 5; // Less than the calculated value

    mockLocation.mockReturnValue(mockTrickOrTreatLocation);
    mockGetMonsters.mockReturnValue(mockMonsters);
    mockMyAdventures.mockReturnValue(mockAdv);

    // Act
    const result = wanderer();

    // Get the configuration passed to constructor
    const config = mockWandererManager.mock.calls[0][0] as WandererConfig;
    const turns = config.estimatedTurns();

    // Assert
    expect(turns).toBe(Math.min(mockAdv, 5 * (args.default.blocks - State.blocks))); // Should return 5 (min of 5 and 40)
  });

  it("should pass the correct trick-or-treat monsters to the configuration", async () => {
    // Dynamically import to ensure fresh module state
    const { wanderer } = await import('./wanderer');
    const { WandererManager } = require('garbo-lib');
    const { getMonsters } = require('kolmafia');
    const { $location } = require('libram');

    const mockGetMonsters = getMonsters as jest.MockedFunction<typeof getMonsters>;
    const mockLocation = $location as jest.MockedFunction<typeof $location>;
    const mockWandererManager = WandererManager as any;

    // Arrange
    const mockTrickOrTreatLocation = { name: "Trick-or-Treating" } as any;
    const mockMonsters: Monster[] = [{ name: "Spooky Vampire" }, { name: "Candy Witch" }] as Monster[];

    mockLocation.mockReturnValue(mockTrickOrTreatLocation);
    mockGetMonsters.mockReturnValue(mockMonsters);

    // Act
    const result = wanderer();

    // Get the configuration passed to constructor
    const config = mockWandererManager.mock.calls[0][0] as WandererConfig;

    // Assert
    expect(config.plentifulMonsters).toEqual(mockMonsters);
  });

  it("should use the correct item value function from value module", async () => {
    // Dynamically import to ensure fresh module state
    const { wanderer } = await import('./wanderer');
    const { WandererManager } = require('garbo-lib');
    const { getMonsters, myAdventures } = require('kolmafia');
    const { $location } = require('libram');
    const { freecandyValue } = await import('./value');

    const mockGetMonsters = getMonsters as jest.MockedFunction<typeof getMonsters>;
    const mockMyAdventures = myAdventures as jest.MockedFunction<typeof myAdventures>;
    const mockLocation = $location as jest.MockedFunction<typeof $location>;
    const mockWandererManager = WandererManager as any;
    const mockFreecandyValue = freecandyValue as jest.MockedFunction<typeof freecandyValue>;

    // Arrange
    const mockTrickOrTreatLocation = { name: "Trick-or-Treating" } as any;
    const mockMonsters: Monster[] = [{ name: "monster1" }, { name: "monster2" }] as Monster[];
    const mockAdv = 20;

    mockLocation.mockReturnValue(mockTrickOrTreatLocation);
    mockGetMonsters.mockReturnValue(mockMonsters);
    mockMyAdventures.mockReturnValue(mockAdv);

    // Act
    const result = wanderer();

    // Get the configuration passed to constructor
    const config = mockWandererManager.mock.calls[0][0] as WandererConfig;

    // Assert
    expect(config.itemValue).toBe(mockFreecandyValue);
  });
});