import React, { useEffect, useRef, useState } from "react"

const Context = React.createContext<object | null>(null)

interface StageProps {
  width: string,
  height: string,
  children: object
}
export const Stage = ({ width, height, children }: StageProps) => {
  
  const svgRef = useRef(null)
  const [svg, setSvg] = useState(null)
  useEffect(() => setSvg(svgRef.current), [])

  return (
    <svg ref={svgRef} width={width} height={height} viewBox="0 0 25000 25000">
      <Context.Provider value={svg}>{children}</Context.Provider>
    </svg>
  )
}

export function useSvg() {
  return React.useContext(Context)
}