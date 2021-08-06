import React, {useEffect, useRef} from 'react'

const HistoryButtons = ({getHistoryBtns}) => {
  const undoBtn = useRef(null)
  const redoBtn = useRef(null)

  useEffect(() => {
    getHistoryBtns(undoBtn, redoBtn)
  }, [])

  return (
    <>
      <div style={{position: "relative"}}>
        <div className="icon" ref={undoBtn}>Undo</div>
        <span className="icon-label">Undo</span>
      </div>

      <div style={{position: "relative"}}>
        <div className="icon" ref={redoBtn}>Redo</div>
        <span className="icon-label">Redo</span>
      </div>
    </>
  )
}

export default HistoryButtons
