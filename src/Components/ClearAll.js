import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ClearAll = ({canvas, getCanvasClear}) => {
  const handleClearAll = (canvas) =>{
    canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height);
    getCanvasClear()
  }

  return (
    <div style={{position: "relative"}}>
      <div className="icon clear-all" onClick={()=>handleClearAll(canvas)}><FontAwesomeIcon icon={faTimesCircle}/></div>
      <span className="icon-label">ClearAll</span>
    </div>
  )
}

export default ClearAll
