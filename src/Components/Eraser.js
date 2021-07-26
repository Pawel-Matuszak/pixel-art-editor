import React, {useState} from 'react'

const Eraser = ({handleEraser, eraser}) => {
  
  return (
    <div className="eraser" onClick={()=>handleEraser()} style={{background: (eraser) ? "#f0f" : "#fff"}}>
      GUM
    </div>
  )
}

export default Eraser
