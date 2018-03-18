'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _style = require('./cyto/style');

var _style2 = _interopRequireDefault(_style);

var _cyto = require('./cyto');

var _statechart = require('./graphBuilder/statechart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("I got loaded!");
var val = {
  name: "tome",
  register: function register() {
    console.log("Register?");
  }
};
exports.default = val;

/*
const styles = {
  cy: {
    height: '100%',
    width: '100%'
  }
};

class XStateGraph extends React.Component {
  constructor(...args) {
    super(...args);
    this.buildGraph = this.buildGraph.bind(this);
    this.resizeGraph = this.resizeGraph.bind(this);
    this.curMachine = '';
  }

  resizeGraph() {
    if (this.graph) this.graph.resize();
  }
  buildGraph({ machine, currentState }) {
    if (machine && currentState) {
      if (this.curMachine !== machine.id) {
        this.curMachine = machine.id;
        this.graph = render(
          this.cNode,
          build(machine.states, machine.initial, null, currentState),
          event => {
            const { channel } = this.props;
            channel.emit('xstate/transition', event);
          }
        );
      } else {
        this.graph.setState(currentState);
      }
    }
  }
  componentDidUpdate() {
    this.resizeGraph();
  }
  componentDidMount() {
    const { channel, api } = this.props;
    channel.on('xstate/buildGraph', this.buildGraph);
    channel.on('xstate/resize', this.resizeGraph);
  }

  componentWillUnmount() {
    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener('xstate/buildGraph', this.buildGraph);
    channel.removeListener('xstate/resize', this.resizeGraph);
    this.graph.remove();
  }

  render() {
    return <div style={styles.cy} id="cy" ref={el => (this.cNode = el)} />;
  }
}

function register() {
	console.log("My register got called?")
addons.register('xstate/machine', api => {
	  const channel = addons.getChannel();
  if (!channel) {
	  console.log("There is somethign wrong with the channel alread!");
  } 
	else {
		console.log("Good channel!",channel)
	}

  addons.addPanel('xstate/machine/graph', {
    title: 'xstate',
    render: () => <XStateGraph channel={channel} api={api} />
  });
});
}
console.log("I've been loaded right",addons, register)

export default {
	register: () => {
		console.log("Trying to regiers");
	}
}
*/