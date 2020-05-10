import React, { Component, useRef } from "react";
import { render } from "react-dom";

class App extends Component {

  constructor(){
    super();
    this.state = {
      // backend obj stored here
      // message: {
        message: [],
        children: [],
        props: [], 
        state:[], 
        tag: '',
      }
    };



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
      if (message.id === 'ReactFLO'){
      this.setState({
          children: message.message.children,
          props: message.message.props,
          state: message.message.state,
          tag: message.message.tag,
        })
      }   
    })
  }
  render(){

    const childArr = []; 
    this.state.children.map((el, index)=> childArr.push(<h1 key={index}>{ el }</h1>))
      
    return (
      <div>
      <h1>Hello from React!</h1>
      {childArr}
      </div>
    )
  }
 
}
export default App;