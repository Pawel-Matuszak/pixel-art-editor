import React, {useState, useRef, useEffect} from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import backgroundImage from "../res/bg.png"

//Cursor images
import brushImage from "../res/pencil.png"
import eraserImage from "../res/eraser.png"
import pickerImage from "../res/picker.png"
import fillImage from "../res/fillbucket.png"
import zoomImage from "../res/zoom.png"

const Canvas = ({color, secondaryColor, brushSize, undoBtn, redoBtn, getCanvasRef, currentTool, handleToolChange, zoom, canvasClear, hilight, transform}) => {

  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);
  const hilightCanvasRef = useRef(null);
  const shapesCanvasRef = useRef(null)
  const [cursor, setCursor] = useState(brushImage)
  const [canvasParams, setCanvasParams] = useState({width: 1000, height: 800, transform:transform, originX: 0, originY:0})
  const [offset, setOffset] = useState({x:0, y:0, scale: 1})
  const [historyQueue, setHistoryQueue] = useState({
    history: [],
    redo: []
  })
  const [rectDraw, setRectDraw] = useState(false)
  
  const mousePosition = (e, canvas, offset, canvasParams) =>{
    var rect = canvas.getBoundingClientRect();
    let cursorX = Math.floor((e.clientX - rect.left)/offset.scale/canvasParams.transform);
    // console.log(e.clientX, rect.left);
    let cursorY = Math.floor((e.clientY - rect.top)/offset.scale/canvasParams.transform);
    return {cursorX, cursorY}
  }

  const getColorInRgb = (color)=>{
    return `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
  }

  const brushDraw = (brushSize, cursorX, cursorY, context)=>{
    //if pixel has already been drawn return
    switch (brushSize) {
      case 1:
        context.fillRect(cursorX,cursorY, 1, 1);
        break;
      case 2:
        context.fillRect(cursorX,cursorY, 2, 2);
        break;
      case 3:
        context.fillRect(cursorX-1,cursorY-1, 3, 3);
        break;
      case 4:
        context.fillRect(cursorX-2,cursorY-2, 4, 4);
        break;

      default:
        break;
    }
  } 

  //draw rect
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const shapesCanvas = shapesCanvasRef.current;
    const shapesContext = shapesCanvas.getContext("2d");

    context.drawImage(shapesCanvas, 0,0, canvasParams.width/canvasParams.transform, canvasParams.height/canvasParams.transform)
    shapesContext.clearRect(0,0,canvas.width, canvas.height)

    let newImage = context.getImageData(0,0,canvas.width, canvas.height)
    setHistoryQueue({
      history: [...historyQueue.history, newImage],
      redo: []
    })
  }, [rectDraw])

  //Bg canvas
  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    const context = canvas.getContext("2d");
    const background = new Image();
    background.src = backgroundImage;
    background.onload = function(){
      context.drawImage(background, 0, 0)
    }

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [])

  useEffect(() => {
    setCanvasParams({width: canvasParams.width, height: canvasParams.height, transform:transform, originX: canvasParams.originX, originY:canvasParams.originY})
  }, [transform])
  
  //Main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const hilightCanvas = hilightCanvasRef.current;
    const shapesCanvas = shapesCanvasRef.current;
    const shapesContext = shapesCanvas.getContext("2d");

    context.setTransform(canvasParams.transform, 0, 0, canvasParams.transform, 0, 0, origin.x, origin.y);
    shapesContext.setTransform(canvasParams.transform, 0, 0, canvasParams.transform, 0, 0, origin.x, origin.y);
    getCanvasRef(canvasRef)

    const eraser = (brushSize, cursorX, cursorY) =>{
      switch (brushSize) {
        case 1:
          context.clearRect(cursorX,cursorY, 1, 1);
          break;
        case 2:
          context.clearRect(cursorX,cursorY, 2, 2);
          break;
        case 3:
          context.clearRect(cursorX-1,cursorY-1, 3, 3);
          break;
        case 4:
          context.clearRect(cursorX-2,cursorY-2, 4, 4);
          break;

        default:
          break;
        };
    }

    const picker = (e, cursorX, cursorY) =>{
      const imageData = context.getImageData(cursorX*canvasParams.transform,cursorY*canvasParams.transform, 1, 1);
      if(!imageData.data[3]) return;
      const colorRgb = {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
        a: imageData.data[3]
      }
      if(e.button===0){
        color.rgb = colorRgb
      }else if(e.button===2){
        secondaryColor.rgb = colorRgb
      }
      handleToolChange(0)
    }

    let mouseStart = 0
    let mouseEnd = 0

    const drawRect = (e) =>{
      if(e.type==="mousedown"){
        mouseStart = mousePosition(e, canvas, offset, canvasParams)
        if(e.buttons===1){
          shapesContext.fillStyle = getColorInRgb(color);
        }else if(e.buttons===2){
          shapesContext.fillStyle = getColorInRgb(secondaryColor);
        }
        return;
      }

      mouseEnd = mousePosition(e, canvas, offset, canvasParams);
      shapesContext.clearRect(0,0,canvas.width, canvas.height);

      shapesContext.fillRect(mouseStart.cursorX, mouseStart.cursorY,1,1)
      shapesContext.fillRect(mouseStart.cursorX, mouseEnd.cursorY,1,1)
      shapesContext.fillRect(mouseEnd.cursorX, mouseStart.cursorY,1,1)
      shapesContext.fillRect(mouseEnd.cursorX, mouseEnd.cursorY,1,1)
      shapesContext.fillRect(mouseStart.cursorX, mouseStart.cursorY, 1, mouseEnd.cursorY-mouseStart.cursorY)
      shapesContext.fillRect(mouseStart.cursorX, mouseStart.cursorY, mouseEnd.cursorX-mouseStart.cursorX, 1)
      shapesContext.fillRect(mouseStart.cursorX, mouseStart.cursorY+(mouseEnd.cursorY-mouseStart.cursorY), mouseEnd.cursorX-mouseStart.cursorX, 1)
      shapesContext.fillRect(mouseStart.cursorX+(mouseEnd.cursorX-mouseStart.cursorX), mouseStart.cursorY, 1, mouseEnd.cursorY-mouseStart.cursorY+1)

    
      if(e.type==="mouseup"){
        setRectDraw(!rectDraw)
      }
    }

    //returns current pixel color in rgba (0,0,0,0)
    const pixelColor = (x, y)=>{
      return context.getImageData(x*canvasParams.transform, y*canvasParams.transform, 1, 1).data.join();
    }

    const matchStartColor = (x, y, originPixelColor, e)=>{
      let pixel = pixelColor(x,y)
      
      //anty infinite loop sth idk
      color.rgb.a = 255;
      secondaryColor.rgb.a = 255;
      if(e.button==0){
        if(pixel===`${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`) return false;
      }else if(e.button==2){
        if(pixel===`${secondaryColor.rgb.r},${secondaryColor.rgb.g},${secondaryColor.rgb.b},${secondaryColor.rgb.a}`) return false;
      }
      
      return (pixel==originPixelColor) ? true : false;
    }
    const fill = (e, cursorX, cursorY)=>{
      if(e.type!=="mousedown") return;
      const originPixelColor = pixelColor(cursorX,cursorY)
      
      //queued pixels
      const pixelStack = [[cursorX,cursorY]]

      while(pixelStack.length){
        const pixelPop = pixelStack.pop()
        let x = pixelPop[0]
        let y = pixelPop[1]

        //find the highest pixel thats in the fill area
        while(y>=0 && matchStartColor(x,y,originPixelColor, e)){
          y--
        }
        ++y
        let left = false
        let right = false

        //go down from the highest pixel and add new pixels to the stack
        while(y<canvasParams.height/canvasParams.transform && matchStartColor(x,y,originPixelColor, e)){
          context.fillRect(x,y,1,1)

          //check pixel on the left
          if(x > 0){
            if(matchStartColor(x-1,y,originPixelColor, e)){
              if(!left){
                pixelStack.push([x-1, y]);
                left = true;
              }
            }else if(left){
              left = false;
            }
          }

          if(x < canvasParams.width/canvasParams.transform){
            if(matchStartColor(x+1,y,originPixelColor, e)){
              if(!right){
                pixelStack.push([x+1, y]);
                right = true;
              }
            }else if(right){
              right = false;
            }
          }
          y++
        }
      }
    }

    const handleTools = (e) => {
      e.preventDefault()
      
      //Get cursor current position
      const {cursorX, cursorY} = mousePosition(e, canvas, offset, canvasParams)

      //use selected tool
      switch (currentTool) {
        //Brush
        case 0:
          if(e.type==="contextmenu") return;
          brushDraw(brushSize, cursorX, cursorY, context);
          break;

        //Eraser
        case 1:
          eraser(brushSize, cursorX, cursorY);
          break;
        
        //Picker
        case 2:
          picker(e, cursorX, cursorY);
          break;
        
        //Fill
        case 3:
          fill(e, cursorX, cursorY);
          break;

        //Rect
        case 6:
          drawRect(e, context, shapesContext);
          break;

        default:
          break;
      }
    }

    const handleMouse =  (e) =>{
      //handle mouse buttons
      if(e.buttons===1){
        context.fillStyle = getColorInRgb(color);
      }else if(e.buttons===2){
        context.fillStyle = getColorInRgb(secondaryColor);
      }
      //hanle mouse drag
      if(e.type === "mousedown" && (e.buttons===1 || e.buttons===2)){
        hilightCanvas.addEventListener("mousemove", handleTools)
        hilightCanvas.addEventListener("mouseup", handleMouseUp)
        handleTools(e)
      }
    }

    //event on mouse up
    const handleMouseUp = (e)=>{
      hilightCanvas.removeEventListener("mousemove", handleTools)
      hilightCanvas.removeEventListener("mouseup", handleMouseUp)
      handleTools(e)
    }

    //Set cursor based on selected tool
    const changeCursor = () =>{
      switch(currentTool){
        case 0:
          setCursor(brushImage)
          break;

        //Eraser
        case 1:
          setCursor(eraserImage)
          break;
        
        //Picker
        case 2:
          setCursor(pickerImage)
          break;
        
        //Fill
        case 3:
          setCursor(fillImage)
          break;

        case 5:
          setCursor(zoomImage)
          break;

        default:
          setCursor(brushImage)
          break;
    }}
    changeCursor()
    
    hilightCanvas.addEventListener("mousedown", handleMouse)
    // hilightCanvas.addEventListener("click", handleTools)
    hilightCanvas.addEventListener("contextmenu", handleTools)
    return () => {
      hilightCanvas.removeEventListener("mousedown", handleMouse)
      // hilightCanvas.removeEventListener("click", handleTools)
      hilightCanvas.removeEventListener("contextmenu", handleTools)
    }
  })

  //Hilight canvas
  useEffect(() => {
    const canvas = hilightCanvasRef.current;
    const context = canvas.getContext("2d");
    if(!hilight || (currentTool!==0 && currentTool!==1 && currentTool!==2)){
      context.clearRect(0,0, canvas.width, canvas.height);
      return;
    };
    context.setTransform(canvasParams.transform, 0, 0, canvasParams.transform, 0, 0, origin.x, origin.y);

    const handleHilight = (e)=>{
      const {cursorX, cursorY} = mousePosition(e, canvas, offset, canvasParams)
      context.fillStyle = "rgba(255,255,255,.3)"
      context.clearRect(0,0, canvas.width, canvas.height);
      brushDraw(brushSize, cursorX, cursorY, context)
    }

    canvas.addEventListener("mousemove", handleHilight)
    return () => {
      canvas.removeEventListener("mousemove", handleHilight)
    }
  }, [zoom, hilight, currentTool, brushSize, canvasParams])

  //History handler
  useEffect(() => {
    if(!undoBtn && !redoBtn) return;

    const undo = undoBtn.current;
    const redo = redoBtn.current;
    const hilightCanvas = hilightCanvasRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const handleHistory = (e) => {
      if(e.type!=="mouseup") return;
      // zapisywać tylko zmiany
      let newImage = context.getImageData(0,0,canvas.width, canvas.height)
      setHistoryQueue({
        history: [...historyQueue.history, newImage],
        redo: []
      })
    }

    const undoHistory = () => {
      setHistoryQueue({
        history: historyQueue.history.slice(0,-1),
        redo: [...historyQueue.redo, ...historyQueue.history.slice(-1)]
      })

      if(!historyQueue.history[historyQueue.history.length-1]){
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        return;
      }
    }
  
    const redoHistory = () => {
      if(historyQueue.redo.length<=0) return;
      setHistoryQueue({
        history: [...historyQueue.history, ...historyQueue.redo.slice(-1)],
        redo: historyQueue.redo.slice(0,-1)
      })
    }

    if(historyQueue.history[historyQueue.history.length-1]){
      canvasRef.current.getContext('2d').putImageData(historyQueue.history[historyQueue.history.length-1],0,0)
    }

    undo.addEventListener("click", undoHistory)
    redo.addEventListener("click", redoHistory)
    hilightCanvas.addEventListener("mouseup", handleHistory)
    
    return () =>{
      undo.removeEventListener("click", undoHistory)
      redo.removeEventListener("click", redoHistory)
      hilightCanvas.removeEventListener("mouseup", handleHistory)
    }
  }, [historyQueue, undoBtn])

  //Clear all saves to history
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let newImage = context.getImageData(0,0,canvas.width, canvas.height)
    setHistoryQueue({
      history: [...historyQueue.history, newImage],
      redo: []
    })
  }, [canvasClear])

  return (
    <TransformWrapper
      initialScale={.9}
      minScale={.2}
      maxScale={4}
      disabled={zoom}
      centerZoomedOut={true}
      centerOnInit={true}
      wheel={{step:.05}}
    >
      {({state})=>(
        <>
        <TransformComponent>
          <canvas ref={hilightCanvasRef} 
            className="hilight-canvas" 
            width={canvasParams.width} 
            height={canvasParams.height}
            onMouseMove={()=>setOffset({x: state.positionX, y:state.positionY, scale: state.scale})}
            style={{cursor: `url('${cursor}') 0 40, auto`}}
          ></canvas>
          <canvas id="main-canvas" ref={canvasRef} className="canvas" width={canvasParams.width} height={canvasParams.height}></canvas>
          <canvas id="shapes-canvas" ref={shapesCanvasRef} className="canvas" width={canvasParams.width} height={canvasParams.height}></canvas>
          <canvas ref={backgroundCanvasRef} className="background-canvas" width={canvasParams.width} height={canvasParams.height}></canvas>
        </TransformComponent>
        </>
      )}
    </TransformWrapper>
  )
}

export default Canvas
