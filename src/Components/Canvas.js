import React, {useState, useRef, useEffect} from 'react'
import backgroundImage from "../images/bg.png"

const Canvas = ({color, secondaryColor, brushSize, eraser, getCanvasRef}) => {

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

    const drawPixel = (e) => {
      e.preventDefault()
      var rect = canvas.getBoundingClientRect();
      const cursorX = Math.floor((e.clientX - rect.left)/canvasParams.transform);
      const cursorY = Math.floor((e.clientY - rect.top)/canvasParams.transform);
      switch (brushSize) {
        case 1:
          (eraser) ? context.clearRect(cursorX,cursorY, 1, 1) :  context.fillRect(cursorX,cursorY, 1, 1);
          break;
        case 2:
          (eraser) ? context.clearRect(cursorX,cursorY, 2, 2) :  context.fillRect(cursorX,cursorY, 2, 2);
          break;
        case 3:
          (eraser) ? context.clearRect(cursorX-1,cursorY-1, 3, 3) :  context.fillRect(cursorX-1,cursorY-1, 3, 3);
          break;
        case 4:
          (eraser) ? context.clearRect(cursorX-2,cursorY-2, 4, 4) :  context.fillRect(cursorX-2,cursorY-2, 4, 4);
          break;

        default:
          context.fillRect(cursorX,cursorY, 1, 1);
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
    canvas.addEventListener("mouseup", handleMouse)
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
