// @flow

import { NativeModules } from 'react-native';
import ThreeAxisSensor from './ThreeAxisSensor';

const { ExponentAccelerometer } = NativeModules;

export default new ThreeAxisSensor(ExponentAccelerometer, 'accelerometerDidUpdate');
