import React, { Component } from "react";
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { Stage } from "./Stage"
import { ZoomContainer } from "./ZoomContainer"
import { DisplayNode, State } from "../backend/interfaces";
import * as d3 from "d3";


class App extends Component {

  constructor() {
    super();
    this.state = {
      // backend obj stored here
      data: {},
      clickedNode: {},
      paths: [],
      nodes: [],
      data: {},
      toggleChild: true
    }
    this.selectNode = this.selectNode.bind(this);
    this.toggleChildren = this.toggleChildren.bind(this);
  };

  componentDidMount() {
    // confirm function is firing
    // this.setState({ array: 'hello from componentDidMount'})

    chrome.runtime.onMessage.addListener((message) => {
      if (message.id === 'ReactFLO') {
        console.log('CDM app: ', message.message)
        this.setState({
          data: message.message,
        })
      }
    })
  }

  selectNode(node) {
    // assign state
    console.log('Selected: ', node);
    this.setState({
      clickedNode: node,
    });
  }


  toggleChildren(d) {

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
    const stateData = this.state.data;

    // sets the heights and width of the tree to be passed into treemap 
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const height = 1000 - margin.left - margin.right;
    const width = 700 - margin.top - margin.bottom;

    // creating the tree itself
    // setting the size based on previous heights declared above 
    const treeMap = d3.tree().size([height, width]);
    // creating the nodes of the tree 
    const hierarchyNodes = d3.hierarchy(stateData);
    // create the final map with nodes created from data
    const finalMap = treeMap(hierarchyNodes)

    // returns a flat array of objects containing all the parent-child links
    // this will render the paths onto the component
    let paths = finalMap.links();
    // returns a flat array of objects
    // this will render the nodes onto the component
    let nodes = hierarchyNodes.descendants();


    // put paths (the lines on the graph) before & because render goes before component did mount 
    paths = paths && paths.map((el, i) => {
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
    nodes = nodes && nodes.map((node, i) => {
      return <g
        key={i} transform={`translate(${node.x / 2}, ${node.y / 2})`}
        onClick={() => this.props.selectNode(node.data)}
        onDoubleClick={() => this.toggleChildren(node)}
      >

        {/* Change shape of node depending on if it is stateful or not*/}
        {/* Also changes the color of the node depending on displayWeight */}
        {node.data.state === null ?
          <rect x="-3" y="0" width="10" height="10"
            style={{
              'fill':
                node.data.displayWeight === 0 ? 'gray' :
                  (node.data.displayWeight === 0.5 ? 'yellow' : 'green')
            }} />
          :
          <circle r="4"
            style={{
              'fill':
                node.data.displayWeight === 0 ? 'gray' :
                  (node.data.displayWeight === 0.5 ? 'yellow' : 'green')
            }} />
        }

        <text y="0" dy="0" textAnchor="middle">{node.data.type}</text>
      </g>
    })


    return (
      <div className="panelWrap">

        <Stage width="100%" height="1000">
          <ZoomContainer>
            {/* <g transform={`translate(100, 50)`}> */}
            {paths}
            {nodes}
            {/* </g> */}
          </ZoomContainer>
        </Stage>
        <RightPanel clickedNode={this.state.clickedNode} />

      </div>
    )
  }

}
export default App;