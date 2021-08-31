import React from 'react'
import Button from '../Button'
import zoomImage from "../../res/zoom.png"

const Zoom = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={5} 
      label={"Zoom"} 
      icon={zoomImage} 
      className={"zoom"}/>
  )
}

export default Zoom
