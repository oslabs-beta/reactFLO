import React from "react";
import ReactJson from "react-json-view";
import { State } from "../backend/interfaces"

interface stateDisplayProps {
  title: string, 
  json: null | State
}

const StateDisplay = (props: stateDisplayProps) => {
  // If no data is passed down render nothing
  if (!props.json) return <div></div>
  return (
    <div>
      <h2> {props.title}</h2>
      <ReactJson 
        src={props.json} 
        name={props.title} 
        collapsed={true} 
        enableClipboard={false} />
    </div>
  );

};

export default StateDisplay;