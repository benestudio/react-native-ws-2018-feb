// @flow

import { NativeModules } from 'react-native';

// On Android we pass the manifest in JSON form so this step is necessary
const { ExponentConstants } = NativeModules;

let manifest;
if (ExponentConstants) {
  manifest = ExponentConstants.manifest;
  if (typeof manifest === 'string') {
    manifest = JSON.parse(manifest);
  }
}

export default {
  ...ExponentConstants,
  linkingUrl: ExponentConstants.linkingUri,
  manifest,
};
