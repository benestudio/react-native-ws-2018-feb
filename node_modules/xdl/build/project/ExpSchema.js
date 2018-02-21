'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetSchemasAsync = exports.getSchemaAsync = exports.validatorFromProjectRoot = undefined;

let validatorFromProjectRoot = exports.validatorFromProjectRoot = (() => {
  var _ref = _asyncToGenerator(function* (projectRoot) {
    const { exp } = yield (_ProjectUtils || _load_ProjectUtils()).readConfigJsonAsync(projectRoot);
    if (!exp) throw new Error(`Couldn't read local manifest`);
    const schema = yield getSchemaAsync(exp.sdkVersion);
    const validator = new (_schemer || _load_schemer()).default(schema);
    return validator;
  });

  return function validatorFromProjectRoot(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getSchemaAsync = exports.getSchemaAsync = (() => {
  var _ref2 = _asyncToGenerator(function* (sdkVersion) {
    let json = yield _getSchemaJSONAsync(sdkVersion);
    return json.schema;
  });

  return function getSchemaAsync(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

// Array of schema nodes that refer to assets along with their field
// path (eg. 'notification.icon')


let getAssetSchemasAsync = exports.getAssetSchemasAsync = (() => {
  var _ref3 = _asyncToGenerator(function* (sdkVersion) {
    const schema = yield getSchemaAsync(sdkVersion);
    const assetSchemas = [];
    const visit = function (node, fieldPath) {
      if (node.meta && node.meta.asset) {
        assetSchemas.push({ schema: node, fieldPath });
      }
      const properties = node.properties;
      if (properties) {
        Object.keys(properties).forEach(function (property) {
          return visit(properties[property], `${fieldPath}${fieldPath.length > 0 ? '.' : ''}${property}`);
        });
      }
    };
    visit(schema, '');
    return assetSchemas;
  });

  return function getAssetSchemasAsync(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

let _getSchemaJSONAsync = (() => {
  var _ref4 = _asyncToGenerator(function* (sdkVersion) {
    if (process.env.LOCAL_XDL_SCHEMA) {
      if (process.env.EXPONENT_UNIVERSE_DIR) {
        return JSON.parse(_fs.default.readFileSync(_path.default.join(process.env.EXPONENT_UNIVERSE_DIR, 'server', 'www', 'xdl-schemas', 'UNVERSIONED-schema.json')).toString());
      } else {
        throw new Error(`LOCAL_XDL_SCHEMA is set but EXPONENT_UNIVERSE_DIR is not.`);
      }
    }

    if (!_xdlSchemaJson[sdkVersion]) {
      try {
        _xdlSchemaJson[sdkVersion] = yield (_Api || _load_Api()).default.xdlSchemaAsync(sdkVersion);
      } catch (e) {
        if (e.code && e.code === (_ErrorCode || _load_ErrorCode()).default.INVALID_JSON) {
          throw new Error(`Couldn't read schema from server`);
        } else {
          throw e;
        }
      }
    }

    return _xdlSchemaJson[sdkVersion];
  });

  return function _getSchemaJSONAsync(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _Api;

function _load_Api() {
  return _Api = _interopRequireDefault(require('../Api'));
}

var _ErrorCode;

function _load_ErrorCode() {
  return _ErrorCode = _interopRequireDefault(require('../ErrorCode'));
}

var _ProjectUtils;

function _load_ProjectUtils() {
  return _ProjectUtils = _interopRequireWildcard(require('./ProjectUtils'));
}

var _schemer;

function _load_schemer() {
  return _schemer = _interopRequireDefault(require('@expo/schemer'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let _xdlSchemaJson = {};
//# sourceMappingURL=../__sourcemaps__/project/ExpSchema.js.map
