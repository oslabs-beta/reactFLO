import React from "react";
import ReactJson from "react-json-view";
import { Prop } from "../interfaces";
import { NONAME } from "dns";


interface PropDisplayProps {
  title: string,
  propList: Prop[],
  selectProp: Function
}

export const PropDisplay = (props: PropDisplayProps) => {

  // If no data is passed down render nothing
  if (!props.propList || !props.propList.length) return <div></div>
  const propArray = props.propList.map((el, i) => {
    return <PropInfo
      key={`prop${i}`}
      nodeProp={el}
      selectProp={props.selectProp} />
  });

  return (
    <div>
      <h2 className="title">{props.title}</h2>
      {propArray}
    </div>
  );

};

interface ButtonProp {
  key: string,
  nodeProp: Prop,
  selectProp: Function,
}


export function PropInfo(props: ButtonProp) {

  return (
    <div>
      <button
        className="propName"
        onClick={() => props.selectProp(props.nodeProp)}
      >
        🔎 Key: {props.nodeProp.key}
      </button>
      <ReactJson
        src={{ [props.nodeProp.key]: props.nodeProp.value }}
        name='Value'
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
  );
}

export default PropDisplay;