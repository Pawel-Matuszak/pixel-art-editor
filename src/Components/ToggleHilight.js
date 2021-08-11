import React from 'react'

const ToggleHilight = ({getHilight, hilight, className}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon ${className}`} onClick={()=>  getHilight()} style={{background: (hilight) ? "#fff" : ""}}>Hilight</div>
      <span className="icon-label">Hilight</span>
    </div>
  )
}

export default ToggleHilight
