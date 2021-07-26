import React, {useState, useRef} from 'react'
import Canvas from './Components/Canvas'
import Eraser from './Components/Eraser'
import ClearAll from './Components/ClearAll'
import ColorSelect from './Components/ColorSelect'
import SizeSlider from './Components/SizeSlider'

const App = () => {
  const [canvas, setCanvas] = useState(null)
  const [color, setColor] = useState({hex: "#fff"});
  const [secondColor, setSecondColor] = useState({hex: "#000"});
  const [brushSize, setBrushSize] = useState(1)
  const [eraser, setEraser] = useState(false)

  const getCanvasRef = (canvas) =>{
    setCanvas(canvas)
  }

  const getColor = (colorData) =>{
    setColor(colorData)
  }

  const getSecondaryColor = (colorData) =>{
    setSecondColor(colorData)
  }

  const getBrushSize = (value) =>{
    setBrushSize(value)
  }

  const handleEraser = () =>{
    setEraser(!eraser)
  }
  
  return (
    <div className="container">
      
      {/* Brushes and tools */}
      <div className="left-column-container">
        <SizeSlider getBrushSize={getBrushSize}/>
        <div className="tools-container">
          <Eraser handleEraser={handleEraser} eraser={eraser}/>
          <ClearAll canvas={canvas}/>
        </div>
        <div className="color-picker-container">
          <ColorSelect className={"secondary-color"} color={secondColor} getColor={getSecondaryColor}/>
          <ColorSelect className={"primary-color"} color={color} getColor={getColor}/>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <Canvas color={color} secondaryColor={secondColor} brushSize={brushSize} eraser={eraser} getCanvasRef={getCanvasRef}/>
      </div>
      
      {/* Options */}
      <div className="right-column-container">

      </div>
    </div>
  )
}

export default App
