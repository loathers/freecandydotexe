// Manual mock for libram module that may not be installed
module.exports = {
  $location: jest.fn((name) => ({ name })),
  $item: jest.fn((name) => ({ name })),
  $items: jest.fn((...names) => names.map(name => ({ name }))),
  $familiar: jest.fn((name) => ({ name })),
  $familiars: jest.fn((...names) => names.map(name => ({ name }))),
  $skill: jest.fn((name) => ({ name })),
  $slot: jest.fn((name) => ({ name })),
  $slots: jest.fn((...names) => names.map(name => ({ name }))),
  $monster: jest.fn((name) => ({ name })),
  get: jest.fn(() => "default_value"),
  have: jest.fn(() => false),
  maxBy: jest.fn((arr, fn) => arr.length > 0 ? arr[0] : null),
  sum: jest.fn((arr, fn) => arr.reduce((total, item) => total + (fn ? fn(item) : item), 0)),
  sumNumbers: jest.fn((arr) => arr.reduce((total, num) => total + num, 0)),
  clamp: jest.fn((val, min, max) => Math.min(Math.max(val, min), max)),
  getAverageAdventures: jest.fn(() => 10),
  findLeprechaunMultiplier: jest.fn(() => 1),
  getFoldGroup: jest.fn(() => []),
  SongBoom: { song: jest.fn(() => "Welcome to the Jazz Age") },
  CrownOfThrones: {
    hasRiderMode: jest.fn(() => false),
    createRiderMode: jest.fn(),
    pickRider: jest.fn(() => null),
    createModifierValueFunction: jest.fn(() => () => {}),
  },
  BurningLeaves: { have: jest.fn(() => false) },
  TrainSet: {
    Station: {
      GAIN_MEAT: 'GAIN_MEAT',
      TRACKSIDE_DINER: 'TRACKSIDE_DINER',
      EXPERIENCE: 'EXPERIENCE',
      WANDERER: 'WANDERER',
    }
  },
};