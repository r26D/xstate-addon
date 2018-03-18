import React from 'react';
import addons from '@storybook/addons';

import { ADDON_ID, PANEL_ID } from './';

import style from './cyto/style';

import { render } from './cyto';
import { build } from './graphBuilder/statechart';



const styles = {
  cy: {
    height: '100%',
    width: '100%'
  }
};

const Action = ({value}) =>{
  if (!value || value.length === 0 ) {
    return(null);
  }

  return(<span> calls {value.join(",")}</span>)
}
const ActionDetails = ({ actionDetails }) => {
  if (!actionDetails) {
    return(null)
  }

  return(<div>
      <h3>Action Details</h3>
      {actionDetails.actions.map((event) => (
        <div>
          {event.label}<Action value={event.actions}/>
          <br/>
          </div>
          
      ))}
      </div>)
};

class XStateGraph extends React.Component {
  constructor(...args) {
    super(...args);
    this.buildGraph = this.buildGraph.bind(this);
    this.resizeGraph = this.resizeGraph.bind(this);
    this.onDetails = this.onDetails.bind(this);
    this.curMachine = '';
   
  }

 
  onDetails(evt, details) {
  //  console.log("Details!",evt,details)
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
          },
          (event,data) => {
            const { channel } = this.props;
          
            channel.emit('xstate/details',event,data);
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
    channel.on('xstate/details', this.onDetails);
  }

  componentWillUnmount() {
    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener('xstate/buildGraph', this.buildGraph);
    channel.removeListener('xstate/resize', this.resizeGraph);
    channel.removeListener('xstate/details', this.onDetails);
    this.graph.remove();
  }

  render() {
    return <div style={{ height: "100%", width: "100%"}}>
      <div><h1>Hello</h1></div>
      <div style={styles.cy} id="cy" ref={el => (this.cNode = el)} />
      </div>;
  }
}

export function register() {
  addons.register(ADDON_ID, (api) => {
    const channel = addons.getChannel();
    addons.addPanel(PANEL_ID, {
      title: 'XState Graph',
      render: () => <XStateGraph channel={channel} api={api} />,
    });
  });
}
