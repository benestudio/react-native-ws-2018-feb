// @flow

import { EventEmitter, EventSubscription } from 'fbemitter';

import invariant from 'invariant';
import warning from 'fbjs/lib/warning';

import { DeviceEventEmitter, NativeModules, Platform } from 'react-native';

const { ExponentNotifications } = NativeModules;

type Notification = {
  origin: 'selected' | 'received',
  data: any,
  remote: boolean,
  isMultiple: boolean,
};

type LocalNotification = {
  title: string,
  // How should we deal with body being required on iOS but not on Android?
  body?: string,
  data?: any,
  ios?: {
    sound?: boolean,
  },
  android?: {
    sound?: boolean,
    icon?: string,
    color?: string,
    priority?: string,
    sticky?: boolean,
    vibrate?: boolean | Array<number>,
    link?: string,
  },
};

// Android assigns unique number to each notification natively.
// Since that's not supported on iOS, we generate an unique string.
type LocalNotificationId = string | number;

let _emitter;
let _initialNotification;

function _maybeInitEmitter() {
  if (!_emitter) {
    _emitter = new EventEmitter();
    DeviceEventEmitter.addListener('Exponent.notification', _emitNotification);
  }
}

function _emitNotification(notification) {
  if (typeof notification === 'string') {
    notification = JSON.parse(notification);
  }

  /* Don't mutate the original notification */
  notification = { ...notification };

  if (typeof notification.data === 'string') {
    try {
      notification.data = JSON.parse(notification.data);
    } catch (e) {
      // It's actually just a string, that's fine
    }
  }

  _emitter.emit('notification', notification);
}

function _processNotification(notification) {
  notification = Object.assign({}, notification);

  if (!notification.data) {
    notification.data = {};
  }

  if (notification.hasOwnProperty('count')) {
    delete notification.count;
  }

  // Delete any Android properties on iOS and merge the iOS properties on root notification object
  if (Platform.OS === 'ios') {
    if (notification.android) {
      delete notification.android;
    }

    if (notification.ios) {
      notification = Object.assign(notification, notification.ios);
      delete notification.ios;
    }
  }

  // Delete any iOS properties on Android and merge the Android properties on root notification
  // object
  if (Platform.OS === 'android') {
    if (notification.ios) {
      delete notification.ios;
    }

    if (notification.android) {
      notification = Object.assign(notification, notification.android);
      delete notification.android;
    }
  }

  return notification;
}

function _validateNotification(notification) {
  if (Platform.OS === 'ios') {
    invariant(
      !!notification.title && !!notification.body,
      'Local notifications on iOS require both a title and a body'
    );
  } else if (Platform.OS === 'android') {
    invariant(!!notification.title, 'Local notifications on Android require a title');
  }
}

