import {
  DisplayNode, State,
} from '../backend/interfaces';

export const findHighestState = (node: DisplayNode, prop: State, callback: Function) => {
  // Create an array of stateful components
  const statefulComps = [];
  // Create a helper recursive function
  const helper = (node: DisplayNode) => {
    // Check if a node has state
    if (node.state && node.state.value) {
      // Push node into stateful array
      statefulComps.push(node);
    }
    // Return if parent node is null
    if (!node.parent) return;
    // Recursively call function on the parent of the current node
    helper(node.parent);
  }
  // Call this function on the target node's parent
  helper(node.parent);
  // Check each stateful component for the value in prop
  for (const comp of statefulComps) {
    /* ------------------- Under Construction ------------------- */
    // Run the callback function on each component
    callback(comp, prop);
  }
  // Return null if no stateful component contains the value
  return null;
};

export const traverseData = (node: DisplayNode, prop: State, callback: Function) => {
  // Look at top level stateful component
  for (const el of node.children) {
    // Apply callback function to each child
    callback(el, prop);
    traverseData(el, prop, callback);
  }
};