import React from 'react'
import Button from './Button'

const Fill = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={4} 
      label={"Fill All"} 
      icon={null} 
      className={""}/>
  )
}

export default Fill
