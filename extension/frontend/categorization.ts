import {
  DisplayNode, State,
} from '../backend/interfaces';

export const findHighestState = (node: DisplayNode, prop: State) => {
  // Create an array of stateful components
  const statefulComps = [];
  // Create a helper recursive function
  const helper = (node: DisplayNode) => {
    // Check if a node has state
    if (node.state && node.state.length > 0) {
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
    // Return stateful component
    return comp;
  }
  // Return null if no stateful component contains the value
  return null;
};