// @flow

import invariant from 'invariant';
import { EventEmitter, EventSubscription } from 'fbemitter';
import { DeviceEventEmitter, NativeModules } from 'react-native';

const { ExponentUtil } = NativeModules;

export function getCurrentDeviceCountryAsync(): Promise<string> {
  return ExponentUtil.getCurrentDeviceCountryAsync();
}

export function getCurrentLocaleAsync(): Promise<string> {
  return ExponentUtil.getCurrentLocaleAsync();
}

export function getCurrentTimeZoneAsync(): Promise<string> {
  return ExponentUtil.getCurrentTimeZoneAsync();
}

export function reload(): void {
  ExponentUtil.reload();
}

let _emitter: ?EventEmitter;

function _getEmitter(): EventEmitter {
  if (!_emitter) {
    _emitter = new EventEmitter();
    DeviceEventEmitter.addListener('Exponent.newVersionAvailable', _emitNewVersionAvailable);
  }
  return _emitter;
}

function _emitNewVersionAvailable(newVersionEvent): void {
  if (typeof newVersionEvent === 'string') {
    newVersionEvent = JSON.parse(newVersionEvent);
  }

  invariant(_emitter, `EventEmitter must be initialized to use from its listener`);
  _emitter.emit('newVersionAvailable', newVersionEvent);
}

export function addNewVersionListenerExperimental(listener: Function): EventSubscription {
  let emitter = _getEmitter();
  return emitter.addListener('newVersionAvailable', listener);
}
