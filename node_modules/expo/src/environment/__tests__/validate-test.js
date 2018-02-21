import { mockProperty, unmockAllProperties } from '../../../test/mocking';

const createMockInitializeCore = jest.fn(() => jest.fn());
jest.doMock('react-native/Libraries/Core/InitializeCore', createMockInitializeCore);

afterEach(() => {
  unmockAllProperties();
  jest.resetModules();
});

it(`initializes React Native`, () => {
  expect(createMockInitializeCore).not.toHaveBeenCalled();
  require('../validate');
  expect(createMockInitializeCore).toHaveBeenCalled();
});

it(`passes if we're running in Expo`, () => {
  const { NativeModules } = require('react-native');
  expect(NativeModules.ExponentConstants).toBeDefined();
  expect(() => require('../validate')).not.toThrow();
});

it(`throws if we're not running in Expo`, () => {
  const { NativeModules } = require('react-native');
  mockProperty(NativeModules, 'ExponentConstants', undefined);
  expect(() => require('../validate')).toThrowError('Expo');
});
