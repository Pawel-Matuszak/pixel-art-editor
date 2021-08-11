import React from 'react'
import Button from './Button'
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons'

const ColorPicker = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={2} 
      label={"Color Picker"} 
      icon={faEyeDropper} 
      className={""}/>
  )
}

export default ColorPicker
