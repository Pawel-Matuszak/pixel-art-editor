import React from 'react'
import highlightOnIcon from "../res/bulb.png"
import highlightOffIcon from "../res/bulbOff.png"

const ToggleHighlight = ({getHighlight, highlight, className}) => {
  return (
    <div style={{position: "relative", display:"inline-block"}}>
      <div className={`icon ${className}`} onClick={()=> getHighlight()} style={{background: (highlight) ? "rgb(78, 78, 78)" : ""}}>{(highlight) ? <img src={highlightOnIcon}/> : <img src={highlightOffIcon}/>}</div>
      <span className="icon-label">Highlight</span>
    </div>
  )
}

export default ToggleHighlight
