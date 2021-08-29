import React from 'react'
import Button from '../Button'
import pickerImage from "../../content/picker.png"

const ColorPicker = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={2} 
      label={"Color Picker"} 
      icon={pickerImage} 
      className={""}/>
  )
}

export default ColorPicker
