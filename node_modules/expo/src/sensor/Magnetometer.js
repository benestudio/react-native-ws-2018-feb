// @flow

import { NativeModules } from 'react-native';
import ThreeAxisSensor from './ThreeAxisSensor';

const { ExponentMagnetometer } = NativeModules;

export default new ThreeAxisSensor(ExponentMagnetometer, 'magnetometerDidUpdate');
