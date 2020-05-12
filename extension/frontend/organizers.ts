import {
  DisplayNode, State,
} from "../backend/interfaces";
const circular = require('circular');

// Check if any value, or nested value, in state matches the value of a prop
export const matchState = (node: DisplayNode, prop: State): boolean => {
  // console.log('state', (JSON.stringify(node.state, circular())));
  // console.log('props', (JSON.stringify(prop.value, circular())));
  // Create a helper function to check every nested value in state
  const recurse = (stateValue: any, propValue: any): boolean => {
    if (typeof stateValue === 'object') {
      // Check that stateValue and propValue are of the same type
      if (typeof propValue === 'object' && Array.isArray(stateValue) === Array.isArray(propValue)) {
        // If the objects have equal values, return true
        if ((JSON.stringify(stateValue, circular()) === (JSON.stringify(propValue, circular())))) return true;
      }
      // Check each value of the object in state
      for (const key in stateValue) {
        // Check if the prop might get its value from an index or key
        if (key == propValue) return true;
        // Check if the prop might get its value from the sub element
        if (recurse(stateValue[key], propValue)) return true;
      }
      // If no checks return true, return false
      return false;
    } else {
      // Return true if the values are equal and false if they are not
      return propValue === stateValue;
    }
  }
  // For each object in our state array
  // Check if our object's value is === to our props value
  return recurse(node.state.value, prop.value);
};