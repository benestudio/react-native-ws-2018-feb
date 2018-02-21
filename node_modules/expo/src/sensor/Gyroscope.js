// @flow

import { NativeModules } from 'react-native';
import ThreeAxisSensor from './ThreeAxisSensor';

const { ExponentGyroscope } = NativeModules;

export default new ThreeAxisSensor(ExponentGyroscope, 'gyroscopeDidUpdate');
