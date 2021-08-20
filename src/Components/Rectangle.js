import React from 'react'
import Button from './Button'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import rectImg from "../content/rect.png"

const Rectangle = ({handleToolChange, currentTool}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon drawRect`} onClick={()=>handleToolChange(6)} style={{background: (currentTool===6) ? "#fff" : ""}}>
        <img src={rectImg} width={30} height={30}/>
      </div>
      <span className="icon-label">Draw Rectangle</span>
    </div>
  )
}

export default Rectangle
