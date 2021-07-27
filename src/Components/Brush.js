import React from 'react'

const Brush = ({handleToolChange, currentTool}) => {
  return (
    <div style={{position: "relative"}}>
      <div className="icon eraser" onClick={()=>handleToolChange(0)} style={{background: (currentTool===0) ? "#fff" : ""}}>Brush</div>
      <span className="icon-label">Brush</span>
    </div>
  )
}

export default Brush
