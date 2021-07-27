import React from 'react'

const Fill = ({handleToolChange, currentTool}) => {
  return (
    <div style={{position: "relative"}}>
      <div className="icon eraser" onClick={()=>handleToolChange(3)} style={{background: (currentTool===3) ? "#fff" : ""}}>Fill</div>
      <span className="icon-label">Fill</span>
    </div>
  )
}

export default Fill
