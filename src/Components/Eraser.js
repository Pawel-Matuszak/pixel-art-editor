import React, {useState} from 'react'
import Button from './Button'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

const Eraser = ({handleToolChange, currentTool}) => {
  
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={1} 
      label={"GUM"} 
      icon={faEraser} 
      className={"eraser"}/>
  )
}

export default Eraser
