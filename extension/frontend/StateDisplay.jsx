import React from "react";
import ReactJson from "react-json-view";

function StateDisplay(props) {
  // If no data is passed down render nothing
  if (!props.json) return <div></div>
  return (
    <div>
      <h1> {props.title}</h1>
      <ReactJson src={props.json} name={props.title} collapsed={true} enableClipboard={false} />
    </div>
  );

};

export default StateDisplay