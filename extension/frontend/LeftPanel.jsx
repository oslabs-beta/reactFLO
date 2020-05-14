import React, { Component } from "react";
import * as d3 from "d3";

class LeftPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      paths: [],
      nodes: [],
      data: {}
    }
 }

  componentDidUpdate(){
    // confirm that backend data is getting updated 
    console.log("CPU leftpanel props: ", this.props.data)
  }

 componentDidMount(){
   // creating the root data that will be passed into the heiarchy function for D3 
  //  const data = {
  //   "name": "Rootington",
  //   "children": [
  //     {
  //       "name": "Joe",
  //       "children": [
  //         {"name": "Cherizzle"},
  //         {"name": "Bob"}
  //       ]
  //     }, {
  //       "name": "Jimmy",
  //       "children": [
  //         {"name": "Marcus"},
  //         {"name": "Juan"}
  //       ]
  //     }
  //   ]
  // }

 }
 // ** there are two parts two the tree, the nodes (circles) and the path links (the lines that connect the nodes)
 // below one method is creating the lines and the other is creating all the nodes 

 render(){
  const stateData = this.props.data;
  console.log("CPM leftpanel props: ", this.props.data)

  // sets the heights and width of the tree to be passed into treemap 
  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const height = 660 - margin.left - margin.right;
  const width = 700 - margin.top - margin.bottom;

  // creating the tree itself
  // setting the size based on previous heights declared above 
  const treeMap = d3.tree().size([height,width]);
   // creating the nodes of the tree 
  const hierarchyNodes = d3.hierarchy(stateData);
  // create the final map with nodes created from data
  const finalMap = treeMap(hierarchyNodes);


  
    // returns a flat array of objects containing all the parent-child links. When turned into a component this will make the lines 
    let paths = finalMap.links();
    // returns a flat array of objects. Each obj has info about each node, when turned into a component this will make the actual nodes themselves and allow us to make shapes 
    let nodes = hierarchyNodes.descendants();
  

   // put paths (the lines on the graph) before & because render goes before component did mount 
    paths = paths && paths.map((el, i)=>{
    let d = d3
    // link vertical makes our entire tree go top to bottom as opposed to left to right 
      .linkVertical()
      .x((d) => {
        return d.x/2;
      })
      .y((d) => {
        return d.y/2; // div by 2 so make the path links shorter and not as long 
      });
    return <path key={i}
            className='link' fill="none" 
            stroke="#97a6ff" 
            strokeWidth="2px" d={d(el)} />
  })
 // renders the nodes (the circles) to the screen
    nodes = nodes && nodes.map((node, i) => {
    return <g 
    key={i} 
    transform={ `translate(${node.x/2}, ${node.y/2})`}
      onClick={()=>this.props.selectNode(node.data)}
    >
        <circle r="2" style={{'fill': 'blue'}}/>
        <text y="0" dy="0" textAnchor="middle">{ node.data.type }</text>
    </g>
  })
   
  
    return (
      <div>
      <h2>Left Panel Headline</h2>
      <svg style={{ width: '300px', height: '600px' }} viewBox={`25 -30 300 600`}>
        <g>
          { paths }
          { nodes }
        </g>
      </svg>
    </div>
    )
  }
}

export default LeftPanel;