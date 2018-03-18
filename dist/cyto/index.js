'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _cytoscape = require('cytoscape');

var _cytoscape2 = _interopRequireDefault(_cytoscape);

var _cytoscapeCoseBilkent = require('cytoscape-cose-bilkent');

var _cytoscapeCoseBilkent2 = _interopRequireDefault(_cytoscapeCoseBilkent);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cytoscape2.default.use(_cytoscapeCoseBilkent2.default);
var cy = void 0;
var render = exports.render = function render(domElement, graph, onEventClicked, onEventHovered) {
  if (cy) {
    cy.remove();
  }
  cy = (0, _cytoscape2.default)({
    container: domElement,
    layout: _layout2.default,
    elements: graph,
    style: _style2.default
  });
  cy.on('tap', function (evt) {
    var target = evt.target;
    console.log("Clicked on", target.data ? target.data() : target, target.group && target.group());
    if (target.group && target.group() === 'edges') {
      onEventClicked(target.data('key'));
    }
  });
  cy.on('mouseover', function (evt) {
    var target = evt.target;

    if (target.group && target.group() === 'edges' && onEventHovered) {
      console.log("Hoverged on", target.data ? target.data() : target, target.group && target.group(), onEventHovered);
      onEventHovered(target.data('key'), target.data());
    }
  });

  var resetSelected = function resetSelected() {
    var curEles = cy.filter(function (ele, i) {
      return ele.data('selected');
    });
    curEles.forEach(function (element) {
      element.data('selected', false);
      element.style('border-color', 'black');
    });
  };
  var setAsSelected = function setAsSelected(id) {
    var nextEl = cy.getElementById(id);
    nextEl.style('border-color', 'red');
    nextEl.data('selected', true);
  };
  return {
    setState: function setState(next) {
      resetSelected();
      if (typeof next === 'string') {
        setAsSelected(next);
      } else {
        var nextEles = Object.keys(next);
        nextEles.forEach(function (key) {
          setAsSelected(key);
          setAsSelected(key + '.' + next[key]);
        });
      }
    },
    resize: function resize() {
      cy.resize();
      cy.fit();
    },
    remove: function remove() {
      cy.remove();
    }
  };
};