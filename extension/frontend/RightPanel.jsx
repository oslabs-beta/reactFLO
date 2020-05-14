import React from "react";

function RightPanel(props){
  console.log('Right props: ', props);
  return (
    <div>
      <h2>Right Panel Headline</h2>
      <h1>{props.clickedNode.type || "didnt work foo"}</h1>
      {/* <State /> */}
      {/* list of state */}
      {/* <Props /> */}
      {/* list of props */}
    </div> 
  )}

export default RightPanel;