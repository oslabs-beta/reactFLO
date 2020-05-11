import React, { Component, useRef } from "react";
import { render } from "react-dom";
import * as d3 from "d3";

class LeftPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      paths: [],
      nodes: [],
    }
 }


 componentDidMount(){
   // creating the root data that will be passed into the heiarchy function for D3 
   const data = {
    "name":"rootington",
    "children":[
      {
        "name": "Joe"
      }, {
        "name": "jimmy"
      }
    ]
  }
  // sets the heights and width of the tree to be passed into treemap 
  const margin = {top: 40, right: 90, bottom: 50, left: 90};
  const width = 660 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // creating the tree itself
  // setting the size based on previous heights declared above 
  const treeMap = d3.tree().size([width, height]);
   // creating the nodes of the tree 
  const hierarchyNodes = d3.hierarchy(data);
  // create the final map with nodes created from data
  const finalMap = treeMap(hierarchyNodes);

  this.setState({ paths: finalMap.links() }); // returns a flat array of objects containing all the parent-child links. When turned into a component this will make the lines 
  this.setState({ nodes: hierarchyNodes.descendants() }) // returns a flat array of root’s descendants, when turned into a component this will make the actual nodes themselves and allow us to make shapes 
 }



 
 render(){
  //  // put paths before & because render goes before component did mount 
  //  let paths = this.state.paths && this.state.paths.map((el)=>{
  //   let d = d3
  //     .linkVertical()
  //     .x((d) => {
  //       return d.x;
  //     })
  //     .y((d) => {
  //       return d.y;
  //     });
  //   return <path className='link' d={d(item)} />
  // })

  // let nodes = this.state.nodes && this.state.nodes.map((node, i) => {
  //   return <g key={node.id}
  //       transform={`translate(${node.y}, ${node.x})`}>
  //       <circle r="10" />
  //       <text y="0" dy="0" textAnchor="middle">{node.name}</text>
  //   </g>
  // })
   
    return (
      <div>
      <h1>Hello from left panel!</h1>
      </div>
    )
  }
}
export default LeftPanel;