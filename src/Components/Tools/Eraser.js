import React, {useState} from 'react'
import Button from '../Button'
import eraserImage from "../../content/eraser.png"


const Eraser = ({handleToolChange, currentTool}) => {
  
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={1} 
      label={"Eraser"} 
      icon={eraserImage} 
      className={"eraser"}/>
  )
}

export default Eraser