export default {
  /* Only used internally to initialize the notification from top level props */
  _setInitialNotification(notification: Notification) {
    _initialNotification = notification;
  },

  /* Re-export */
  getExpoPushTokenAsync(): Promise<string> {
    return ExponentNotifications.getExponentPushTokenAsync();
  },

  /* Re-export, we can add flow here if we want as well */
  getDevicePushTokenAsync: ExponentNotifications.getDevicePushTokenAsync,

  /* Shows a notification instantly */
  presentLocalNotificationAsync(notification: LocalNotification): Promise<LocalNotificationId> {
    _validateNotification(notification);
    notification = _processNotification(notification);

    return ExponentNotifications.presentLocalNotification(notification);
  },

  /* Schedule a notification at a later date */
  async scheduleLocalNotificationAsync(
    notification: LocalNotification,
    options: {
      time?: Date | number,
      repeat?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year',
      intervalMs?: number,
    } = {}
  ): Promise<LocalNotificationId> {
    // set now at the beginning of the method, to prevent potential weird warnings when we validate
    // options.time later on
    const now = Date.now();

    // Validate and process the notification data
    _validateNotification(notification);
    notification = _processNotification(notification);

    // Validate `options.time`
    if (options.time) {
      let timeAsDateObj = null;
      if (options.time && typeof options.time === 'number') {
        timeAsDateObj = new Date(options.time);
        // god, JS is the worst
        if (((timeAsDateObj: any): string) === 'Invalid Date') {
          timeAsDateObj = null;
        }
      } else if (options.time && options.time instanceof Date) {
        timeAsDateObj = options.time;
      }

      // If we couldn't convert properly, throw an error
      if (!timeAsDateObj) {
        throw new Error(
          `Provided value for "time" is invalid. Please verify that it's either a number representing Unix Epoch time in milliseconds, or a valid date object.`
        );
      }

      // If someone passes in a value that is too small, say, by an order of 1000 (it's common to
      // accidently pass seconds instead of ms), display a warning.
      warning(
        timeAsDateObj >= now,
        `Provided value for "time" is before the current date. Did you possibly pass number of seconds since Unix Epoch instead of number of milliseconds?`
      );

      // If iOS, pass time as milliseconds
      if (Platform.OS === 'ios') {
        options = {
          ...options,
          time: timeAsDateObj.getTime(),
        };
      } else {
        options = {
          ...options,
          time: timeAsDateObj,
        };
      }
    }

    if (options.intervalMs != null && options.repeat != null) {
      throw new Error(`Pass either the "repeat" option or "intervalMs" option, not both`);
    }

    // Validate options.repeat
    if (options.repeat != null) {
      const validOptions = new Set(['minute', 'hour', 'day', 'week', 'month', 'year']);
      if (!validOptions.has(options.repeat)) {
        throw new Error(
          `Pass one of ['minute', 'hour', 'day', 'week', 'month', 'year'] as the value for the "repeat" option`
        );
      }
    }

    if (options.intervalMs != null) {
      if (Platform.OS === 'ios') {
        throw new Error(`The "intervalMs" option is not supported on iOS`);
      }

      if (options.intervalMs <= 0 || !Number.isInteger(options.intervalMs)) {
        throw new Error(
          `Pass an integer greater than zero as the value for the "intervalMs" option`
        );
      }
    }

    return ExponentNotifications.scheduleLocalNotification(notification, options);
  },

  /* Dismiss currently shown notification with ID (Android only) */
  async dismissNotificationAsync(notificationId: LocalNotificationId): Promise<void> {
    if (Platform.OS === 'android') {
      return ExponentNotifications.dismissNotification(notificationId);
    } else {
      throw new Error('Dismissing notifications is not supported on iOS');
    }
  },

  /* Dismiss all currently shown notifications (Android only) */
  async dismissAllNotificationsAsync(): Promise<void> {
    if (Platform.OS === 'android') {
      return ExponentNotifications.dismissAllNotifications();
    } else {
      throw new Error('Dismissing notifications is not supported on iOS');
    }
  },

  /* Cancel scheduled notification notification with ID */
  cancelScheduledNotificationAsync(notificationId: LocalNotificationId): Promise<void> {
    return ExponentNotifications.cancelScheduledNotification(notificationId);
  },

  /* Cancel all scheduled notifications */
  cancelAllScheduledNotificationsAsync(): Promise<void> {
    return ExponentNotifications.cancelAllScheduledNotifications();
  },

  /* Primary public api */
  addListener(listener: Function): EventSubscription {
    _maybeInitEmitter();

    if (_initialNotification) {
      const initialNotification = _initialNotification;
      _initialNotification = null;
      setTimeout(() => {
        _emitNotification(initialNotification);
      }, 0);
    }

    return _emitter.addListener('notification', listener);
  },

  async getBadgeNumberAsync(): Promise<number> {
    if (!ExponentNotifications.getBadgeNumberAsync) {
      return 0;
    }
    return ExponentNotifications.getBadgeNumberAsync();
  },

  async setBadgeNumberAsync(number: number): Promise<void> {
    if (!ExponentNotifications.setBadgeNumberAsync) {
      return;
    }
    return ExponentNotifications.setBadgeNumberAsync(number);
  },
};
