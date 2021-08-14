import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'


const ToggleHilight = ({getHilight, hilight, className}) => {
  return (
    <div style={{position: "relative", display:"inline-block"}}>
      <div className={`icon ${className}`} onClick={()=> getHilight()} style={{background: (hilight) ? "#fff" : ""}}><FontAwesomeIcon icon={faLightbulb}/></div>
      <span className="icon-label">Hilight</span>
    </div>
  )
}

export default ToggleHilight
