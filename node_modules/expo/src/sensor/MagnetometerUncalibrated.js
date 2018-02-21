// @flow

import { NativeModules } from 'react-native';
import ThreeAxisSensor from './ThreeAxisSensor';

const { ExponentMagnetometerUncalibrated } = NativeModules;

export default new ThreeAxisSensor(
  ExponentMagnetometerUncalibrated,
  'magnetometerUncalibratedDidUpdate'
);
