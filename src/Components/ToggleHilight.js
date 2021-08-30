import React from 'react'
import hilightOnIcon from "../content/bulb.png"
import hilightOffIcon from "../content/bulbOff.png"

const ToggleHilight = ({getHilight, hilight, className}) => {
  return (
    <div style={{position: "relative", display:"inline-block"}}>
      <div className={`icon ${className}`} onClick={()=> getHilight()} style={{background: (hilight) ? "rgb(78, 78, 78)" : ""}}>{(hilight) ? <img src={hilightOnIcon}/> : <img src={hilightOffIcon}/>}</div>
      <span className="icon-label">Hilight</span>
    </div>
  )
}

export default ToggleHilight
