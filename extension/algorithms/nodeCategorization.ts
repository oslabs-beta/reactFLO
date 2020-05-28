import { DisplayNode, Prop } from "../interfaces";
const { Traverse } = require("./dataTraversal");

class FindProp {
  
  static inState (targetNode: DisplayNode, targetProp: Prop): void {
    /*
      Searches through the entirety of State obj on a display node, both keys and values, 
      to find the value from a selected prop of clicked displayNode
    */

    //invoke with params (node higher on the tree than clicked nodes state value and the prop from the clickedNode 
    crawler(targetNode,targetNode.state.value, targetProp.value); 
  }

  static inProps (targetNode: DisplayNode, targetProp: Prop): void {
    if (!targetNode.props) return;
    for (const prop of targetNode.props) {
      if (prop.key === targetProp.key) {
        targetNode.displayWeight = Math.max(.5, targetNode.displayWeight);
        if (prop.value === targetProp.value) targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
        if (typeof targetProp.value === 'object' && typeof prop.value === 'object') {
          if (JSON.stringify(prop.value) === JSON.stringify(targetProp.value)) {
            targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
          }
        }
      }
    }
  }

}

class FindState {
  static inProps (targetNode: DisplayNode, searchValue:any): void{
  // if props are null then return 
  // iterate through props array and invoke crawler on each curr val 
  console.log('this is the search value:', searchValue)
  if(!targetNode.props) return 
    for(const prop of targetNode.props){
      crawler(targetNode,prop.value,searchValue)
    }
  }
}

const crawler = (targetNode:DisplayNode, targetValue: any, searchValue: any): void =>{
  if (typeof targetValue === 'object') {
    // Check that searchValue is an object and searchValue and targetValue are either both array or neither are arrays
    if (typeof searchValue === 'object' && Array.isArray(targetValue) === Array.isArray(searchValue)){
      // compare stringified
      if(JSON.stringify(searchValue) === JSON.stringify(targetValue)) {
        // increment the displayWeight of the node 
        // Math max says that if the value is higher than 1 return the higher value 
        targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
      }
    }
    for (const key in targetValue) {
      // Compare searchValue to each key in targetValue
      if (key == searchValue) targetNode.displayWeight = Math.max(0.5, targetNode.displayWeight);
      // Run crawler on each element in targetValue
      crawler(targetNode, targetValue[key], searchValue);
    }
  } else {
    // If targetValue is primitive, compare targetValue to searchValue
    if (targetValue === searchValue) targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
  }
}
// to create paths between startnode and the top stateful node 
const createPathToRoot = (startNode: DisplayNode): DisplayNode[] => {
  // Create an array of stateful nodes
  const statefulNodeArr: DisplayNode[] = [];
  // Create an array of intermediary nodes, put startNode in med arr first because we dont want to count startNode as its own parent with same props 
  let mediums: DisplayNode[] = [startNode];
  // Traverse up the node tree
  Traverse.upward(startNode.parent, (currentNode: DisplayNode) => {
    // if it is stateful then push it to the stateful array 
    if(currentNode.state) {
      // push the current node so that we can find top of the chain 
      statefulNodeArr.push(currentNode)
      // push exisiting mediums we have kept into the top stateful node we found 
      currentNode.mediums = [...mediums];
      // reset mediums to include the current node mimicing what we did on 55  
      mediums = [currentNode];
    // else push to intermediary array 
    } else {
      mediums.push(currentNode);
    }
  });
  // Return the array of stateful nodes
  return statefulNodeArr;
};

// will change the display weight of all stateful component and path weights of all the mediums 
const workOnStatefulNodes = (nodes: DisplayNode[], prop: Prop): DisplayNode => {
  // dec var for highest stateful node that has the props 
  let highestNodeWithTarget: null | DisplayNode = null ; 
  // iterate through the stateful nodes in reverse, from heighest to lowest
  for(let i = nodes.length - 1; i >= 0; i--) {
    // invoke FindProp.inState passing in statefulnode, this will see if the stateful node has the desired props 
    FindProp.inState(nodes[i], prop);
    // Check if the node has the prop and highestNodeWithTarget is null, if null assign highest to curr node 
    if (nodes[i].displayWeight && !highestNodeWithTarget) highestNodeWithTarget = nodes[i];
    // iterate through the mediums 
    nodes[i].mediums.forEach((el) => {
      // if display weight is 0 then set pathweight of medium to be equal to stateful node's path weight 
      // Note: Replace first and last displayWeight with pathWeight for production
      el.pathWeight = nodes[i].displayWeight || nodes[i].pathWeight;
    });
  }
  // Return the heighest stateful node that contains the props or return null if there are no stateful nodes
  return highestNodeWithTarget;
};

module.exports = { FindProp, createPathToRoot, workOnStatefulNodes ,FindState};