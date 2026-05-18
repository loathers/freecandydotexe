import {
  appearanceRates,
  availableAmount,
  getLocationMonsters,
  itemDropsArray,
  Location,
  myAdventures,
  toMonster,
} from "kolmafia";
import { AutumnAton, $items, get } from "libram";
import { freecandyAverageValue, freecandyValue } from "../value";
import { bestAutumnatonLocation } from "./autumnaton";

// Mock the external dependencies
jest.mock("kolmafia", () => ({
  appearanceRates: jest.fn(),
  availableAmount: jest.fn(),
  getLocationMonsters: jest.fn(),
  itemDropsArray: jest.fn(),
  toMonster: jest.fn(),
  myAdventures: jest.fn(),
}));

// Mock libram with only the functions we need
jest.mock("libram", () => ({
  $items: jest.fn(),
  AutumnAton: {
    zoneItems: jest.fn(),
    visualAcuity: jest.fn(),
    getUniques: jest.fn(),
    seasonalItems: jest.fn(),
    turnsLeft: jest.fn(),
    legs: jest.fn(),
    currentUpgrades: jest.fn(),
  },
  maxBy: jest.fn(),
  sum: jest.fn(),
  flat: jest.fn(),
  get: jest.fn(),
}));

jest.mock("../value", () => ({
  freecandyAverageValue: jest.fn(),
  freecandyValue: jest.fn(),
}));

