'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _es6Error;

function _load_es6Error() {
  return _es6Error = _interopRequireDefault(require('es6-error'));
}

var _Analytics;

function _load_Analytics() {
  return _Analytics = _interopRequireWildcard(require('./Analytics'));
}

var _Intercom;

function _load_Intercom() {
  return _Intercom = _interopRequireWildcard(require('./Intercom'));
}

var _Sentry;

function _load_Sentry() {
  return _Sentry = _interopRequireWildcard(require('./Sentry'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ERROR_PREFIX = 'Error: ';

class XDLError extends (_es6Error || _load_es6Error()).default {

  constructor(code, message, options = { noTrack: false }) {
    // If e.toString() was called to get `message` we don't want it to look
    // like "Error: Error:".
    if (message.startsWith(ERROR_PREFIX)) {
      message = message.substring(ERROR_PREFIX.length);
    }

    super(message);

    this.code = code;
    this.isXDLError = true;

    if (options && !options.noTrack) {
      // temporarily remove sentry until we can trim events
      // send error to Sentry
      // Sentry.logError(message, {
      //   tags: { code, type: 'XDL Error' },
      // });

      (_Intercom || _load_Intercom()).trackEvent('error', {
        code,
        message
      });
    }
  }
}
exports.default = XDLError;
//# sourceMappingURL=__sourcemaps__/XDLError.js.map
