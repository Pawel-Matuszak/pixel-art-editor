import React from 'react'
import rectImg from "../../res/rect.png"

const Rectangle = ({handleToolChange, currentTool}) => {
  return (
    <div style={{position: "relative"}}>
      <div className={`icon drawRect`} onClick={()=>handleToolChange(6)} style={{background: (currentTool===6) ? "rgb(78, 78, 78)" : ""}}>
        <img src={rectImg} width={30} height={30}/>
      </div>
      <span className="icon-label">Draw Rectangle</span>
    </div>
  )
}

export default Rectangle
