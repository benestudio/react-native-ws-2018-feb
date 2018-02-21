'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let update = exports.update = (() => {
  var _ref = _asyncToGenerator(function* (user) {
    try {
      if (_isWindowDefined()) {
        let deviceInfo = {};

        try {
          deviceInfo = yield (_Diagnostics || _load_Diagnostics()).getDeviceInfoAsync({
            limitLengthForIntercom: true
          });
        } catch (e) {
          console.error(e);
        }

        // Fetch intercomUserHash from www in order to make sure it's
        // always fresh and generated from the correct Intercom secret.
        const username = user ? user.username : null;
        let intercomUserHash = null;
        if (user) {
          const api = (_ApiV || _load_ApiV()).default.clientForUser(user);
          ({ intercomUserHash } = yield api.getAsync('auth/intercomUserHash'));
        }

        let data = _extends({
          app_id: 'beew3st8',
          user_id: username,
          user_hash: intercomUserHash
        }, deviceInfo);

        if (_version) {
          data = _extends({}, data, {
            version: _version
          });
        }

        if (_isBooted) {
          if (username) {
            // Call update so that any conversations carry over from the logged out to
            // the logged in user.
            window.Intercom('update', data);
          } else {
            // Was logged in and is now logging out, restart intercom.
            window.Intercom('shutdown');
            window.Intercom('boot', data);
          }
        } else {
          window.Intercom('boot', data);
          _isBooted = true;
        }
        window.IntercomUpdateStyle();
      }
    } catch (e) {
      console.error(e);
    }
  });

  return function update(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.trackEvent = trackEvent;
exports.showNewMessage = showNewMessage;
exports.setVersionName = setVersionName;

var _ApiV;

function _load_ApiV() {
  return _ApiV = _interopRequireDefault(require('./ApiV2'));
}

var _Diagnostics;

function _load_Diagnostics() {
  return _Diagnostics = _interopRequireWildcard(require('./Diagnostics'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let _version;
let _isBooted = false;

function _isWindowDefined() {
  return typeof window !== 'undefined' && window && window.Intercom;
}

function trackEvent(name, metadata) {
  try {
    if (_isWindowDefined()) {
      window.Intercom('trackEvent', name, metadata);
    }
  } catch (e) {
    console.error(e);
  }
}

function showNewMessage(message) {
  try {
    if (_isWindowDefined()) {
      window.Intercom('showNewMessage', message);
    }
  } catch (e) {
    console.error(e);
  }
}

function setVersionName(name) {
  _version = name;
}
//# sourceMappingURL=__sourcemaps__/Intercom.js.map
