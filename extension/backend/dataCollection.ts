import {
  DisplayNode,
  State,
} from './interfaces';
import { notDeepEqual } from 'assert';
const circular = require('circular');


class SimpleNode implements DisplayNode {
  id: number;
  displayName: string;
  displayWeight: number = 0;
  tag: number;
  type: string;
  name: string;
  props: State[] | null = [];
  state: State | null = null;
  children: DisplayNode[] = [];
  parent: DisplayNode | null = null;
  mediums: DisplayNode[] = null;
  constructor(node: any) {
    this.id = checkDebug(node);
    this.tag = node.tag;
    this.name = assignName(node);
    this.type = assignType(node);
    this.state = convertState(node);
    this.props = convertProps(node);
    this.parent = null;
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
    // Spread operator prevents unwanted circular references
    value: { ...node.memoizedState },
    type: (node.memoizedState.memoizedState && node._debugHookTypes[0] === 'useState') ? 'hook' : 'componentState',
    topComponent: null,
    components: null,
  }
}

// Assigns name of component to simpleNode
// (Need to add in all cases?)
const assignName = (node): any => {
  // Find name of a class component
  if (node.type && node.type.name) return node.type.name;
  // Find a functional component
  if (node.tag === 0) return 'FC';
  // Tag 5 === HostComponent
  if (node.tag === 5) return `${node.type}`;
  // Tag 3 === HostRoot 
  if (node.tag === 3) return 'HR';
  // Tag 3 === HostText
  if (node.tag === 6) {
    return node.memoizedProps;
  }
  if (node.tag === 7) return "Fragment";
}
// Component Types
const componentTypes = {
  0: 'Functional Component',
  1: 'Class Component',
  2: 'Indeterminate Component',
  3: 'Host Root',
  4: 'Host Portal',
  5: 'Host Component',
  6: 'Host Text',
  7: 'Fragment',
  8: 'Mode',
  9: 'Context Consumer',
  10: 'Context Provider',
  11: 'ForwardRef',
  12: 'Profiler',
  13: 'Suspense Component',
  14: 'Memo Component',
  15: 'Simple Memo Component',
  16: 'Lazy Component'
}
// Assigns type of component to simpleNode
const assignType = (node): any => {
  // Check if tag is equal to key in componentTypes and return value
  return componentTypes[node.tag];
}

// Check for debug id\
// NEED TO FIX THIS STILL
const checkDebug = (node): number => {
  if (node._debugID) return node._debugID;
  return 0;
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

const convertStructure = (node) => {
  // Convert dual linked list structure into graph
  // Create a new node
  const convertedNode = new SimpleNode(node);
  // Add child to array
  if (!node.child) return convertedNode;
  convertedNode.children.push(convertStructure(node.child));
  // ConvertStructure() of each sibling and sibling of sibling etc. and add them to children array
  let childNode = node.child;
  while (childNode.sibling) {
    convertedNode.children.push(convertStructure(childNode.sibling));
    childNode = childNode.sibling;
  }
  // Return converted node
  return convertedNode
}

export const extractData = (node) => {
  const data = JSON.parse(JSON.stringify(convertStructure(node), circular()));
  return data;
}