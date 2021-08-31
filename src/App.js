import React, {useState, useEffect} from 'react'
import Canvas from './Components/Canvas'
import Eraser from './Components/Tools/Eraser'
import ClearAll from './Components/ClearAll'
import ColorSelect from './Components/ColorSelect'
import SizeSlider from './Components/Tools/SizeSlider'
import ColorPicker from './Components/Tools/ColorPicker'
import Fill from './Components/Tools/Fill'
import Brush from './Components/Tools/Brush'
import Zoom from './Components/Tools/Zoom'
import HistoryButtons from './Components/HistoryButtons'
import SaveImage from './Components/SaveImage'
import ToggleHilight from './Components/ToggleHilight'
import Rectangle from './Components/Tools/Rectangle'
import swapImage from "./res/swap-colors.png"
import Settings from './Components/Settings'


const App = () => {
  const [canvas, setCanvas] = useState(null)
  const [color, setColor] = useState({hex: "#fff", rgb: {r:255, g:255, b:255, a:255}});
  const [secondColor, setSecondColor] = useState({hex: "#000", rgb: {r:0, g:0, b:0, a:255}});
  const [brushSize, setBrushSize] = useState(1)
  const [currentTool, setCurrentTool] = useState(0)
  const [zoom, setZoom] = useState(true)
  const [historyBtns, setHistoryBtns] = useState({undo: "", redo: ""})
  const [canvasClear, setCanvasClear] = useState(true)
  const [hilight, setHilight] = useState(false)
  const [transform, setTransform] = useState(20)

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

  const getCanvasSize = (x)=>{
    setTransform(Math.ceil(canvas.current.width/x))
  }

  const swapColors = (color, secondColor) =>{
      const currentSecond = secondColor
      setSecondColor(color)
      setColor(currentSecond)
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
    <>
    
    <div className="container">
      {/* Brushes and tools */}
      <div className="left-column-container">
        <div className="tools-container">
          <Brush handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Eraser handleToolChange={handleToolChange} currentTool={currentTool}/>
          <ColorPicker handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Fill handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Zoom handleToolChange={handleToolChange} currentTool={currentTool}/>
          <Rectangle handleToolChange={handleToolChange} currentTool={currentTool}/>
          {/* intro */}
          {/* layers */}
          {/* grid */}
        </div>
        <SizeSlider getBrushSize={getBrushSize}/>
        <div className="color-picker-container">
          <ColorSelect className={"secondary-color"} color={secondColor} getColor={getSecondaryColor}/>
          <ColorSelect className={"primary-color"} color={color} getColor={getColor}/>
          <div className="color-swap" onClick={()=>swapColors(color, secondColor)}><img src={swapImage}/></div>
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
          transform={transform}
          />
      </div>
      
      {/* Options */}
      <div className="right-column-container">
        <Settings canvas={canvas} getCanvasSize={getCanvasSize}/>
        <HistoryButtons getHistoryBtns={getHistoryBtns}/>
        <SaveImage canvas={canvas}/>
        <ToggleHilight getHilight={getHilight} hilight={hilight} className={"hilight"}/>
        <ClearAll canvas={canvas} getCanvasClear={getCanvasClear}/>
      </div>
    </div>
    </>
  )
}

export default App
