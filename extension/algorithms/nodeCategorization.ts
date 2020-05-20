import { DisplayNode, State } from "../backend/interfaces";

export default class FindProp {
  
  static inState (targetNode: DisplayNode, targetProp: State): void {
    /*
      Searches through the entirety of State obj on a display node, both keys and values, 
      to find the value from a selected prop of clicked displayNode
    */

    // dec a func to actually do the traversing up 
    const crawler = (stateValue: any, propValue: any): void =>{
      if (typeof stateValue === 'object') {
        // Check that propValue is an object and propValue and stateValue are either both array or neither are arrays
        if (typeof propValue === 'object' && Array.isArray(stateValue) === Array.isArray(propValue)){
          // compare stringified
          if(JSON.stringify(propValue) === JSON.stringify(stateValue)) {
            // increment the displayWeight of the node 
            // Math max says that if the value is higher than 1 return the higher value 
            targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
          }
        }
        for (const key in stateValue) {
          // Compare propValue to each key in stateValue
          if (key == propValue) targetNode.displayWeight = Math.max(0.5, targetNode.displayWeight);
          // Run crawler on each element in stateValue
          crawler(stateValue[key], propValue);
        }
      } else {
        // If stateValue is primitive, compare stateValue to propValue
        if (stateValue === propValue) targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
      }
    }
    //invoke with params (node higher on the tree than clicked nodes state value and the prop from the clickedNode 
    crawler(targetNode.state.value, targetProp.value); 
  }

  static inProps (targetNode: DisplayNode, targetProp: State): void {
    if (!targetNode.props) return;
    for (const prop of targetNode.props) {
      if (prop.key === targetProp.key) {
        targetNode.displayWeight = Math.max(.5, targetNode.displayWeight);
        if (prop.value === targetProp.value) targetNode.displayWeight = Math.max(1, targetNode.displayWeight);
      }
    }
  }

}