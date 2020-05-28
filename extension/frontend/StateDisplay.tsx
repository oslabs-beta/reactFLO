import React from "react";
import { Prop } from "../interfaces";
import ReactJson, {OnSelectProps} from "react-json-view";

interface stateDisplayProps {
  title: string,
  json: null | Prop,
  selectState: ((select: OnSelectProps) => void)
}

export const StateDisplay = (props: stateDisplayProps) => {
  // If no data is passed down render nothing
  if (!props.json) return <div></div>
  return (
    <div>
      <h2 className="title">{props.title}</h2>
      <ReactJson
        src={props.json}
        name={props.title}
        collapsed={false}
        enableClipboard={false}
        theme="monokai"
        onSelect={props.selectState}
      />
    </div>
  );

};

