import React, { Component } from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
       message: {
        message: [],
        children: [],
        props: [], 
        state:[], 
        tag: '',
      }
    }
  };



  // componentDidMount(){
    // confirm function is firing
    // this.setState({ array: 'hello from componentDidMount'})

  //   chrome.runtime.onMessage.addListener((message)=>{
  //     if (message.id === 'ReactFLO'){
  //     this.setState({
  //         children: message.message.children,
  //         props: message.message.props,
  //         state: message.message.state,
  //         tag: message.message.tag,
  //       })
  //     }   
  //   })
  // }

  render(){
 
    return (
      <div>
      <h1>Hello from React!</h1>
      <div className="panelWrap">
        <LeftPanel />
        <RightPanel />
      </div>
      </div>
    )
  }
 
}
export default App;