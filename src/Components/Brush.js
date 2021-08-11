import React from 'react'
import Button from './Button'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'

const Brush = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={0} 
      label={"Brush"} 
      icon={faPaintBrush} 
      className={""}/>
  )
}

export default Brush
