import React from 'react';
import addons from '@storybook/addons';
import style from './cyto/style';

import { render } from './cyto';
import { build } from './graphBuilder/statechart';
console.log("I got loaded!");
const val = {
	name: "tome",
		register: function() {
			console.log("Register?");
		}
}
export default val;

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
