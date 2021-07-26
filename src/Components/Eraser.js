import React, {useState} from 'react'

const Eraser = ({handleEraser, eraser}) => {
  
  return (
    <div style={{position: "relative"}}>
      <div className="icon eraser" onClick={()=>handleEraser()} style={{background: (eraser) ? "#fff" : ""}}>GUM</div>
      <span className="icon-label">Eraser</span>
    </div>
  )
}

export default Eraser
