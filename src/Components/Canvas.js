import React, {useState, useRef, useEffect} from 'react'
import backgroundImage from "../images/bg.png"

const Canvas = ({color, secondaryColor, brushSize, eraser, picker, exitPicker, getCanvasRef, currentTool, handleToolChange}) => {

  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null)
  const [canvasParams, setCanvasParams] = useState({width: 50, height: 40, transform: 20})
  // const [brushParams, setBrushParams] = useState(color)
  // console.log(brushParams);


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
    context.setTransform(canvasParams.transform, 0, 0, canvasParams.transform, 0, 0);
    getCanvasRef(canvasRef)

    const mousePosition = (e) =>{
      var rect = canvas.getBoundingClientRect();
      const cursorX = Math.floor((e.clientX - rect.left)/canvasParams.transform);
      const cursorY = Math.floor((e.clientY - rect.top)/canvasParams.transform);
      return {cursorX, cursorY}
    }

    const drawPixel = (e) => {
      e.preventDefault()
      
      //Get cursor position
      const {cursorX, cursorY} = mousePosition(e)

      //Check current tool
      switch (currentTool) {
        //Brush
        case 0:
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
          break;

        //Eraser
        case 1:
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
            }
          break;
        
        //Picker
        case 2:
          const imageData = context.getImageData(cursorX*canvasParams.transform,cursorY*canvasParams.transform, 1, 1);
          if(!imageData.data[3]) return;
          const colorRgb = imageData.data.join(", ")
          if(e.button===0){
            color.hex = `rgb(${colorRgb})`
          }else if(e.button===2){
            secondaryColor.hex = `rgb(${colorRgb})`
          }
          handleToolChange(0)
          break;
        
        //Fill
        case 3:
          if(e.type!=="click") return;
          const cursorCurrentX = cursorX*canvasParams.transform
          const cursorCurrentY = cursorY*canvasParams.transform

          const currentPixel = context.getImageData(cursorCurrentX, cursorCurrentY, 1, 1).data.join()

          const matrix = []
          function rightPixels(i){
            const rightPixel = context.getImageData(cursorCurrentX + canvasParams.transform * i, cursorCurrentY, 1, 1).data.join()

            if(currentPixel!==rightPixel || cursorCurrentX + canvasParams.transform * i > canvas.width){
              return;
            }else{
              matrix.push({
                x:(cursorCurrentX + canvasParams.transform * i)/canvasParams.transform, 
                y:cursorCurrentY/canvasParams.transform
              })
              rightPixels(i+1)
            }
          }

          function leftPixels(i) {
            const leftPixel = context.getImageData(cursorCurrentX - canvasParams.transform * i, cursorCurrentY, 1, 1).data.join()

            if(currentPixel!==leftPixel || cursorCurrentX - canvasParams.transform * i<0){
              return
            }else{
              matrix.push({
                x:(cursorCurrentX - canvasParams.transform * i)/canvasParams.transform, 
                y:cursorCurrentY/canvasParams.transform
              })
              leftPixels(i+1)
            }
          }
          

          rightPixels(0)
          leftPixels(0)

          console.log(matrix);
          
          matrix.forEach(({x,y})=>{
            context.fillRect(x,y,1,1)
          })
          
          //Fill all logic,
          // if(e.button===0){
          //   context.fillStyle = color.hex;
          //   context.fillRect(0,0,canvas.width, canvas.height);
          // }else if(e.button===2){
          //   context.fillStyle = secondaryColor.hex;
          //   context.fillRect(0,0,canvas.width, canvas.height);
          // }
          break;

        case 4:
          
          break;

        default:
          break;
      }
    }

    const handleMouse = (e) =>{
      //handle mouse buttons
      if(e.buttons===1){
        context.fillStyle = color.hex
      }else if(e.buttons===2){
        context.fillStyle = secondaryColor.hex
      }

      //hanle mouse drag
      if(e.type === "mousedown" && (e.buttons===1 || e.buttons===2)){
        canvas.addEventListener("mousemove", drawPixel)
      }else{
        canvas.removeEventListener("mousemove", drawPixel)
      }
    }

    canvas.addEventListener("mousedown", handleMouse)
    document.addEventListener("mouseup", handleMouse)
    canvas.addEventListener("click", drawPixel)
    canvas.addEventListener("contextmenu", drawPixel)
    // document.querySelector(".canvas").addEventListener("mousemove", drawPixel)

    return () => {
      canvas.removeEventListener("mousedown", handleMouse)
      canvas.removeEventListener("mouseup", handleMouse)
      canvas.removeEventListener("click", drawPixel)
      canvas.removeEventListener("contextmenu", drawPixel)
    }
  })


  return (
    <>
      <canvas id="main-canvas" ref={canvasRef} className="canvas" width={canvasParams.width*canvasParams.transform} height={canvasParams.height*canvasParams.transform}></canvas>
      <canvas ref={backgroundCanvasRef} className="background-canvas" width={canvasParams.width*canvasParams.transform} height={canvasParams.height*canvasParams.transform}></canvas>
    </>
  )
}

export default Canvas
