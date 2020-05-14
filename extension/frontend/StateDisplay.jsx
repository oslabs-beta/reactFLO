import React from "react";
import ReactJson from "react-json-view";

function StateDisplay(props) {
  // If no data is passed down render nothing
  if (!props.json) return <div>{props.title} not found</div>
  return (
    <div>
      <title> {props.title}</title>
      <ReactJson src={props.json} name={props.title} collapsed={true} enableClipboard={false} />
    </div>
  );

};

export default StateDisplay