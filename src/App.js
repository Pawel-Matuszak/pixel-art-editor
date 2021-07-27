import React, {useState, useRef} from 'react'
import Canvas from './Components/Canvas'
import Eraser from './Components/Eraser'
import ClearAll from './Components/ClearAll'
import ColorSelect from './Components/ColorSelect'
import SizeSlider from './Components/SizeSlider'
import ColorPicker from './Components/ColorPicker'
import Fill from './Components/Fill'
import Brush from './Components/Brush'

const App = () => {
  const tools = {
    brush: 0,
    eraser: 1,
    picker: 2,
    fill: 3,
  }
  
  const [canvas, setCanvas] = useState(null)
  const [color, setColor] = useState({hex: "#fff"});
  const [secondColor, setSecondColor] = useState({hex: "#000"});
  const [brushSize, setBrushSize] = useState(1)
  // const [eraser, setEraser] = useState(false)
  // const [picker, setPicker] = useState(false)
  // const [fill, setFill] = useState(false)
  const [currentTool, setCurrentTool] = useState(tools.brush)
  

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

  // const handleEraser = () =>{
  //   setEraser(!eraser)
  // }

  // const handlePicker = () =>{
  //   setPicker(!picker)
  // }

  // const handleFill = () =>{
  //   setFill(!fill)
  // }

  // const exitPicker = (value) =>{
  //   setPicker(value)
  // }

  const handleToolChange = (tool) =>{
    setCurrentTool(tool)
  }
  
  return (
    <div className="container">
      
      {/* Brushes and tools */}
      <div className="left-column-container">
        <SizeSlider getBrushSize={getBrushSize}/>
        <div className="tools-container">
          <Brush handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Eraser handleToolChange={handleToolChange} currentTool={currentTool}/>
          <ColorPicker handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Fill handleToolChange={handleToolChange} currentTool={currentTool}/>

          {/* Zoom */}
          {/* Hilight */}
        </div>
        <div className="color-picker-container">
          <ColorSelect className={"secondary-color"} color={secondColor} getColor={getSecondaryColor}/>
          <ColorSelect className={"primary-color"} color={color} getColor={getColor}/>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <Canvas 
          color={color} 
          secondaryColor={secondColor} 
          brushSize={brushSize} 
          // eraser={eraser} 
          // picker={picker} 
          currentTool={currentTool}
          handleToolChange={handleToolChange}
          getCanvasRef={getCanvasRef} 
          // exitPicker={exitPicker}
          />
      </div>
      
      {/* Options */}
      <div className="right-column-container">
        <ClearAll canvas={canvas}/>

      </div>
    </div>
  )
}

export default App
