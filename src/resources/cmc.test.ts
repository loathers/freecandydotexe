import { Item } from "kolmafia";
import { coldMedicineCabinet } from "./cmc";

// Mock the kolmafia module functions with plain objects instead of trying to call Item constructor
jest.mock("kolmafia", () => ({
  descToItem: jest.fn(),
  runChoice: jest.fn(),
  visitUrl: jest.fn(),
}));

import { descToItem, runChoice, visitUrl } from "kolmafia";
import { freecandyValue } from "../value";

// Also mock the value module
jest.mock("../value", () => ({
  freecandyValue: jest.fn(),
}));

describe("coldMedicineCabinet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should visit the workshed and select the best item based on value", () => {
    // Mock the return value of visitUrl to simulate the cold medicine cabinet options
    const mockVisitUrlResponse = `
      <html>
        <body>
          <script>
            descitem(123); // Some item
            descitem(456); // Another item
            descitem(789); // Third item
          </script>
        </body>
      </html>
    `;
    
    (visitUrl as jest.MockedFunction<typeof visitUrl>).mockReturnValueOnce(mockVisitUrlResponse);

    // Mock descToItem to return plain objects that look like Item objects
    const item1 = { name: "aspirin" };
    const item2 = { name: "ibuprofen" };
    const item3 = { name: "acetaminophen" };

    (descToItem as jest.MockedFunction<typeof descToItem>).mockImplementation((id: string) => {
      switch(id) {
        case "123": return item1 as any;
        case "456": return item2 as any;
        case "789": return item3 as any;
        default: return { name: "unknown" } as any;
      }
    });

    // Mock freecandyValue to return different values for different items
    (freecandyValue as jest.MockedFunction<typeof freecandyValue>).mockImplementation((item: Item) => {
      if (item && (item as any).name === "aspirin") return 10;
      if (item && (item as any).name === "ibuprofen") return 20; // highest value
      if (item && (item as any).name === "acetaminophen") return 5;
      return 0;
    });

    // Call the function
    coldMedicineCabinet();

    // Verify that visitUrl was called initially to get options
    expect(visitUrl).toHaveBeenCalledWith("campground.php?action=workshed");
    
    // Verify that visitUrl was called again before making choice
    expect(visitUrl).toHaveBeenNthCalledWith(2, "campground.php?action=workshed");
    
    // Verify that runChoice was called with the correct choice number (2 for the highest value item)
    expect(runChoice).toHaveBeenCalledWith(2); // item2 had the highest value and was the 2nd item in the sequence
    
    // Verify that descToItem was called correctly
    expect(descToItem).toHaveBeenCalledTimes(3); // Called for each matched item ID
  });

  // Note: There is an edge case where the function may throw an error if no items are found in the response.
  // This happens when the sort result is empty and [0][0] is accessed on an empty array.
  // This is a bug in the original function that would need to be fixed in the source code.
  // The following tests cover the working scenarios.

  it("should handle case with only one item option", () => {
    // Mock response with only one item
    const mockVisitUrlResponse = `
      <html>
        <body>
          <script>
            descitem(999);
          </script>
        </body>
      </html>
    `;
    
    (visitUrl as jest.MockedFunction<typeof visitUrl>).mockReturnValueOnce(mockVisitUrlResponse);

    const singleItem = { name: "single_item" };
    (descToItem as jest.MockedFunction<typeof descToItem>)
      .mockReturnValueOnce(singleItem as any);

    (freecandyValue as jest.MockedFunction<typeof freecandyValue>)
      .mockImplementationOnce((item: Item) => 15);

    coldMedicineCabinet();

    expect(visitUrl).toHaveBeenCalledTimes(2);
    expect(descToItem).toHaveBeenCalledTimes(1);
    expect(runChoice).toHaveBeenCalledWith(1); // Only one item, so choice 1
  });

  it("should select the item with the highest value even if it appears later", () => {
    const mockVisitUrlResponse = `
      <html>
        <body>
          <script>
            descitem(111); // First item
            descitem(222); // Second item
            descitem(333); // Third item
          </script>
        </body>
      </html>
    `;
    
    (visitUrl as jest.MockedFunction<typeof visitUrl>).mockReturnValueOnce(mockVisitUrlResponse);

    const item1 = { name: "first" };
    const item2 = { name: "second" };
    const item3 = { name: "third" };

    (descToItem as jest.MockedFunction<typeof descToItem>).mockImplementation((id: string) => {
      switch(id) {
        case "111": return item1 as any;
        case "222": return item2 as any;
        case "333": return item3 as any;
        default: return { name: "unknown" } as any;
      }
    });

    // Make the third item have the highest value
    (freecandyValue as jest.MockedFunction<typeof freecandyValue>).mockImplementation((item: Item) => {
      if (item && (item as any).name === "first") return 5;
      if (item && (item as any).name === "second") return 10;
      if (item && (item as any).name === "third") return 100; // Highest value
      return 0;
    });

    coldMedicineCabinet();

    expect(runChoice).toHaveBeenCalledWith(3); // Third item in sequence had highest value
  });
});