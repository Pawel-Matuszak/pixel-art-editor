import React from 'react'
import Button from './Button'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'

const Zoom = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={5} 
      label={"Zoom"} 
      icon={faSearchPlus} 
      className={"zoom"}/>
  )
}

export default Zoom
