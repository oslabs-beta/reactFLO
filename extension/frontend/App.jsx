import React, { Component } from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { DisplayNode, State } from "../backend/interfaces";

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
       data: {},
       clickedNode: {},
    }
    this.selectNode = this.selectNode.bind(this);
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

  render(){
 
    return (
      <div>
      <div className="panelWrap">
        <LeftPanel data={ this.state.data } selectNode = {this.selectNode}/>
        <RightPanel clickedNode={this.state.clickedNode} />
      </div>
      </div>
    )
  }
 
}
export default App;