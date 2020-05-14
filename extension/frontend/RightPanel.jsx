import React from "react";
import StateDisplay from "./StateDisplay";
import PropDisplay from "./PropDisplay";

function RightPanel(props){
  console.log('Right props: ', props);
  console.log(props.props)
  // state on line 7 is destructered from the clicked node we recieved from onclick 
  const { type, state} = props.clickedNode;
  return (
    <div>
      <h2>Right Panel Headline</h2>
      <h1> Component Type: {type || "didnt work foo"}</h1>
      <StateDisplay title='State' json={ state ? state.value : null } />
      <PropDisplay title='Prop' propList={props.clickedNode.props} />
    </div> 
  )}

export default RightPanel;