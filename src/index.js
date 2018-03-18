import React from 'react';
import addons from '@storybook/addons';
import debounce from 'lodash.debounce';

export const ADDON_ID = 'xstate/machine';
export const PANEL_ID = `${ADDON_ID}/graph`;
//export const EVENT_ID = `${ADDON_ID}/action-event`;

export class WithXStateGraph extends React.Component {
  constructor(props) {
    super(props);

    const channel = addons.getChannel();

   // this.onTransition = this.onTransition.bind(this);
   // this.onDetails = this.onDetails.bind(this);
    
    this.resizeEmitter = debounce(evt => {
      if (evt.key === 'panelSizes') {
        channel.emit('xstate/resize');
      }
    }, 100);
    

    channel.on('xstate/transition', this.onTransition);
    channel.on('xstate/details', this.onDetails);
  
    window.addEventListener('storage', this.resizeEmitter, false);
  }

  onTransition(nextState) {
    console.log("Triggering the transaction?", this.props)
    this.props.onTransition(nextState);
  }
  onDetails(evt,onDetails) {
    console.log("Triggering the details?", this.props)
    this.props.onDetails(evt, details);
  }
  componentWillUnmount() {
    const channel = addons.getChannel();
    window.removeEventListener('storage', this.resizeEmitter, false);
    channel.removeListener('xstate/transition', this.onTransition);
    channel.removeListener('xstate/details', this.onDetails);
  }
  render() {
    const { children, machine, currentState } = this.props;
    const channel = addons.getChannel();
    channel.emit('xstate/buildGraph', { machine, currentState });
    return children;
  }
}
