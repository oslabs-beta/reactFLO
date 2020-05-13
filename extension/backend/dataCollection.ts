import {
  DisplayNode,
  State,
} from './interfaces';
const circular = require('circular');


class SimpleNode implements DisplayNode {
  id: number;
  displayName: string;
  displayWeight: number = 0;
  tag: number;
  type: any;
  props: State[] | null = [];
  state: State | null = null;
  children: DisplayNode[] = [];
  parent: DisplayNode | null = null;
  mediums: DisplayNode[] = null;
  constructor(node: any, parent: DisplayNode | null) {
    this.id = node._debugID;
    this.tag = node.tag;
    this.type = node.type;
    this.state = convertState(node);
    this.props = convertProps(node);
    this.parent = parent;
  }
}

// STATE
// Check for hooks
// If memoizedState.memoizedState && _debugHookTypes = ['useState']
// Extract state labels from elementType - Need to convert function to string and extract

// Check for component state
// Check if tag === 1
// If so, memoizedState will be an object of key/value pairs of component state

const convertState = (node): State => {
  if (!node.memoizedState) return null;
  return {
    key: 'State',
    value: node.memoizedState,
    type: (node.memoizedState.memoizedState && node._debugHookTypes[0] === 'useState') ? 'hook' : 'componentState',
    topComponent: null,
    components: null,
  }
}

// PROPS
// memoizedProps will be an object of key/value pairs of props
// We can also check tag to check for what type of component it is

const convertProps = (node) => {
  // Check if node has props
  // If not return null
  if (!node.memoizedProps) return null;
  // Create props array
  const props: State[] = [];
  // Iterate through memoizedProps.props
  for (const key in node.memoizedProps) {
    try {
      // Create a prop object
      const prop: State = {
        // Store values in object
        key,
        value: node.memoizedProps[key],
        topComponent: null,
        components: [],
        type: 'prop',
      };
      // Push object to props array
      props.push(prop);
    } catch (error) {
      continue;
    }
  }
  // Return props array
  return props;
}

const convertStructure = (node, parent = null) => {
  // Convert dual linked list structure into graph
  // Create a new node
  const convertedNode = new SimpleNode(node, parent);
  // Add child to array
  if (!node.child) return convertedNode;
  convertedNode.children.push(convertStructure(node.child, convertedNode));
  // ConvertStructure() of each sibling and sibling of sibling etc. and add them to children array
  let childNode = node.child;
  while (childNode.sibling) {
    convertedNode.children.push(convertStructure(childNode.sibling, convertedNode));
    childNode = childNode.sibling;
  }
  // Return converted node
  return convertedNode
}

export const extractData = (node) => {
  const data = JSON.parse(JSON.stringify(convertStructure(node), circular()));
  return data;
}