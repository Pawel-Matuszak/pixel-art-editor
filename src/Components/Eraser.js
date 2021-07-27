import React, {useState} from 'react'

const Eraser = ({handleToolChange, currentTool}) => {
  
  return (
    <div style={{position: "relative"}}>
      <div className="icon eraser" onClick={()=>handleToolChange(1)} style={{background: (currentTool===1) ? "#fff" : ""}}>GUM</div>
      <span className="icon-label">Eraser</span>
    </div>
  )
}

export default Eraser
