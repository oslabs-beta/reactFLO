import React, { Component, useRef } from "react";
import { render } from "react-dom";

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
      array: ["hello from react state"]
    };
  }

  componentDidMount(){
    // confirm function is firing
    // this.setState({ array: 'hello from componentDidMount'})

    // const port = chrome.runtime.connect({
    //   name: "react"
    // })

    // const portOnMessage = port.onMessage;

    // portOnMessage.addListener((message)=>{ 

    //   if (message.data.id === 'ReactFLO'){
    //     this.setState({ array:[ "hello from listener" ] })
    //   }   
    // })
    
    chrome.runtime.onMessage.addListener((message)=>{
      this.setState({ array: [ "hello from listener" ] })
    })

  }

  render () {
    return (
      <div>
      <h1>Hello from React!</h1>
      { this.state.array }
      </div>
    )
  }
}


export default App;