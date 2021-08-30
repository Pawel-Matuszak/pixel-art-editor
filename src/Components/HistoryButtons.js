import React, {useEffect, useRef} from 'react'
import undoRedoIcon from "../content/undo-redo.png"

const HistoryButtons = ({getHistoryBtns}) => {
  const undoBtn = useRef(null)
  const redoBtn = useRef(null)

  useEffect(() => {
    getHistoryBtns(undoBtn, redoBtn)
  }, [])

  return (
    <>
      <div style={{position: "relative", display:"inline-block"}}>
        <div className="icon" ref={undoBtn}><img src={undoRedoIcon}/></div>
        <span className="icon-label">Undo</span>
      </div>

      <div style={{position: "relative", display:"inline-block"}}>
        <div className="icon" ref={redoBtn}><img style={{transform: "scaleX(-1)"}} src={undoRedoIcon}/></div>
        <span className="icon-label">Redo</span>
      </div>
    </>
  )
}

export default HistoryButtons
