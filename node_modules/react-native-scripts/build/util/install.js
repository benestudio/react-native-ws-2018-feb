'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _log = require('../util/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(appPath, packageName, packageVersion) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var useYarn, command, args, pkg, npmOrYarn, spawnOpts, proc;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _pathExists2.default)(_path2.default.join(appPath, 'yarn.lock'));

          case 2:
            useYarn = _context.sent;
            command = '';
            args = [];


            if (useYarn) {
              command = 'yarnpkg';
              if (packageName) {
                args = ['add'];
              }
            } else {
              command = 'npm';
              args = ['install', '--save'];

              // if (verbose) {
              //   args.push('--verbose');
              // }
            }

            pkg = packageName;

            if (pkg) {
              if (packageVersion) {
                pkg = pkg + '@' + packageVersion;
              }

              args.push(pkg);
            }

            npmOrYarn = useYarn ? 'yarn' : 'npm';

            (0, _log2.default)('Installing ' + (pkg ? pkg : 'dependencies') + ' using ' + npmOrYarn + '...');
            (0, _log2.default)();

            spawnOpts = {};

            if (options.silent) {
              spawnOpts.silent = true;
            } else {
              spawnOpts.stdio = 'inherit';
            }

            proc = (0, _crossSpawn2.default)(command, args, spawnOpts);
            return _context.abrupt('return', new _promise2.default(function (resolve) {
              proc.on('close', function (code) {
                return resolve({ code: code, command: command, args: args });
              });
            }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function install(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return install;
}();

module.exports = exports['default'];
//# sourceMappingURL=install.js.map