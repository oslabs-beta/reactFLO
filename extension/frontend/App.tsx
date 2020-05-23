import React from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
// TOOK OUT STATE
import { DisplayNode } from "../backend/interfaces";
import circular from "circular"
const { Traverse } = require('../algorithms/dataTraversal');
const { connectToParent } = require('../algorithms/dataConversion');
const { FindProp, createPathToRoot, workOnStatefulNodes } = require('../algorithms/nodeCategorization');

const resetDisplayWeights = (node: DisplayNode) => {
  return Traverse.downward(node, (childNode: DisplayNode) => {
    // if the weight is more than 0 resasign it to 0 
    if (childNode.displayWeight) childNode.displayWeight = 0;
    if (childNode.pathWeight) childNode.pathWeight = 0;
  });
};


interface State {
  data: any | DisplayNode,
  clickedNode: any | DisplayNode
}

interface Props {

}


class App extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      clickedNode: {}
    }

    this.selectNode = this.selectNode.bind(this);
    this.selectProp = this.selectProp.bind(this);
    this.clearTree = this.clearTree.bind(this);
  };

  componentDidMount() {
    // confirm function is firing
    // this.setState({ array: 'hello from componentDidMount'})

    // Set up connection to background script
    const backgroundPageConnection = chrome.runtime.connect({
      name: "panel"
    });

    // Initialize the connection from background script
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // Add listener for messages from background script
    backgroundPageConnection.onMessage.addListener((message) => {
      if (message.id === 'ReactFLO') {
        console.log('CDM app: ', message.message)
        this.setState({
          data: message.message,
          clickedNode: {},
        });
      }
    });
  }

  selectNode(node) {
    // assign state
    console.log('Selected: ', node);
    this.setState({
      clickedNode: node,
    });
  }

  // handle click, when clicked invoke algo, 
  selectProp(prop) {
    // Reset results from previous selection
    resetDisplayWeights(this.state.data);
    // top level method needed before we invoke match and highest. This method allows children to connect with parents. Runs through 
    connectToParent(this.state.data);
    // find highest runs cb match state on stateful comoponent , if there is no highest stateful componenet with that info then start traversing at root
    const statefulNodes = createPathToRoot(this.state.clickedNode);
    const topNode = workOnStatefulNodes(statefulNodes, prop) || this.state.data;
    Traverse.downward(topNode, FindProp.inProps, prop);
    this.setState({
      data: this.state.data,
    });
  }

  // clearTree (affecting the re render )
  // invoke traverseDtta passing in anon cb that we write change all display weights
  clearTree() {
    // invoke resetDisplay weight so data is changed 
    resetDisplayWeights(this.state.data);
    // do setstate to re render the actual tree 
    this.setState({
      data: this.state.data,
    });
  }

  render() {

    return (
      <div>
        <div className="panelWrap">
          <LeftPanel
            data={this.state.data}
            clickedNode={this.state.clickedNode}
            selectNode={this.selectNode} />
          <RightPanel
            clickedNode={this.state.clickedNode}
            selectProp={this.selectProp}
            clearTree={this.clearTree} />
        </div>
      </div>
    )
  }
}

export default App;
