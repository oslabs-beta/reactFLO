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
    "name": "Rootington",
    "children":[
      {
        "name": "Joe",
        "children":[
          {"name": "Cherizzle"},
          {"name": "Bob"}
        ]
      }, {
        "name": "Jimmy",
        "children":[
          {"name": "Marcus"},
          {"name": "Juan"}
        ]
      }
    ]
  }
  // sets the heights and width of the tree to be passed into treemap 
  const margin = {top: 40, right: 90, bottom: 50, left: 90};
  const height = 660 - margin.left - margin.right;
  const width = 700 - margin.top - margin.bottom;

  // creating the tree itself
  // setting the size based on previous heights declared above 
  const treeMap = d3.tree().size([height,width]);
   // creating the nodes of the tree 
  const hierarchyNodes = d3.hierarchy(data);
  // create the final map with nodes created from data
  const finalMap = treeMap(hierarchyNodes);

  this.setState({ paths: finalMap.links() }); // returns a flat array of objects containing all the parent-child links. When turned into a component this will make the lines 
  this.setState({ nodes: hierarchyNodes.descendants() }) // returns a flat array of  objects. Each obj has info about each node, when turned into a component this will make the actual nodes themselves and allow us to make shapes 
 }

 render(){
   // put paths before & because render goes before component did mount 
   let paths = this.state.paths && this.state.paths.map((el)=>{
    let d = d3
      .linkVertical()
      .x((d) => {
        return d.x;
      })
      .y((d) => {
        return d.y/2;
      });
    return <path 
            className='link' fill="none" 
            stroke="#97a6ff" 
            strokeWidth="2px" d={d(el)} />
  })

  let nodes = this.state.nodes && this.state.nodes.map((node, i) => {
    return <g key={i} transform={ `translate(${node.x}, ${node.y/2})` }>
        <circle r="5" style={{'fill': 'blue'}}/>
        <text y="0" dy="0" textAnchor="middle">{ node.data.name }</text>
    </g>
  })
   
    return (
      <div>
      <h1>Left Panel Headline</h1>
      <svg style={{ width: '800px', height: '800px' }}>
        <g transform='translate(0, 20)'>
          {paths}
          {nodes}
        </g>
      </svg>
    </div>
    )
  }
}
export default LeftPanel;