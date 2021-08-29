import React from 'react'

const Button = ({handleToolChange, currentTool, toolId, label, icon, className}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon ${className}`} onClick={()=>handleToolChange(toolId)} style={{background: (currentTool===toolId) ? "rgba(255, 255, 255, 0.35)" : ""}}>{
        (icon) ? <img src={icon}/> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  )
}

export default Button
