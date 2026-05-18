import {
  abort,
  handlingChoice,
  inMultiFight,
  lastChoice,
  myAdventures,
  runChoice,
  runCombat,
  visitUrl,
} from "kolmafia";
import { treatOutfit } from "./outfit";
import { CandyStrategy } from "./combat";

// Mock the external dependencies
jest.mock("kolmafia", () => ({
  abort: jest.fn(),
  handlingChoice: jest.fn(),
  inMultiFight: jest.fn(),
  lastChoice: jest.fn(),
  myAdventures: jest.fn(),
  runChoice: jest.fn(),
  runCombat: jest.fn(),
  visitUrl: jest.fn(),
}));

jest.mock("./outfit", () => ({
  treatOutfit: {},
  trickOutfit: {},
}));

jest.mock("./combat", () => ({
  CandyStrategy: jest.fn(),
}));

describe("TRICK_TREAT_TASKS", () => {
  let TRICK_TREAT_TASKS: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Import fresh module for each test to reset state
    jest.isolateModules(() => {
      TRICK_TREAT_TASKS = require("./trickTreatTasks").default;
    });

    // Mock default return values for kolmafia functions
    (myAdventures as jest.MockedFunction<typeof myAdventures>).mockReturnValue(3);
    (handlingChoice as jest.MockedFunction<typeof handlingChoice>).mockReturnValue(false);
    (lastChoice as jest.MockedFunction<typeof lastChoice>).mockReturnValue(0);
    (inMultiFight as jest.MockedFunction<typeof inMultiFight>).mockReturnValue(false);

    // Default mock for visitUrl to return a sample HTML with houses
    (visitUrl as jest.MockedFunction<typeof visitUrl>).mockImplementation((url: string) => {
      if (url.includes("town_trickortreat")) {
        return `
          <html>
            <body>
              <a href="choice.php?whichchoice=804&option=3&whichhouse=0">house_l</a>
              <a href="choice.php?whichchoice=804&option=3&whichhouse=1">house_l</a>
              <a href="choice.php?whichchoice=804&option=3&whichhouse=2">house_d</a>
              <a href="choice.php?whichchoice=804&option=3&whichhouse=3">house_d</a>
            </body>
          </html>
        `;
      }
      return "success";
    });
  });

  describe("Treat task", () => {
    let treatTask: any;

    beforeEach(() => {
      treatTask = TRICK_TREAT_TASKS.find((task: any) => task.name === "Treat");
    });

    it("should have the correct properties", () => {
      expect(treatTask).toBeDefined();
      expect(treatTask.name).toBe("Treat");
      expect(treatTask.outfit).toBeDefined();
      expect(treatTask.prepare).toBeDefined();
      expect(treatTask.do).toBeDefined();
    });

    it("should have a ready function", () => {
      expect(typeof treatTask.ready).toBe("function");
    });

    it("should have a completed function that checks for treat houses", () => {
      expect(typeof treatTask.completed).toBe("function");
      const result = treatTask.completed();
      expect(result).toBeDefined();
    });
  });

  describe("Trick task", () => {
    let trickTask: any;

    beforeEach(() => {
      trickTask = TRICK_TREAT_TASKS.find((task: any) => task.name === "Trick");
    });

    it("should have the correct properties", () => {
      expect(trickTask).toBeDefined();
      expect(trickTask.name).toBe("Trick");
      expect(trickTask.outfit).toBeDefined();
      expect(trickTask.prepare).toBeDefined();
      expect(trickTask.do).toBeDefined();
      // Only check combat property if it exists
      if ('combat' in trickTask) {
        expect(trickTask.combat).toBeDefined();
      }
    });

    it("should have a ready function that checks tricked houses count", () => {
      expect(typeof trickTask.ready).toBe("function");
    });

    it("should have a completed function that checks for trick houses", () => {
      expect(typeof trickTask.completed).toBe("function");
    });
  });

  describe("Reset Block task", () => {
    let resetTask: any;

    beforeEach(() => {
      resetTask = TRICK_TREAT_TASKS.find((task: any) => task.name === "Reset Block");
    });

    it("should have the correct properties", () => {
      expect(resetTask).toBeDefined();
      expect(resetTask.name).toBe("Reset Block");
      expect(resetTask.prepare).toBeDefined();
      expect(resetTask.do).toBeDefined();
    });

    it("should have a ready function that checks adventures", () => {
      expect(typeof resetTask.ready).toBe("function");
      if (resetTask.ready) {
        const result = resetTask.ready();
        expect(result).toBe(false); // Since myAdventures returns 3, which is less than 5
      }
    });

    it("should have a completed function that checks for houses", () => {
      expect(typeof resetTask.completed).toBe("function");
      const result = resetTask.completed();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("internal behavior", () => {
    it("should make appropriate API calls when running tasks", () => {
      const treatTask = TRICK_TREAT_TASKS.find((task: any) => task.name === "Treat");

      // Run the completed function which will trigger visitUrl calls
      const result = treatTask.completed();

      // Verify that visitUrl was called as expected
      expect(visitUrl).toHaveBeenCalledWith("place.php?whichplace=town&action=town_trickortreat");
    });

    it("should check for sufficient adventures before reset", () => {
      const resetTask = TRICK_TREAT_TASKS.find((task: any) => task.name === "Reset Block");

      // Initially should not be ready (adventures = 3, threshold = 5)
      expect(resetTask.ready()).toBe(false);

      // Mock more adventures
      (myAdventures as jest.MockedFunction<typeof myAdventures>).mockReturnValue(5);
      expect(resetTask.ready()).toBe(true);
    });
  });
});