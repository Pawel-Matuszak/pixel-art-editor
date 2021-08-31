import React from 'react'
import Button from '../Button'
import fillImage from "../../res/fillbucket.png"

const Fill = ({handleToolChange, currentTool}) => {
  return (
    <Button 
      handleToolChange={handleToolChange} 
      currentTool={currentTool} 
      toolId={3} 
      label={"Fill"} 
      icon={fillImage} 
      className={""}/>
  )
}

export default Fill
