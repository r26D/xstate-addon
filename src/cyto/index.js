import c from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

import layout from './layout';
import style from './style';

c.use(coseBilkent);
let cy;
export const render = (domElement, graph, onEventClicked, onEventHovered) => {
  if (cy) {
    cy.remove();
  }
  cy = c({
    container: domElement,
    layout,
    elements: graph,
    style
  });
  cy.on('tap', evt => {
    const target = evt.target;
    console.log("Clicked on", target.data ? target.data() : target, target.group &&target.group())
     if (target.group && target.group() === 'edges') {
     onEventClicked(target.data('key'));
    }
  });
  cy.on('mouseover', evt => {
     const target = evt.target;
     
    if (target.group && target.group() === 'edges' && onEventHovered) {
      console.log("Hoverged on", target.data ? target.data() : target, target.group &&target.group(), onEventHovered)
       onEventHovered(target.data('key'), target.data());
    }
  });

  const resetSelected = () => {
    const curEles = cy.filter((ele, i) => ele.data('selected'));
    curEles.forEach(element => {
      element.data('selected', false);
      element.style('border-color', 'black');
    });
  };
  const setAsSelected = id => {
    const nextEl = cy.getElementById(id);
    nextEl.style('border-color', 'red');
    nextEl.data('selected', true);
  };
  return {
    setState(next) {
      resetSelected();
      if (typeof next === 'string') {
        setAsSelected(next);
      } else {
        const nextEles = Object.keys(next);
        nextEles.forEach(key => {
          setAsSelected(key);
          setAsSelected(`${key}.${next[key]}`);
        });
      }
    },
    resize() {
      cy.resize();
      cy.fit();
    },
    remove() {
      cy.remove();
    }
  };
};
