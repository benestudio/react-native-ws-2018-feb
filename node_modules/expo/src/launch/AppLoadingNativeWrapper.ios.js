// @flow

import React from 'react';
import { NativeModules, requireNativeComponent } from 'react-native';

export default class AppLoading extends React.Component<{}> {
  componentWillUnmount() {
    // Until we give more control over this, give the app 200ms to render
    // something and prevent a white flash
    setTimeout(() => {
      NativeModules.ExponentAppLoadingManager.finishedAsync();
    }, 200);
  }

  render() {
    return <NativeAppLoading />;
  }
}

const NativeAppLoading = requireNativeComponent('ExponentAppLoading', null);
