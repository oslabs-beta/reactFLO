import React, { Component } from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
       data: {},
    }
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

  render(){
 
    return (
      <div>
      <div className="panelWrap">
        <LeftPanel data={ this.state.data }/>
        <RightPanel />
      </div>
      </div>
    )
  }
 
}
export default App;