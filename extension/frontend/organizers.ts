import {
  DisplayNode, State,
} from "../backend/interfaces";
const circular = require('circular');

// Add a weight to a state node based on how closely it matches the value of a prop
export const matchState = (node: DisplayNode, prop: State): void => {
  // console.log('state', (JSON.stringify(node.state, circular())));
  // console.log('props', (JSON.stringify(prop.value, circular())));
  // Create a helper function to check every nested value in state
  const recurse = (stateValue: any, propValue: any): void => {
    if (typeof stateValue === 'object') {
      // Check that stateValue and propValue are of the same type
      if (typeof propValue === 'object' && Array.isArray(stateValue) === Array.isArray(propValue)) {
        // If the objects have equal values, return true
        if ((JSON.stringify(stateValue, circular()) === (JSON.stringify(propValue, circular())))) {
          node.displayWeight = Math.max(node.displayWeight, 1);
        }
      }
      // Check each value of the object in state
      for (const key in stateValue) {
        // Check if the prop might get its value from an index or key
        if (key == propValue) node.displayWeight = Math.max(node.displayWeight, 0.5);
        // Check if the prop might get its value from the sub element
        recurse(stateValue[key], propValue);
      }
    } else {
      // Return true if the values are equal and false if they are not
      if (propValue === stateValue) node.displayWeight = Math.max(node.displayWeight, 1);
    }
  }
  // For each object in our state array
  // Check if our object's value is === to our props value
  recurse(node.state.value, prop.value);
  // Check if the node has medium nodes between it and the target or last stateful component
  if (!node.mediums) return;
  iterateMediums(node);
};


// Iterate through the mediums of the stateful component
const iterateMediums = (node: DisplayNode): void => {
    for (const medium of node.mediums) {
    medium.displayWeight = node.displayWeight;
  }
};