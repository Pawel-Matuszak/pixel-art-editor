import React from 'react'
import Button from './Button'
import { faFillDrip } from '@fortawesome/free-solid-svg-icons'

const Fill = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={3} 
      label={"Fill"} 
      icon={faFillDrip} 
      className={""}/>
  )
}

export default Fill
