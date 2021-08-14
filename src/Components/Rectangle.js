import React from 'react'
import Button from './Button'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'

const Rectangle = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={6} 
      label={"Rectangle"} 
      icon={faPaintBrush} 
      className={""}/>
  )
}

export default Rectangle
