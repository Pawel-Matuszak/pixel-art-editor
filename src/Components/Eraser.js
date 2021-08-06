import React, {useState} from 'react'
import Button from './Button'

const Eraser = ({handleToolChange, currentTool}) => {
  
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={1} 
      label={"GUM"} 
      icon={null} 
      className={"eraser"}/>
  )
}

export default Eraser
