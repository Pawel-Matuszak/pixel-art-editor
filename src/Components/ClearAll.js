import React from 'react'

const ClearAll = ({canvas}) => {
  const handleClearAll = (canvas) =>{
    canvas.current.getContext("2d").clearRect(0, 0, 2000, 2000);
  }

  return (
      <div className="icon clear-all" onClick={()=>handleClearAll(canvas)}>
        Clear all
      </div>
  )
}

export default ClearAll
