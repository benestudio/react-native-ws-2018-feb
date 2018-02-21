'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// print a nicely formatted message with setup information
var printServerInfo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var settings, address;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _xdl.ProjectSettings.readPackagerInfoAsync(process.cwd());

          case 2:
            settings = _context.sent;
            _context.next = 5;
            return _xdl.UrlUtils.constructManifestUrlAsync(process.cwd());

          case 5:
            address = _context.sent;

            _qrcodeTerminal2.default.generate(address, function (qrCode) {
              (0, _log2.default)('To view your app with live reloading, point the Expo app to this QR code.\nYou\'ll find the QR scanner on the Projects tab of the app.\n\n' + (0, _indentString2.default)(qrCode, 2) + '\n\nOr enter this address in the Expo app\'s search bar:\n\n  ' + _chalk2.default.underline(_chalk2.default.cyan(address)) + '\n\nYour phone will need to be on the same local network as this computer.\nFor links to install the Expo app, please visit ' + _chalk2.default.underline(_chalk2.default.cyan('https://expo.io')) + '.\n\nLogs from serving your app will appear here. Press Ctrl+C at any time to stop.');
              printUsage();
            });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function printServerInfo() {
    return _ref.apply(this, arguments);
  };
}();

var handleKeypress = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key) {
    var _ref3, success, error, localAddress, _ref4, _success, msg, reset;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = key;
            _context2.next = _context2.t0 === CTRL_C ? 3 : _context2.t0 === CTRL_D ? 3 : _context2.t0 === 'a' ? 5 : _context2.t0 === 'i' ? 15 : _context2.t0 === 'q' ? 28 : _context2.t0 === 'r' ? 32 : _context2.t0 === 'R' ? 32 : _context2.t0 === 'd' ? 38 : 45;
            break;

          case 3:
            process.emit('SIGINT');
            return _context2.abrupt('return');

          case 5:
            (0, _clearConsole2.default)();
            _log2.default.withTimestamp('Starting Android...');
            _context2.next = 9;
            return _xdl.Android.openProjectAsync(process.cwd());

          case 9:
            _ref3 = _context2.sent;
            success = _ref3.success;
            error = _ref3.error;

            if (!success) {
              (0, _log2.default)(_chalk2.default.red(error.message));
            }
            printUsage();
            return _context2.abrupt('return');

          case 15:
            (0, _clearConsole2.default)();
            _log2.default.withTimestamp('Starting iOS...');
            _context2.next = 19;
            return _xdl.UrlUtils.constructManifestUrlAsync(process.cwd(), {
              hostType: 'localhost'
            });

          case 19:
            localAddress = _context2.sent;
            _context2.next = 22;
            return _xdl.Simulator.openUrlInSimulatorSafeAsync(localAddress);

          case 22:
            _ref4 = _context2.sent;
            _success = _ref4.success;
            msg = _ref4.msg;

            if (!_success) {
              (0, _log2.default)(_chalk2.default.red(msg));
            }
            printUsage();
            return _context2.abrupt('return');

          case 28:
            (0, _clearConsole2.default)();
            _context2.next = 31;
            return printServerInfo();

          case 31:
            return _context2.abrupt('return');

          case 32:
            (0, _clearConsole2.default)();
            reset = key === 'R';

            if (reset) {
              _log2.default.withTimestamp('Asking packager to reset its cache...');
            }
            _log2.default.withTimestamp('Restarting packager...');
            _xdl.Project.startAsync(process.cwd(), { reset: reset });
            return _context2.abrupt('return');

          case 38:
            (0, _clearConsole2.default)();
            dev = !dev;
            _context2.next = 42;
            return _xdl.ProjectSettings.setAsync(process.cwd(), { dev: dev });

          case 42:
            (0, _log2.default)('Packager now running in ' + _chalk2.default.bold(dev ? 'development' : 'production') + _chalk2.default.reset(' mode.') + '\n\nPlease close and reopen the project in the Expo app for the\nchange to take effect.');
            printUsage();
            return _context2.abrupt('return');

          case 45:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function handleKeypress(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _xdl = require('xdl');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _indentString = require('indent-string');

var _indentString2 = _interopRequireDefault(_indentString);

var _qrcodeTerminal = require('qrcode-terminal');

var _qrcodeTerminal2 = _interopRequireDefault(_qrcodeTerminal);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _log = require('../util/log');

var _log2 = _interopRequireDefault(_log);

var _clearConsole = require('../util/clearConsole');

var _clearConsole2 = _interopRequireDefault(_clearConsole);

var _packager = require('../util/packager');

var _packager2 = _interopRequireDefault(_packager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_xdl.Config.validation.reactNativeVersionWarnings = false;
_xdl.Config.developerTool = 'crna';
_xdl.Config.offline = true;

var args = (0, _minimist2.default)(process.argv.slice(2), {
  boolean: ['reset-cache', 'interactive'],
  default: { interactive: true }
});
var dev = true;

var options = {};
if (args['reset-cache']) {
  options.reset = true;
  (0, _log2.default)('Asking packager to reset its cache...');
}

var isInteractive = false;
var _process = process,
    stdin = _process.stdin;

if (args.interactive && typeof stdin.setRawMode === 'function') {
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', handleKeypress);
  isInteractive = true;
}

_packager2.default.run(onReady, options, isInteractive);

function onReady() {
  (0, _log2.default)(_chalk2.default.green('Packager started!\n'));
  printServerInfo();
}

function printUsage() {
  if (!isInteractive) {
    return;
  }
  var dim = _chalk2.default.dim,
      bold = _chalk2.default.bold;

  var devMode = dev ? 'development' : 'production';
  var iosInfo = process.platform === 'win32' ? dim('.') : dim(', or') + ' i ' + dim('to open iOS emulator.');
  (0, _log2.default)('\n ' + dim('\u203A Press') + ' a ' + dim('to open Android device or emulator') + iosInfo + '\n ' + dim('\u203A Press') + ' q ' + dim('to display QR code.') + '\n ' + dim('\u203A Press') + ' r ' + dim('to restart packager, or') + ' R ' + dim('to restart packager and clear cache.') + '\n ' + dim('\u203A Press') + ' d ' + dim('to toggle development mode. (current mode: ' + bold(devMode) + _chalk2.default.reset.dim(')')) + '\n');
}

var CTRL_C = '\x03';
var CTRL_D = '\x04';
//# sourceMappingURL=start.js.map