describe("autumnaton.ts functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("bestAutumnatonLocation", () => {
    it("should return a location from the input array", () => {
      const mockLocation1 = {
        name: "Location 1",
        id: 1,
        parent: undefined
      } as unknown as Location;
      const mockLocation2 = {
        name: "Location 2",
        id: 2,
        parent: undefined
      } as unknown as Location;
      const mockLocations = [mockLocation1, mockLocation2];

      // Simplify the mocking approach - just return the first location for this test
      (require("libram").maxBy as jest.Mock).mockReturnValue(mockLocation1);

      // Mock AutumnAton functions
      (require("libram").AutumnAton.currentUpgrades as jest.Mock).mockReturnValue([]);
      (require("libram").AutumnAton.zoneItems as jest.Mock).mockReturnValue(5);
      (require("libram").AutumnAton.visualAcuity as jest.Mock).mockReturnValue(2);
      (require("libram").AutumnAton.getUniques as jest.Mock).mockReturnValue(null);
      (require("libram").AutumnAton.seasonalItems as jest.Mock).mockReturnValue(1);
      (require("libram").AutumnAton.turnsLeft as jest.Mock).mockReturnValue(0);
      (require("libram").AutumnAton.legs as jest.Mock).mockReturnValue(1);
      (get as jest.Mock).mockReturnValue("0");

      // Mock other functions with minimal setup
      (appearanceRates as jest.Mock).mockReturnValue({"Test Monster": 50});
      (getLocationMonsters as jest.Mock).mockReturnValue({"Test Monster": {}});
      (toMonster as jest.Mock).mockReturnValue({name: "Test Monster", attributes: []});
      (itemDropsArray as jest.Mock).mockReturnValue([]);
      (require("libram").flat as jest.Mock).mockReturnValue([]);
      (require("libram").sum as jest.Mock).mockReturnValue(0);
      (freecandyAverageValue as jest.Mock).mockReturnValue(10);
      (freecandyValue as jest.Mock).mockReturnValue(5);
      (myAdventures as jest.Mock).mockReturnValue(100);
      (availableAmount as jest.Mock).mockReturnValue(0);
      (require("libram").$items as jest.Mock).mockImplementation(() => []);

      const result = bestAutumnatonLocation(mockLocations);

      // Just check that the result is one of the input locations
      expect([mockLocation1, mockLocation2]).toContain(result);
    });

    it("should exclude locations with parent 'Clan Basement'", () => {
      const validLocation = {
        name: "Valid Location",
        id: 1,
        parent: undefined
      } as unknown as Location;
      const invalidLocation = { // This one should be excluded
        name: "Invalid Location",
        id: 2,
        parent: "Clan Basement"
      } as unknown as Location;
      const mockLocations = [validLocation, invalidLocation];

      // Set up simplified mocks
      (require("libram").AutumnAton.currentUpgrades as jest.Mock).mockReturnValue([]);
      (require("libram").AutumnAton.zoneItems as jest.Mock).mockReturnValue(5);
      (require("libram").AutumnAton.visualAcuity as jest.Mock).mockReturnValue(2);
      (require("libram").AutumnAton.getUniques as jest.Mock).mockReturnValue(null);
      (require("libram").AutumnAton.seasonalItems as jest.Mock).mockReturnValue(1);
      (require("libram").AutumnAton.turnsLeft as jest.Mock).mockReturnValue(0);
      (require("libram").AutumnAton.legs as jest.Mock).mockReturnValue(1);
      (get as jest.Mock).mockReturnValue("0");

      (appearanceRates as jest.Mock).mockReturnValue({"Test Monster": 50});
      (getLocationMonsters as jest.Mock).mockReturnValue({"Test Monster": {}});
      (toMonster as jest.Mock).mockReturnValue({name: "Test Monster", attributes: []});
      (itemDropsArray as jest.Mock).mockReturnValue([]);
      (require("libram").flat as jest.Mock).mockReturnValue([]);
      (require("libram").sum as jest.Mock).mockReturnValue(0);
      (freecandyAverageValue as jest.Mock).mockReturnValue(10);
      (freecandyValue as jest.Mock).mockReturnValue(5);
      (myAdventures as jest.Mock).mockReturnValue(100);
      (availableAmount as jest.Mock).mockReturnValue(0);
      (require("libram").$items as jest.Mock).mockImplementation(() => []);

      // Mock maxBy to ensure it only receives valid locations (without Clan Basement)
      (require("libram").maxBy as jest.Mock).mockImplementation((arr: any[]) => {
        // Verify that no location with "Clan Basement" as parent is in the array
        const invalidLocFound = arr.some((loc: any) => loc.parent === "Clan Basement");
        expect(invalidLocFound).toBe(false);

        // Return the first valid location
        return arr[0];
      });

      const result = bestAutumnatonLocation(mockLocations);

      expect(result).toBeDefined();
      expect(result).not.toBe(invalidLocation);
    });

    it("should return the first location when only one location is provided", () => {
      const singleLocation = {
        name: "Single Location",
        id: 1,
        parent: undefined
      } as unknown as Location;
      const mockLocations = [singleLocation];

      // Set up simplified mocks
      (require("libram").AutumnAton.currentUpgrades as jest.Mock).mockReturnValue([]);
      (require("libram").AutumnAton.zoneItems as jest.Mock).mockReturnValue(5);
      (require("libram").AutumnAton.visualAcuity as jest.Mock).mockReturnValue(2);
      (require("libram").AutumnAton.getUniques as jest.Mock).mockReturnValue(null);
      (require("libram").AutumnAton.seasonalItems as jest.Mock).mockReturnValue(1);
      (require("libram").AutumnAton.turnsLeft as jest.Mock).mockReturnValue(0);
      (require("libram").AutumnAton.legs as jest.Mock).mockReturnValue(1);
      (get as jest.Mock).mockReturnValue("0");

      (appearanceRates as jest.Mock).mockReturnValue({"Test Monster": 50});
      (getLocationMonsters as jest.Mock).mockReturnValue({"Test Monster": {}});
      (toMonster as jest.Mock).mockReturnValue({name: "Test Monster", attributes: []});
      (itemDropsArray as jest.Mock).mockReturnValue([]);
      (require("libram").flat as jest.Mock).mockReturnValue([]);
      (require("libram").sum as jest.Mock).mockReturnValue(0);
      (freecandyAverageValue as jest.Mock).mockReturnValue(10);
      (freecandyValue as jest.Mock).mockReturnValue(5);
      (myAdventures as jest.Mock).mockReturnValue(100);
      (availableAmount as jest.Mock).mockReturnValue(0);
      (require("libram").$items as jest.Mock).mockImplementation(() => []);

      // Simple mock for maxBy to return the single location
      (require("libram").maxBy as jest.Mock).mockReturnValue(singleLocation);

      const result = bestAutumnatonLocation(mockLocations);

      expect(result).toBe(singleLocation);
    });
  });
});