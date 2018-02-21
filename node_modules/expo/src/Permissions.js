// @flow

import { Platform, NativeModules } from 'react-native';

let { ExponentPermissions: Permissions } = NativeModules;

type PermissionType =
  | 'remoteNotifications'
  | 'location'
  | 'camera'
  | 'contacts'
  | 'audioRecording'
  | 'systemBrightness'
  | 'cameraRoll';
type PermissionStatus = 'undetermined' | 'granted' | 'denied';
type PermissionExpires = 'never';
type PermissionDetailsLocationIOS = {
  scope: 'whenInUse' | 'always',
};
type PermissionDetailsLocationAndroid = {
  scope: 'fine' | 'coarse' | 'none',
};
type PermissionResponse = {
  status: PermissionStatus,
  expires: PermissionExpires,
  ios?: PermissionDetailsLocationIOS,
  android?: PermissionDetailsLocationAndroid,
};

export async function getAsync(type: PermissionType): Promise<PermissionResponse> {
  // TODO: remove this when CAMERA_ROLL permission is supported on iOS
  if (type === CAMERA_ROLL && Platform.OS === 'ios') {
    return { status: 'granted', expires: 'never' };
  }

  return Permissions.getAsync(type);
}

export async function askAsync(type: PermissionType): Promise<PermissionResponse> {
  // TODO: remove this when CAMERA_ROLL permission is supported on iOS
  if (type === CAMERA_ROLL && Platform.OS === 'ios') {
    return { status: 'granted', expires: 'never' };
  }

  return Permissions.askAsync(type);
}

export const CAMERA = 'camera';
export const AUDIO_RECORDING = 'audioRecording';
export const LOCATION = 'location';
export const REMOTE_NOTIFICATIONS = 'remoteNotifications';
export const NOTIFICATIONS = REMOTE_NOTIFICATIONS;
export const CONTACTS = 'contacts';
export const SYSTEM_BRIGHTNESS = 'systemBrightness';
export const CAMERA_ROLL = 'cameraRoll';
