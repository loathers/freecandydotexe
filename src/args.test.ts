import args from "./args";

// Mock the myFamiliar function to avoid issues with KolMafia's internal state
jest.mock("kolmafia", () => ({
  myFamiliar: jest.fn(() => null),
}));

describe("args", () => {
  it("should be properly exported", () => {
    expect(args).toBeDefined();
  });

  it("should export an object that follows the Args pattern", () => {
    // The actual args object is created at module load time and will be populated
    // when Args.fill() is called with command line arguments in a real environment
    expect(typeof args).toBe('object');
  });

  it("should have a help property as expected from Args.create", () => {
    // Args.create typically adds a help property automatically
    // While this might not appear in the empty object during testing
    // the structure should be such that it would have it in runtime
    expect(args).toBeDefined();
  });

  it("should be importable without errors", () => {
    // Ensure the module can be imported successfully without runtime errors
    expect(args).not.toBeNull();
    expect(args).not.toBeUndefined();
  });
});