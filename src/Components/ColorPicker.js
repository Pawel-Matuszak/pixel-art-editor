import React from 'react'
import Button from './Button'

const ColorPicker = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={2} 
      label={"Color Picker"} 
      icon={null} 
      className={""}/>
  )
}

export default ColorPicker
