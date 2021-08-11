import React, {useState, useEffect} from 'react'
import Canvas from './Components/Canvas'
import Eraser from './Components/Eraser'
import ClearAll from './Components/ClearAll'
import ColorSelect from './Components/ColorSelect'
import SizeSlider from './Components/SizeSlider'
import ColorPicker from './Components/ColorPicker'
import Fill from './Components/Fill'
import FillAll from './Components/FillAll'
import Brush from './Components/Brush'
import Zoom from './Components/Zoom'
import HistoryButtons from './Components/HistoryButtons'
import SaveImage from './Components/SaveImage'
import ToggleHilight from './Components/ToggleHilight'
import "@fortawesome/fontawesome-svg-core"


const App = () => {
  const [canvas, setCanvas] = useState(null)
  const [color, setColor] = useState({hex: "#fff"});
  const [secondColor, setSecondColor] = useState({hex: "#000"});
  const [brushSize, setBrushSize] = useState(1)
  const [currentTool, setCurrentTool] = useState(0)
  const [zoom, setZoom] = useState(true)
  const [historyBtns, setHistoryBtns] = useState({undo: "", redo: ""})
  const [canvasClear, setCanvasClear] = useState(true)
  const [hilight, setHilight] = useState(true)

  const getHilight = () =>{
    setHilight(!hilight)
  }

  const getCanvasClear = () =>{
    setCanvasClear(!canvasClear)
  }

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

  const getHistoryBtns = (undo, redo) =>{
    setHistoryBtns({
      undo: undo,
      redo: redo
    })
  }

  const handleToolChange = (tool) =>{
    setCurrentTool(tool)
  }

  useEffect(() => {
    if(currentTool===5){
      setZoom(false)
    }else{
      setZoom(true)
    }
  }, [currentTool])
  
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
          {/* //fill bg? */}

          <FillAll handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Zoom handleToolChange={handleToolChange} currentTool={currentTool}/>
          {/* Shapes */}
          {/* Select */}

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
          currentTool={currentTool}
          handleToolChange={handleToolChange}
          getCanvasRef={getCanvasRef}
          undoBtn={historyBtns.undo}
          redoBtn={historyBtns.redo}
          zoom={zoom}
          canvasClear={canvasClear}
          hilight={hilight}
          />
      </div>
      
      {/* Options */}
      <div className="right-column-container">
        <ClearAll canvas={canvas} getCanvasClear={getCanvasClear}/>
        <HistoryButtons getHistoryBtns={getHistoryBtns}/>
        <SaveImage canvas={canvas}/>
        <ToggleHilight getHilight={getHilight} hilight={hilight} className={"hilight"}/>
      </div>
    </div>
  )
}

export default App
