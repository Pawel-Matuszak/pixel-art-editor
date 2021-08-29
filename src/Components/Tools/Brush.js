import React from 'react'
import Button from '../Button'
import brushImage from "../../content/pencil.png"


const Brush = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={0} 
      label={"Pencil"} 
      icon={brushImage} 
      className={""}/>
  )
}

export default Brush
