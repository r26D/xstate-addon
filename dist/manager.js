'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.register = register;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ = require('./');

var _style = require('./cyto/style');

var _style2 = _interopRequireDefault(_style);

var _cyto = require('./cyto');

var _statechart = require('./graphBuilder/statechart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  cy: {
    height: '100%',
    width: '100%'
  }
};

var Action = function Action(_ref) {
  var value = _ref.value;

  if (!value || value.length === 0) {
    return null;
  }
  console.log("Action has", value);
  return _react2.default.createElement(
    'span',
    null,
    ' calls ',
    value.join(",")
  );
};
var ActionDetails = function ActionDetails(_ref2) {
  var actionDetails = _ref2.actionDetails;

  if (!actionDetails) {
    return null;
  }
  console.log("ActionDetails", actionDetails);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h3',
      null,
      'Action Details'
    ),
    actionDetails.actions.map(function (event) {
      return _react2.default.createElement(
        'div',
        null,
        event.label,
        _react2.default.createElement(Action, { value: event.actions }),
        _react2.default.createElement('br', null)
      );
    })
  );
};

var XStateGraph = function (_React$Component) {
  _inherits(XStateGraph, _React$Component);

  function XStateGraph() {
    var _ref3;

    _classCallCheck(this, XStateGraph);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref3 = XStateGraph.__proto__ || Object.getPrototypeOf(XStateGraph)).call.apply(_ref3, [this].concat(args)));

    _this.buildGraph = _this.buildGraph.bind(_this);
    _this.resizeGraph = _this.resizeGraph.bind(_this);
    _this.onDetails = _this.onDetails.bind(_this);
    _this.curMachine = '';

    return _this;
  }

  _createClass(XStateGraph, [{
    key: 'onDetails',
    value: function onDetails(evt, details) {
      console.log("Details!", evt, details);
    }
  }, {
    key: 'resizeGraph',
    value: function resizeGraph() {
      if (this.graph) this.graph.resize();
    }
  }, {
    key: 'buildGraph',
    value: function buildGraph(_ref4) {
      var _this2 = this;

      var machine = _ref4.machine,
          currentState = _ref4.currentState;

      if (machine && currentState) {
        if (this.curMachine !== machine.id) {
          this.curMachine = machine.id;
          this.graph = (0, _cyto.render)(this.cNode, (0, _statechart.build)(machine.states, machine.initial, null, currentState), function (event) {
            var channel = _this2.props.channel;

            channel.emit('xstate/transition', event);
          }, function (event, data) {
            var channel = _this2.props.channel;

            console.log("Emmitting for ", event, data, channel);
            channel.emit('xstate/details', event, data);
          });
        } else {
          this.graph.setState(currentState);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.resizeGraph();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          channel = _props.channel,
          api = _props.api;

      console.log("Laoding up");
      channel.on('xstate/buildGraph', this.buildGraph);
      channel.on('xstate/resize', this.resizeGraph);
      channel.on('xstate/details', this.onDetails);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
      var _props2 = this.props,
          channel = _props2.channel,
          api = _props2.api;

      channel.removeListener('xstate/buildGraph', this.buildGraph);
      channel.removeListener('xstate/resize', this.resizeGraph);
      channel.removeListener('xstate/details', this.onDetails);
      this.graph.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { style: { height: "100%", width: "100%" } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Hello'
          )
        ),
        _react2.default.createElement('div', { style: styles.cy, id: 'cy', ref: function ref(el) {
            return _this3.cNode = el;
          } })
      );
    }
  }]);

  return XStateGraph;
}(_react2.default.Component);

function register() {
  _addons2.default.register(_.ADDON_ID, function (api) {
    var channel = _addons2.default.getChannel();
    _addons2.default.addPanel(_.PANEL_ID, {
      title: 'XState Graph',
      render: function render() {
        return _react2.default.createElement(XStateGraph, { channel: channel, api: api });
      }
    });
  });
}