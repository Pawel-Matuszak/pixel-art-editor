import React from 'react'

const ColorPicker = ({handlePicker, picker}) => {
  return (
    <div style={{position: "relative"}}>
      <div className="icon" onClick={()=>handlePicker()} style={{background: (picker) ? "#fff" : ""}}>
        Color Picker
      </div>
      <span className="icon-label">Color Picker</span>
    </div>
    
  )
}

export default ColorPicker
