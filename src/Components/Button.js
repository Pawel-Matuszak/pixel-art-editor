import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({handleToolChange, currentTool, toolId, label, icon, className}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon ${className}`} onClick={()=>handleToolChange(toolId)} style={{background: (currentTool===toolId) ? "#fff" : ""}}>{
        (icon) ? <FontAwesomeIcon icon={icon}/> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  )
}

export default Button
