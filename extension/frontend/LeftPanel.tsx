import React, { Component } from "react";
import * as d3 from "d3";

import { Stage } from "./Stage"
import { ZoomContainer } from "./ZoomContainer"

interface State {
  paths: [],
  nodes: [],
  data: object,
  toggleChild: boolean,
}

interface Props {
  data: object,
  clickedNode: object,
  selectNode: Function
}

interface Node {
  children: [],
  data: {
   _children?: [],
   children: []
   displayWeight?: number,
   state?: object,
   name?: string
  },
  depth: number,
  height: number,
  parent: object,
  x: number,
  y: number 
}

class LeftPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      paths: [],
      nodes: [],
      data: {},
      toggleChild: true,
    }

    this.toggleChildren = this.toggleChildren.bind(this);
  }

  // componentDidUpdate(){
  //   // confirm that backend data is getting updated 
  //   // console.log("CPU leftpanel props: ", this.props.data)
  // }

  toggleChildren(d: Node) {

    if (d.data.children) {
      d.data._children = d.data.children;
      d.data.children = null;
    } else {
      d.data.children = d.data._children;
      d.data._children = null;
    }

    this.setState({
      toggleChild: !this.state.toggleChild
    })
  }


  render() {
    // data from the backend from hooking into react devtools
    const stateData = this.props.data;

    // sets the heights and width of the tree to be passed into treemap 
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const height = 1000 - margin.left - margin.right;
    const width = 1000 - margin.top - margin.bottom;

    // creating the tree map 
    // setting the size based on width and heights declared above 
    const treeMap = d3.tree().size([height, width]);
    // creating the nodes of the tree 
    const hierarchyNodes = d3.hierarchy(stateData);
    // calling tree function with nodes created from data
    const finalMap = treeMap(hierarchyNodes)

    // returns a flat array of objects containing all the parent-child links
    // this will render the paths onto the component
    let paths = finalMap.links();
    // returns a flat array of objects
    // this will render the nodes onto the component
    let nodes = hierarchyNodes.descendants();

    // put paths (the lines on the graph) before & because render goes before component did mount 
    paths = paths && paths.map((el: object, i: number) => {
      let d = d3
        // link vertical makes our entire tree go top to bottom as opposed to left to right 
        .linkVertical()
        .x((d) => {
          return d.x / 2;
        })
        .y((d) => {
          return d.y / 2; // div by 2 so make the path links shorter and not as long 
        });
      return <path key={i}
        className='link' fill="none"
        stroke="#97a6ff"
        strokeWidth="2px" d={d(el)} />
    })


    // renders the nodes (the circles) to the screen
    nodes = nodes && nodes.map((node: Node, i: number) => {
      return <g
        key={i} transform={`translate(${node.x / 2}, ${node.y / 2})`}
        onClick={() => this.props.selectNode(node.data)}
        onDoubleClick={() => this.toggleChildren(node)}
      >

        {/* Change shape of node depending on if it is stateful or not*/}
        {/* Also changes the color of the node depending on displayWeight */}

        {node.data.state !== null ?
          <rect x="-5" y="0" width="15" height="10"
            style={{
              'stroke': node.data === this.props.clickedNode ? 'red' : 'black',
              'strokeWidth': '2px',
              'fill':
                node.data.displayWeight === 0 ? 'gray' :
                  (node.data.displayWeight === 0.5 ? 'yellow' : 'green'),
            }} />
          :
          <circle r="7"
            style={{
              'stroke': node.data === this.props.clickedNode ? 'red' : 'black',
              'strokeWidth': '2px',
              'fill':
                node.data.displayWeight === 0 ? 'gray' :
                  (node.data.displayWeight === 0.5 ? 'yellow' : 'green'),
            }} />
        }

        <text x="8" y="4" textAnchor="start">{node.data.name}</text>
      </g>
    })


    return (
      <div>
        <h1>Component Tree</h1>
        <Stage width="500" height="1000">
          <ZoomContainer>
            {paths}
            {nodes}
          </ZoomContainer>
        </Stage>
      </div>
    )
  }
}

export default LeftPanel;