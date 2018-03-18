'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithXStateGraph = exports.PANEL_ID = exports.ADDON_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ADDON_ID = exports.ADDON_ID = 'xstate/machine';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/graph';
//export const EVENT_ID = `${ADDON_ID}/action-event`;

var WithXStateGraph = exports.WithXStateGraph = function (_React$Component) {
  _inherits(WithXStateGraph, _React$Component);

  function WithXStateGraph(props) {
    _classCallCheck(this, WithXStateGraph);

    var _this = _possibleConstructorReturn(this, (WithXStateGraph.__proto__ || Object.getPrototypeOf(WithXStateGraph)).call(this, props));

    console.log("At thius pooint ", _addons2.default);
    var channel = _addons2.default.getChannel();
    console.log("Going to use channel", channel);

    _this.onTransition = _this.onTransition.bind(_this);
    _this.resizeEmitter = (0, _lodash2.default)(function (evt) {
      if (evt.key === 'panelSizes') {
        channel.emit('xstate/resize');
      }
    }, 100);

    channel.on('xstate/transition', _this.onTransition);
    window.addEventListener('storage', _this.resizeEmitter, false);
    return _this;
  }

  _createClass(WithXStateGraph, [{
    key: 'onTransition',
    value: function onTransition(nextState) {
      this.props.onTransition(nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var channel = _addons2.default.getChannel();
      window.removeEventListener('storage', this.resizeEmitter, false);
      channel.removeListener('xstate/transition', this.onTransition);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          machine = _props.machine,
          currentState = _props.currentState;

      var channel = _addons2.default.getChannel();
      channel.emit('xstate/buildGraph', { machine: machine, currentState: currentState });
      return children;
    }
  }]);

  return WithXStateGraph;
}(_react2.default.Component);