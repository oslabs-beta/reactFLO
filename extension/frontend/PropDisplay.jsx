import React from "react";
import ReactJson from "react-json-view";

function PropDisplay(props) {
  console.log('Prop Display Props: ', props);
  // If no data is passed down render nothing
  if (!props.propList || !props.propList.length) return <div>{props.title} not found</div>
  const propArray = props.propList.map((el, i)=>{
    return <PrinceAndThePropper key={`prop${i}`} nodeProp ={el} selectProp={props.selectProp} />
  });
  return (
    <div>
      <title> {props.title}</title>
      {propArray}
    </div>
  );

};

function PrinceAndThePropper(props) {
  console.log("supposed to be yaySON:", JSON.stringify(props.nodeValue))
  return (
    <div>
      <button onClick={()=>props.selectProp(props.nodeProp)}>🔎</button>
      <span>{props.nodeProp.key}:</span>
      <ReactJson src={{[props.nodeProp.key]: props.nodeProp.value}} name='Value' collapsed={true} enableClipboard={false} />
    </div>
  );
}

export default PropDisplay