import {
  DisplayNode, State,
} from '../backend/interfaces';

export const findHighestState = (node: DisplayNode, prop: State, callback: Function) => {
  // Create an array of stateful components
  const statefulComps: DisplayNode[] = [];
  // Crete an array of components between the target node and a stateful node
  let mediums = [node];
  // Create a helper recursive function
  const helper = (node: DisplayNode) => {
    // Check if a node has state
    if (node.state && node.state.value) {
      // Add the mediums to the stateful node's mediums property
      node.mediums = [...mediums];
      // Clear the mediums array
      mediums = [];
      // Push node into stateful array
      statefulComps.push(node);
      // If the node is not stateful, add it to the mediums array
    } else mediums.push(node);
    // Return if parent node is null
    if (!node.parent) return;
    // Recursively call function on the parent of the current node
    helper(node.parent);
  }
  // Call this function on the target node's parent
  helper(node.parent);
  // Create a variable to store the top level stateful node that matches the prop
  let topNode = null
  // Check each stateful component for the value in prop
  for (const comp of statefulComps) {
    /* ------------------- Under Construction ------------------- */
    // Run the callback function on each component
    callback(comp, prop);
    if (!topNode && comp.displayWeight > 0) topNode = comp;
  }
  // Return null if no stateful component contains the value
  return topNode;
};

export const traverseData = (node: DisplayNode, prop: State, callback: Function) => {
  if (!node.children) return;
  // Look at top level stateful component
  for (const el of node.children) {
    // Apply callback function to each child
    callback(el, prop);
    traverseData(el, prop, callback);
  }
};