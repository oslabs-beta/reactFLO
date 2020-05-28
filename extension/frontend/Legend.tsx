import React, { Component } from "react";
import * as d3 from "d3";

export const Legend = () => {
  // Legend
  const svgLegend = d3.select('#legend');
  // Legend Shapes
  svgLegend.append("circle").attr("cx", 90).attr("cy", 25).attr("r", 50).style("stroke", "white").style("fill", "none").style("stroke-width", '2px')
  svgLegend.append("rect").attr("x", 85).attr("y", 45).attr("width", 10).attr("height", 10).style("stroke", "white").style("fill", "none").style("stroke-width", '2px')
  svgLegend.append("circle").attr("cx", 90).attr("cy", 75).attr("r", 50).style("fill", "#1E3677")
  svgLegend.append("circle").attr("cx", 90).attr("cy", 100).attr("r", 50).style("fill", "#55BEC7")
  svgLegend.append("circle").attr("cx", 90).attr("cy", 125).attr("r", 50).style("fill", "#F6780D")
  // Legend Descriptions
  svgLegend.append("text").attr("x", 110).attr("y", 25).text("Non-Stateful").style("font-size", "15px").attr("alignment-baseline", "middle").style('fill', "white")
  svgLegend.append("text").attr("x", 110).attr("y", 50).text("Stateful").style("font-size", "15px").attr("alignment-baseline", "middle").style('fill', "white")
  svgLegend.append("text").attr("x", 110).attr("y", 75).text("No Relation").style("font-size", "15px").attr("alignment-baseline", "middle").style('fill', "white")
  svgLegend.append("text").attr("x", 110).attr("y", 100).text("Medium Relation").style("font-size", "15px").attr("alignment-baseline", "middle").style('fill', "white")
  svgLegend.append("text").attr("x", 110).attr("y", 125).text("High Relation").style("font-size", "15px").attr("alignment-baseline", "middle").style('fill', "white")
  // Legend Placement
  svgLegend.attr("x", 0)
  svgLegend.attr("y", 0)

  return (
    <div>
      <svg id='legend' width="500px" ></svg>
    </div>

  )
}