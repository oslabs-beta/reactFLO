import React, { Component } from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { DisplayNode, State } from "../backend/interfaces";
import { assignChildren } from "./assignChildren";
import { matchState } from "./organizers";
import { findHighestState } from "./categorization";
import circular from "circular"

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
       data: {},
       clickedNode: {},
    }
    this.selectNode = this.selectNode.bind(this);
    this.selectProp = this.selectProp.bind(this);
  };

  componentDidMount(){
    // confirm function is firing
    // this.setState({ array: 'hello from componentDidMount'})

    chrome.runtime.onMessage.addListener((message)=>{
      if (message.id === 'ReactFLO'){
      console.log('CDM app: ', message.message)
      this.setState({
        data: message.message,
       })
      }   
   })
  }

  selectNode(node){
    // assign state
    console.log('Selected: ', node);
    this.setState({
      clickedNode: node,
    });
  }

  // handle click, when clicked invoke algo, 
  selectProp(prop) {
    console.log("this prop in right panel is being hit ")
    // top level method needed before we invoke match and highest. This method allows children to connect with parents. Runs through 
    assignChildren(this.state.data);
      // find highest runs cb match state on stateful comoponent 
      findHighestState(this.state.clickedNode, prop, matchState);
          this.setState({
            data: JSON.parse(JSON.stringify(this.state.data, circular())),
          });
  }

  render(){
 
    return (
      <div>
      <div className="panelWrap">
        <LeftPanel data={ this.state.data } selectNode = {this.selectNode}/>
        <RightPanel clickedNode={this.state.clickedNode} selectProp={this.selectProp} />
      </div>
      </div>
    )
  }
 
}
export default App;