import React from "react";
import { StateDisplay } from "./StateDisplay";
import PropDisplay from "./PropDisplay";
import {OnSelectProps} from "react-json-view";
import { DisplayNode } from "../interfaces";

interface RightPanelProps {
  clickedNode: DisplayNode | null,
  selectProp: Function,
  clearTree: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  selectState: ((select: OnSelectProps) => void),
}


const RightPanel = (props: RightPanelProps) => {

  if (!props.clickedNode) return (
    <div className="rightPanel">
      <h1 className="title">Component Data</h1>
      <p className="noNode">Please select a node to continue</p>
    </div>
  );

  // state on line 7 is destructered from the clicked node we recieved from onclick 
  const { type, state, name } = props.clickedNode;
  
  return (
    <div className="rightPanel">
      <h1 className="title">Component Data</h1>
      <h2 className="subTitle"> Component Type:</h2>
      <h2 className="subTitle value"> {type || "Anonymous"}</h2>
      <h2 className="subTitle"> Component Name:</h2>
      <h2 className="subTitle value"> {name || "Anonymous"}</h2>
      <button onClick={props.clearTree} className="clearSelection">Clear Selection</button>
      <div className ="rightPanelTop">
        <StateDisplay 
          selectState={props.selectState}
          title='State:' 
          json={state ? state.value : null} />
      </div>
      <div className="rightPanelBottom">
        <PropDisplay 
          title='Props:' 
          propList={props.clickedNode.props} 
          selectProp={props.selectProp} 
          />
      </div>  
    </div>
  )
}

export default RightPanel;