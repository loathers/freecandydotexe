// Manual mock for grimoire-kolmafia module that may not be installed
module.exports = {
  Args: {
    create: jest.fn(() => ({})),
    update: jest.fn(),
    number: jest.fn((options) => options.default),
    boolean: jest.fn((options) => options.default),
    string: jest.fn((options) => options.default),
    familiar: jest.fn((options) => options.default),
  },
  Outfit: jest.fn(() => ({
    equip: jest.fn(() => true),
    familiar: null,
    modifier: [],
    setBonuses: jest.fn(),
    bjornify: jest.fn(),
    enthrone: jest.fn(),
    spec: jest.fn(() => ({})),
    haveEquipped: jest.fn(() => false),
  })),
  OutfitSpec: {},
  OutfitSpecs: {},
  maximize: jest.fn(() => true),
};