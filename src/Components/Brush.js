import React from 'react'
import Button from './Button'

const Brush = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={0} 
      label={"Brush"} 
      icon={null} 
      className={""}/>
  )
}

export default Brush
