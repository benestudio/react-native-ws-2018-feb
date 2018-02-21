// @flow

import { NativeModules, Platform } from 'react-native';

const { ExponentSegment } = NativeModules;

export default {
  initialize(options: { androidWriteKey?: string, iosWriteKey?: string }): void {
    if (Platform.OS === 'android') {
      return ExponentSegment.initializeAndroid(options.androidWriteKey);
    } else if (Platform.OS === 'ios') {
      return ExponentSegment.initializeIOS(options.iosWriteKey);
    } else {
      throw new Error(`Unable to initialize Segment on \`${Platform.OS}\``);
    }
  },

  identify(userId: string): void {
    return ExponentSegment.identify(userId);
  },

  identifyWithTraits(userId: string, traits: { [string]: any }): void {
    return ExponentSegment.identifyWithTraits(userId, traits);
  },

  reset(): void {
    return ExponentSegment.reset();
  },

  track(event: string): void {
    return ExponentSegment.track((event: string));
  },

  trackWithProperties(event: string, properties: { [string]: any }): void {
    return ExponentSegment.trackWithProperties(event, properties);
  },

  screen(screenName: string): void {
    return ExponentSegment.screen(screenName);
  },

  screenWithProperties(event: string, properties: string): void {
    return ExponentSegment.screenWithProperties(event, properties);
  },

  flush(): void {
    return ExponentSegment.flush();
  },
};
