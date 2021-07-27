import React from 'react'

const ClearAll = ({canvas}) => {
  const handleClearAll = (canvas) =>{
    canvas.current.getContext("2d").clearRect(0, 0, 2000, 2000);
  }

  return (
    <div style={{position: "relative"}}>
      <div className="icon clear-all" onClick={()=>handleClearAll(canvas)}>Clear all</div>
      <span className="icon-label">ClearAll</span>
    </div>
  )
}

export default ClearAll
