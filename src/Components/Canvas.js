import React, {useState, useRef, useEffect} from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import backgroundImage from "../images/bg.png"

const Canvas = ({color, secondaryColor, brushSize, undoBtn, redoBtn, getCanvasRef, currentTool, handleToolChange, zoom, canvasClear}) => {

  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);
  const [canvasParams, setCanvasParams] = useState({width: 50, height: 40, transform:20, originX: 0, originY:0})
  const [offset, setOffset] = useState({x:0, y:0, scale: 1})
  const [historyQueue, setHistoryQueue] = useState({
    history: [],
    redo: []
  })
  
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

  //Main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.setTransform(canvasParams.transform, 0, 0, canvasParams.transform, 0, 0, origin.x, origin.y);
    getCanvasRef(canvasRef)

    //Set mouse pos
    const mousePosition = (e) =>{
      var rect = canvas.getBoundingClientRect();
      let cursorX = Math.floor((e.clientX - rect.left)/offset.scale/canvasParams.transform);
      // console.log(e.clientX, rect.left);
      let cursorY = Math.floor((e.clientY - rect.top)/offset.scale/canvasParams.transform);
      return {cursorX, cursorY}
    }

    //Tools functions
    const brushDraw = (brushSize, cursorX, cursorY)=>{
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
      const colorRgb = imageData.data.join(", ")
      if(e.button===0){
        color.hex = `rgb(${colorRgb})`
      }else if(e.button===2){
        secondaryColor.hex = `rgb(${colorRgb})`
      }
      handleToolChange(0)
    }

    const fillAll = (e) =>{
      if(e.button===0){
        context.fillStyle = color.hex;
        context.fillRect(0,0,canvas.width, canvas.height);
      }else if(e.button===2){
        context.fillStyle = secondaryColor.hex;
        context.fillRect(0,0,canvas.width, canvas.height);
      }
    }

    const zoomPixel = (e, cursorX, cursorY) =>{
      if(e.type!=="click") return;
      // const img = context.getImageData(0, 0, canvas.width, canvas.height)
      // const origin = {x:0, y:0};         // canvas origin
      // var scale = canvasParams.transform;                     // current scale
      // function scaleAt(x, y, scaleBy) {  // at pixel coords x, y scale by scaleBy
      //     scale *= scaleBy;
      //     origin.x = x - (x - origin.x) * scaleBy;
      //     origin.y = y - (y - origin.y) * scaleBy;
      // }
      // scaleAt(cursorX, cursorY, 1.1);   
      // setCanvasParams({width: 50, height: 40, transform:scale, originX: origin.x, originY:origin.y})
      // context.setTransform(scale, 0, 0, scale, origin.x, origin.y);
      // console.log(origin, cursorX, cursorY, scale);
      // context.putImageData(img, 0, 0)
    }

    const handleTools = (e) => {
      e.preventDefault()
      
      //Get cursor position
      const {cursorX, cursorY} = mousePosition(e)

      //Check current tool
      switch (currentTool) {
        //Brush
        case 0:
          brushDraw(brushSize, cursorX, cursorY)
          break;

        //Eraser
        case 1:
          eraser(brushSize, cursorX, cursorY)
          break;
        
        //Picker
        case 2:
          picker(e, cursorX, cursorY)
          break;
        
        //Fill
        case 3:
          if(e.type!=="click") return;
          const cursorCurrentX = cursorX
          const cursorCurrentY = cursorY
          const originPixel = context.getImageData(cursorCurrentX, cursorCurrentY, 1, 1).data.join()

          let quełełełełe = []
          function findLeft(originPixelColor, currentPixelX, currentPixelY) {
            if(originPixelColor!==context.getImageData(currentPixelX-1, currentPixelY, 1, 1).data.join() || currentPixelX-1 < 0){
              return true;
            }else{
              quełełełełe.push({
                x:currentPixelX-1, 
                y:currentPixelY
              })
              return false;
            }
          }
          function findRight(originPixelColor, currentPixelX, currentPixelY) {
            if(originPixelColor!==context.getImageData(currentPixelX+1, currentPixelY, 1, 1).data.join() || currentPixelX+1 > canvas.width/canvasParams.transform){
              return true;
            }else{
              quełełełełe.push({
                x:currentPixelX+1, 
                y:currentPixelY
              })
              return false;
            }
          }
          function findUp(originPixelColor, currentPixelX, currentPixelY) {
            if(originPixelColor!==context.getImageData(currentPixelX, currentPixelY-1, 1, 1).data.join() || currentPixelY-1<0){
              return true; 
            }else{
              quełełełełe.push({
                x:currentPixelX, 
                y:currentPixelY-1
              })
              return false;
            }
          }
          function findDown(originPixelColor, currentPixelX, currentPixelY) {
            if(originPixelColor!==context.getImageData(currentPixelX, currentPixelY+1, 1, 1).data.join() || currentPixelY+1 > canvas.height/canvasParams.transform){
              return true;
            }else{
              quełełełełe.push({
                x:currentPixelX, 
                y:currentPixelY+1
              })
              return false;
            }
          }
          // findLeft(originPixel, cursorCurrentX, cursorCurrentY)
          // findRight(originPixel, cursorCurrentX, cursorCurrentY)
          // findUp(originPixel, cursorCurrentX, cursorCurrentY)
          // findDown(originPixel, cursorCurrentX, cursorCurrentY)
          let findLeftValue = findLeft(originPixel, cursorCurrentX, cursorCurrentY)
          let findRightValue = findRight(originPixel, cursorCurrentX, cursorCurrentY)
          let findUpValue = findUp(originPixel, cursorCurrentX, cursorCurrentY)
          let findDownValue = findDown(originPixel, cursorCurrentX, cursorCurrentY)
          console.log(cursorCurrentY, canvas.height/canvasParams.transform);

          for (let i = 0; true; i++) {
            if(findLeftValue && findRightValue && findUpValue && findDownValue){
              break;
            }else{
              //TODO
              //fix find functions
              //set params of find functions to previous pixel x and y
              findLeftValue = findLeft(originPixel, cursorCurrentX-i, cursorCurrentY)
              findRightValue = findRight(originPixel, cursorCurrentX+i, cursorCurrentY)
              findUpValue = findUp(originPixel, cursorCurrentX, cursorCurrentY-i)
              findDownValue = findDown(originPixel, cursorCurrentX, cursorCurrentY+i)
              console.log(findLeftValue, findRightValue, findUpValue, findDownValue);
              console.log(quełełełełe);
            }
          }

          quełełełełe.forEach(({x,y})=>{
            context.fillRect(x,y,1,1)
          })
          
          // const originPixel = context.getImageData(cursorCurrentX, cursorCurrentY, 1, 1).data.join()

          // let matrix = []
          // function rightPixels(i, currentPixelX, currentPixelY){
          //   const rightPixel = context.getImageData(currentPixelX + canvasParams.transform * i, currentPixelY, 1, 1).data.join()

          //   if(originPixel!==rightPixel || currentPixelX + canvasParams.transform * i > canvas.width){
          //     return;
          //   }else{
          //     matrix.push({
          //       x:(currentPixelX + canvasParams.transform * i)/canvasParams.transform, 
          //       y:currentPixelY/canvasParams.transform
          //     })
          //     rightPixels(i+1, currentPixelX, currentPixelY)
          //   }
          // }

          // function leftPixels(i, currentPixelX, currentPixelY) {
          //   const leftPixel = context.getImageData(currentPixelX - canvasParams.transform * i, currentPixelY, 1, 1).data.join()

          //   if(originPixel!==leftPixel || currentPixelX - canvasParams.transform * i<0){
          //     return
          //   }else{
          //     matrix.push({
          //       x:(currentPixelX - canvasParams.transform * i)/canvasParams.transform, 
          //       y:currentPixelY/canvasParams.transform
          //     })
          //     leftPixels(i+1, currentPixelX, currentPixelY)
          //   }
          // }

          // function downPixels(i, currentPixelX, currentPixelY) {
          //   const downPixel = context.getImageData(currentPixelX, currentPixelY + canvasParams.transform * i, 1, 1).data.join()

          //   if(originPixel!==downPixel || currentPixelY + canvasParams.transform * i>canvas.height){
          //     return
          //   }else{
          //     matrix.push({
          //       x:currentPixelX/canvasParams.transform, 
          //       y:(currentPixelY + canvasParams.transform * i)/canvasParams.transform
          //     })
          //     downPixels(i+1, currentPixelX, currentPixelY)
          //   }
          // }

          // function upPixels(i, currentPixelX, currentPixelY) {
          //   const upPixel = context.getImageData(currentPixelX, currentPixelY - canvasParams.transform * i, 1, 1).data.join()

          //   if(originPixel!==upPixel || currentPixelY - canvasParams.transform * i<0){
          //     return 
          //   }else{
          //     matrix.push({
          //       x:currentPixelX/canvasParams.transform, 
          //       y:(currentPixelY - canvasParams.transform * i)/canvasParams.transform
          //     })
          //     upPixels(i+1, currentPixelX, currentPixelY)
          //   }
          // }

          // function getUniqueListBy(arr, key, key2) {
          //   return [...new Map(arr.map(item => [`${item[key]}+${item[key2]}`, item])).values()]
          // }

          // rightPixels(0, cursorCurrentX, cursorCurrentY)
          // leftPixels(0, cursorCurrentX, cursorCurrentY)
          // upPixels(0, cursorCurrentX, cursorCurrentY)
          // downPixels(0, cursorCurrentX, cursorCurrentY)

          // matrix.forEach(({x,y})=>{
          //   upPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   downPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   rightPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   leftPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          // })

          // matrix = getUniqueListBy(matrix, "x", "y")
          
          // matrix.forEach(({x,y})=>{
          //   upPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   downPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   rightPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          //   leftPixels(0, x*canvasParams.transform, y*canvasParams.transform)
          // })

          // const unique = getUniqueListBy(matrix, "x", "y")

          // unique.forEach(({x,y})=>{
          //   context.fillRect(x,y,1,1)
          // })
          
          break;

        case 4:
          fillAll(e)
          break;

        case 5:
          zoomPixel(e, cursorX, cursorY)
          break;
        default:
          break;
      }
    }

    const handleMouse =  (e) =>{
      //handle mouse buttons
      if(e.buttons===1){
        context.fillStyle = color.hex
      }else if(e.buttons===2){
        context.fillStyle = secondaryColor.hex
      }

      //hanle mouse drag
      if(e.type === "mousedown" && (e.buttons===1 || e.buttons===2)){
        canvas.addEventListener("mousemove", handleTools)
      }else{
        canvas.removeEventListener("mousemove", handleTools)
      }
    }

    

    canvas.addEventListener("mousedown", handleMouse)
    document.addEventListener("mouseup", handleMouse)
    canvas.addEventListener("click", handleTools)
    canvas.addEventListener("contextmenu", handleTools)

    return () => {
      canvas.removeEventListener("mousedown", handleMouse)
      canvas.removeEventListener("click", handleTools)
      canvas.removeEventListener("contextmenu", handleTools)
    }
  })

  //History handler
  useEffect(() => {
    if(!undoBtn && !redoBtn) return;

    const undo = undoBtn.current;
    const redo = redoBtn.current;
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
    canvas.addEventListener("mouseup", handleHistory)
    
    return () =>{
      undo.removeEventListener("click", undoHistory)
      redo.removeEventListener("click", redoHistory)
      canvas.removeEventListener("mouseup", handleHistory)
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
    <>
      <TransformWrapper
      initialScale={1}
      maxScale={4}
      disabled={zoom}
      >
         {({state})=>(
           <>
            <TransformComponent>
              <canvas id="main-canvas" ref={canvasRef} 
              onMouseEnter={
                ()=>setOffset({x: state.positionX, y:state.positionY, scale: state.scale})
              } 
              className="canvas" width={canvasParams.width*canvasParams.transform} height={canvasParams.height*canvasParams.transform}></canvas>
              <canvas ref={backgroundCanvasRef} className="background-canvas" width={canvasParams.width*canvasParams.transform} height={canvasParams.height*canvasParams.transform}></canvas>
            </TransformComponent>
           </>
         )}
      </TransformWrapper>
    </>
  )
}

export default Canvas
