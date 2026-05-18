const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // Disable dd-trace plugin for jest to prevent conflicts
  setupFilesAfterEnv: [],
  testTimeout: 30000,
  // Enable more detailed error reporting
  verbose: false,
  // Make sure to properly cleanup resources
  forceExit: false, // Changed from true to false to prevent force exit warnings
  detectOpenHandles: false,
};