import React from 'react'
import Button from './Button'

const Zoom = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={5} 
      label={"Zoom"} 
      icon={null} 
      className={"zoom"}/>
  )
}

export default Zoom
