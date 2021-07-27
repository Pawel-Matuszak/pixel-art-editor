import React from 'react'

const ColorPicker = ({handleToolChange, currentTool}) => {
  return (
    <div style={{position: "relative"}}>
      <div className="icon" onClick={()=>handleToolChange(2)} style={{background: (currentTool===2) ? "#fff" : ""}}>
        Color Picker
      </div>
      <span className="icon-label">Color Picker</span>
    </div>
    
  )
}

export default ColorPicker
