const R = require('ramda');
import { createNode, createEdge, createId } from './utils';

export const build = (
  states,
  initial,
  parent = '',
  currentState,
  initialSet = false
) =>
  R.flatten(
    R.reduce(
      (acc, stateKey) => {
        const state = states[stateKey];
        const childNodes = R.has('states', state)
          ? build(state.states, state.initial, stateKey, currentState, false)
          : [];
         
        const edges = R.map(
       
          edgeKey => {
            console.log("EdgeKey is", edgeKey, state.on[edgeKey]);
            let target;
            let eventData;
            if (typeof state.on[edgeKey] === "string") {
              target = state.on[edgeKey];
              eventData = { label: edgeKey, actions: [] }
            
            }
            else {
              target = Object.keys(state.on[edgeKey])[0]
              eventData = { label: edgeKey + "*", actions: state.on[edgeKey][target]["actions"] }
            }
           
            return(createEdge({
              id: createId(stateKey, edgeKey),
              source: state.relativeId,
              key: edgeKey,
              parent,
              target: createId(parent, target),
              label: eventData.label,
              actions:  eventData.actions
            
            }));
          }
            ,
          R.keysIn(state.on)
        );
        const node = createNode({
          key: stateKey,
          id: state.relativeId,
          parent,
          selected: state.relativeId === currentState ? true : false,
          hasChildren: childNodes.length ? true : false
        });
        if (!initialSet) {
          const initialNode = createNode({
            id: createId(parent, 'initial'),
            isInitial: true,
            parent
          });
          const initialEdge = createEdge({
            id: createId(parent, 'initial.edge'),
            source: initialNode.data.id,
            target: createId(parent, initial),
            isInitial: true,
            parent
          });
          initialSet = true;
          acc = [initialNode, initialEdge, ...acc];
        }
        acc = [node, ...edges, ...childNodes, ...acc];
        return acc;
      },
      [],
      R.keysIn(states)
    )
  );
