import React, {useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'

const HistoryButtons = ({getHistoryBtns}) => {
  const undoBtn = useRef(null)
  const redoBtn = useRef(null)

  useEffect(() => {
    getHistoryBtns(undoBtn, redoBtn)
  }, [])

  return (
    <>
      <div style={{position: "relative"}}>
        <div className="icon" ref={undoBtn}><FontAwesomeIcon icon={faUndo}/></div>
        <span className="icon-label">Undo</span>
      </div>

      <div style={{position: "relative"}}>
        <div className="icon" ref={redoBtn}><FontAwesomeIcon icon={faRedo}/></div>
        <span className="icon-label">Redo</span>
      </div>
    </>
  )
}

export default HistoryButtons
