import React, { Component } from "react";
import * as d3 from "d3";

import { Stage } from "./Stage"
import { ZoomContainer } from "./ZoomContainer"

import { DisplayNode } from "../interfaces";

interface State {
  paths: [],
  nodes: [],
  data: object,
  toggleChild: boolean,
}

interface Props {
  data: object,
  clickedNode: any | DisplayNode,
  selectNode: Function
}

interface Node {
  children: [],
  data: {
    _children?: DisplayNode[] | null,
    children: DisplayNode[] | null,
    displayWeight?: number,
    state?: object,
    name?: string
  },
  depth: number,
  height: number,
  parent: DisplayNode | null,
  x: number,
  y: number
}

interface Path {
  target: {
    data: DisplayNode
  },
  source: {
    data: DisplayNode
  }
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
    // Legend
    const svgLegend = d3.select('#legend');
    // Legend Shapes
    svgLegend.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("stroke", 'black').style("fill", "none").style("stroke-width", '3px')
    svgLegend.append("rect").attr("x", 195).attr("y", 155).attr("width", 10).attr("height", 10).style("stroke", 'black').style("fill", "none").style("stroke-width", '3px')
    svgLegend.append("circle").attr("cx", 200).attr("cy", 190).attr("r", 6).style("fill", "#1E3677")
    svgLegend.append("circle").attr("cx", 200).attr("cy", 220).attr("r", 6).style("fill", "#55BEC7")
    svgLegend.append("circle").attr("cx", 200).attr("cy", 250).attr("r", 6).style("fill", "#F6780D")
    // Legend Descriptions
    svgLegend.append("text").attr("x", 220).attr("y", 130).text("Non-Stateful").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 220).attr("y", 160).text("Stateful").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 220).attr("y", 190).text("No Relation").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 220).attr("y", 220).text("Medium Relation").style("font-size", "15px").attr("alignment-baseline", "middle")
    svgLegend.append("text").attr("x", 220).attr("y", 250).text("High Relation").style("font-size", "15px").attr("alignment-baseline", "middle")
    // Legend Placement
    svgLegend.attr("x", -190)
    svgLegend.attr("y", -120)

    // data from the backend from hooking into react devtools
    const stateData = this.props.data;

    // sets the heights and width of the tree to be passed into treemap
    const width = 75;
    const height = 250; 

    // creating the tree map 
    // setting the size based on width and heights declared above 
    const treeMap = d3.tree().nodeSize([width, height]);
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
      paths = paths && paths.map((el: Path, i: number) => {

      let d = d3
        // link vertical makes our entire tree go top to bottom as opposed to left to right 
        .linkVertical()
        .x((d) => {
          return d.x;
        })
        .y((d) => {
          return d.y; // div by 2 so make the path links shorter and not as long 
        });

      return <path key={i}
        className='link' 
        fill="none"
        stroke={
          el.target.data.pathWeight === 0 ? '#1E3677' : 
          el.target.data.pathWeight === 0.5 ?  '#55BEC7' : '#F6780D'
      }
        strokeWidth="10px" d={d(el)} />
    })

    // renders the nodes (the circles) to the screen
    nodes = nodes && nodes.map((node: Node, i: number) => {

      return <g
        key={i} transform={`translate(${node.x}, ${node.y})`}
        onClick={() => this.props.selectNode(node.data)}
        onDoubleClick={() => this.toggleChildren(node)}
      >

        {/* Change shape of node depending on if it is stateful or not*/}
        {/* Also changes the color of the node depending on displayWeight */}

        {node.data.state !== null ?
          <rect x="-5" y="0" width="30" height="20"
            style={{
              'stroke': node.data === this.props.clickedNode ? 'red' : '#222',
              'strokeWidth': '2px',
              'fill':
                node.data.displayWeight === 0 ? '#1E3677' :
                  (node.data.displayWeight === 0.5 ? '#55BEC7' : 'F6780D'),
            }} />
          :
          <circle r="14"
            style={{
              'stroke': node.data === this.props.clickedNode ? 'red' : 'black',
              'strokeWidth': '2px',
              'boxShadow': node.data === this.props.clickedNode ? '20px 20px 20px #9ecaed' : 'black',
              'fill':
                node.data.displayWeight === 0 ? '#1E3677' :
                  (node.data.displayWeight === 0.5 ? '#55BEC7' : 'F6780D'),
            }} />
        }

        <text x="8" y="4" textAnchor="start">{node.data.name}</text>
      </g>
    })


    return (
      <div id="leftpanel" className="panel">
        <h1 id="leftpanelheadline" className="title">Component Tree</h1>
        <Stage width="500" height="1000">
          <svg id='legend' transform={`translate(-177,-177), scale(1)`}></svg>
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