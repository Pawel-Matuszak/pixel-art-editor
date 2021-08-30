import React from 'react'

const Button = ({handleToolChange, currentTool, toolId, label, icon, className}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon ${className}`} onClick={()=>handleToolChange(toolId)} style={{background: (currentTool===toolId) ? "rgb(78, 78, 78)" : ""}}>{
        (icon) ? <img src={icon}/> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  )
}

export default Button
