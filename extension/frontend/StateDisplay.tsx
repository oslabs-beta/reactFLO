import React from "react";
import ReactJson from "react-json-view";
import { Prop } from "../interfaces"

interface stateDisplayProps {
  title: string,
  json: null | Prop
}

export const StateDisplay = (props: stateDisplayProps) => {
  // If no data is passed down render nothing
  if (!props.json) return <div></div>
  return (
    <div className="stateDisplay">
      <h2 className="title">{props.title}</h2>
      <div className="info">
        <ReactJson
          src={props.json}
          name={props.title}
          collapsed={false}
          enableClipboard={false}
          displayDataTypes={false}
          style={{
            "fontSize": "medium",
            "background": "none",
          }}
          theme="monokai"
        />
      </div>
    </div>
  );

};

