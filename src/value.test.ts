import { Item } from "kolmafia";

// Create a consistent fake hand item to ensure both the original code and tests use the same reference
const fakeHandItem = { name: 'fake hand' } as Item;

// Mock the external dependencies BEFORE importing the actual functions
jest.mock("libram", () => ({
  $item: (templateStrings: TemplateStringsArray | string, ...expressions: any[]) => {
    // When using template literal $item`fake hand`, the templateStrings would be an array with the string value
    const itemName = Array.isArray(templateStrings) ? templateStrings[0] : templateStrings;

    // Return the special fake hand item if it's the fake hand
    if (itemName === 'fake hand') {
      return fakeHandItem;
    }

    // Return a mock Item object with a name property for other items
    return { name: itemName } as Item;
  }
}));

jest.mock("garbo-lib", () => ({
  makeValue: jest.fn().mockImplementation(({ itemValues }) => ({
    value: (item: Item, useHistorical = false) => {
      // In a real scenario, this would calculate the value based on itemValues and other factors
      // For our mock, we'll return the value from itemValues if it exists, or a default value
      let foundValue: number | undefined;
      itemValues.forEach((value: unknown, itemKey: unknown) => {
        if ((itemKey as Item).name === item.name) {
          foundValue = value as number;
        }
      });
      return foundValue !== undefined ? foundValue : 100; // Default value of 100 for non-specified items
    },
    averageValue: (...items: Item[]) => {
      // Calculate average of values for the given items
      const values = items.map(item => {
        let foundValue: number | undefined;
        itemValues.forEach((value: unknown, itemKey: unknown) => {
          if ((itemKey as Item).name === item.name) {
            foundValue = value as number;
          }
        });
        return foundValue !== undefined ? foundValue : 100; // Default value of 100 for non-specified items
      });
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
  }))
}));

// Now import after the mocks are set up
import { freecandyValue, freecandyAverageValue } from "./value";
import { $item } from "libram";

describe("value.ts functions", () => {
  beforeEach(() => {
    // Reset any cached value functions for each test
    jest.resetModules();
  });

  describe("freecandyValue", () => {
    test("should return value for fake hand item", () => {
      // $item`fake hand` is hardcoded to be worth 50000 in the itemValues map
      const fakeHand = $item`fake hand`;
      const value = freecandyValue(fakeHand);
      expect(value).toBe(50000);
    });

    test("should return default value for items not in the map", () => {
      // Create a mock item not in our hardcoded map
      const unknownItem = $item`unknown item` as Item;
      const value = freecandyValue(unknownItem);
      expect(value).toBe(100); // Default value from our mock
    });

    test("should handle useHistorical parameter", () => {
      // Test with useHistorical = true
      const fakeHand = $item`fake hand`;
      const valueWithHistorical = freecandyValue(fakeHand, true);
      expect(valueWithHistorical).toBe(50000);

      // Test with useHistorical = false
      const valueWithoutHistorical = freecandyValue(fakeHand, false);
      expect(valueWithoutHistorical).toBe(50000);
    });
  });

  describe("freecandyAverageValue", () => {
    test("should calculate average value for multiple items", () => {
      const fakeHand = $item`fake hand`;
      const unknownItem = $item`unknown item` as Item;

      const averageValue = freecandyAverageValue(fakeHand, unknownItem);
      // (50000 + 100) / 2 = 25050
      expect(averageValue).toBeCloseTo(25050);
    });

    test("should return single item value when only one item is passed", () => {
      const fakeHand = $item`fake hand`;
      const averageValue = freecandyAverageValue(fakeHand);
      expect(averageValue).toBe(50000);
    });

    test("should calculate average for multiple unknown items", () => {
      const unknownItem1 = $item`unknown item 1` as Item;
      const unknownItem2 = $item`unknown item 2` as Item;
      const unknownItem3 = $item`unknown item 3` as Item;

      const averageValue = freecandyAverageValue(unknownItem1, unknownItem2, unknownItem3);
      // (100 + 100 + 100) / 3 = 100
      expect(averageValue).toBe(100);
    });

    test("should calculate average for multiple fake hand items", () => {
      const fakeHand1 = $item`fake hand`;
      const fakeHand2 = $item`fake hand`;
      const fakeHand3 = $item`fake hand`;

      const averageValue = freecandyAverageValue(fakeHand1, fakeHand2, fakeHand3);
      // (50000 + 50000 + 50000) / 3 = 50000
      expect(averageValue).toBe(50000);
    });

    test("should calculate average for various mixed items", () => {
      const fakeHand = $item`fake hand`;
      const unknownItem1 = $item`unknown item 1` as Item;
      const unknownItem2 = $item`unknown item 2` as Item;

      const averageValue = freecandyAverageValue(fakeHand, unknownItem1, unknownItem2);
      // (50000 + 100 + 100) / 3 = 16733.33
      expect(averageValue).toBeCloseTo(16733.33, 2);
    });
  });

  describe("value consistency", () => {
    test("should return consistent values across multiple calls", () => {
      const fakeHand = $item`fake hand`;
      
      const value1 = freecandyValue(fakeHand);
      const value2 = freecandyValue(fakeHand);
      const value3 = freecandyValue(fakeHand);
      
      expect(value1).toBe(value2);
      expect(value2).toBe(value3);
      expect(value1).toBe(50000);
    });

    test("should cache value functions between calls", () => {
      const fakeHand = $item`fake hand`;
      const unknownItem = $item`unknown item` as Item;

      const value1 = freecandyValue(fakeHand);
      const avgValue1 = freecandyAverageValue(fakeHand, unknownItem);
      const value2 = freecandyValue(fakeHand);
      const avgValue2 = freecandyAverageValue(fakeHand, unknownItem);

      expect(value1).toBe(value2);
      expect(avgValue1).toBe(avgValue2);
    });
  });
});