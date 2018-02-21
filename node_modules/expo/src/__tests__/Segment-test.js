import { NativeModules } from 'react-native';
import Segment from '../Segment';

import { mockPlatformAndroid, mockPlatformIOS, unmockAllProperties } from '../../test/mocking';

describe('initialization', () => {
  const mockOptions = {
    androidWriteKey: 'android-write-key',
    iosWriteKey: 'ios-write-key',
  };

  afterEach(unmockAllProperties);

  it(`initializes on Android`, () => {
    mockPlatformAndroid();

    Segment.initialize(mockOptions);

    expect(NativeModules.ExponentSegment.initializeAndroid).toHaveBeenCalledWith(
      mockOptions.androidWriteKey
    );
    expect(NativeModules.ExponentSegment.initializeIOS).not.toHaveBeenCalled();
  });

  it(`initializes on iOS`, () => {
    mockPlatformIOS();

    Segment.initialize(mockOptions);

    expect(NativeModules.ExponentSegment.initializeIOS).toHaveBeenCalledWith(
      mockOptions.iosWriteKey
    );
    expect(NativeModules.ExponentSegment.initializeAndroid).not.toHaveBeenCalled();
  });
});
