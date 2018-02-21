'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes;

function _load_propTypes() {
  return _propTypes = _interopRequireDefault(require('prop-types'));
}

var _react;

function _load_react() {
  return _react = require('react');
}

var _store;

function _load_store() {
  return _store = require('./store');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class XDLProvider extends (_react || _load_react()).Component {
  getChildContext() {
    return { xdlStore: this.store, xdlStoreSubscription: null };
  }

  constructor(props, context) {
    super(props, context);
    this.store = (0, (_store || _load_store()).getStore)();
  }

  render() {
    return (_react || _load_react()).Children.only(this.props.children);
  }
}

exports.default = XDLProvider;
XDLProvider.childContextTypes = {
  xdlStore: (_propTypes || _load_propTypes()).default.object.isRequired,
  xdlStoreSubscription: (_propTypes || _load_propTypes()).default.object
};
XDLProvider.displayName = 'XDLProvider';
//# sourceMappingURL=../__sourcemaps__/state/XDLProvider.js.map
