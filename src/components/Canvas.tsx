import backgroundImage from "@/public/bg.png";
import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

//Cursor images
import eraserImage from "@/public/eraser.png";
import fillImage from "@/public/fillbucket.png";
import brushImage from "@/public/pencil.png";
import pickerImage from "@/public/picker.png";
import zoomImage from "@/public/zoom.png";
import { ICanvasParams, IColor, IHistoryQueue, IOffset } from "@/src/types";
import { useAppSelector } from "../hooks";

interface Props {
  color: IColor;
  secondaryColor: IColor;
  brushSize: number;
  getCanvasRef: (canvas: React.RefObject<HTMLCanvasElement>) => void;
  zoom: boolean;
  canvasClear: boolean;
  highlight: boolean;
  transform: number;
}

const Canvas: React.FC<Props> = ({
  color,
  secondaryColor,
  brushSize,
  getCanvasRef,
  zoom,
  canvasClear,
  highlight,
  transform,
}) => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const shapesCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState<string>(brushImage.src);
  const [canvasParams, setCanvasParams] = useState<ICanvasParams>({
    width: 1000,
    height: 800,
    transform: transform,
    originX: 0,
    originY: 0,
  });
  const [offset, setOffset] = useState<IOffset>({ x: 0, y: 0, scale: 1 });
  const [historyQueue, setHistoryQueue] = useState<IHistoryQueue>({
    history: [],
    redo: [],
  });
  const [rectDraw, setRectDraw] = useState<boolean>(false);

  const mousePosition = (
    e: MouseEvent,
    canvas: HTMLCanvasElement,
    offset: IOffset,
    canvasParams: ICanvasParams
  ) => {
    const rect = canvas.getBoundingClientRect();
    const cursorX = Math.floor(
      (e.clientX - rect.left) / offset.scale / canvasParams.transform
    );
    const cursorY = Math.floor(
      (e.clientY - rect.top) / offset.scale / canvasParams.transform
    );
    return { cursorX, cursorY };
  };

  const getColorInRgb = (color: IColor) => {
    return `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
  };

  const brushDraw = (
    brushSize: number,
    cursorX: number,
    cursorY: number,
    context: CanvasRenderingContext2D
  ) => {
    switch (brushSize) {
      case 1:
        context.fillRect(cursorX, cursorY, 1, 1);
        break;
      case 2:
        context.fillRect(cursorX, cursorY, 2, 2);
        break;
      case 3:
        context.fillRect(cursorX - 1, cursorY - 1, 3, 3);
        break;
      case 4:
        context.fillRect(cursorX - 2, cursorY - 2, 4, 4);
        break;

      default:
        break;
    }
  };

  //draw rect logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const shapesCanvas = shapesCanvasRef.current;
    const shapesContext = shapesCanvas?.getContext("2d");

    if (!shapesCanvas || !shapesContext || !canvas || !context) return;
    context?.drawImage(
      shapesCanvas,
      0,
      0,
      canvasParams.width / canvasParams.transform,
      canvasParams.height / canvasParams.transform
    );
    shapesContext.clearRect(0, 0, canvas.width, canvas.height);

    const newImage = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistoryQueue({
      history: [...historyQueue.history, newImage],
      redo: [],
    });
  }, [rectDraw]);

  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const background = new Image();
    background.src = backgroundImage.src;
    background.onload = function () {
      context.drawImage(background, 0, 0);
    };

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    setCanvasParams({
      width: canvasParams.width,
      height: canvasParams.height,
      transform: transform,
      originX: canvasParams.originX,
      originY: canvasParams.originY,
    });
  }, [transform]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const highlightCanvas = highlightCanvasRef.current;
    const shapesCanvas = shapesCanvasRef.current;
    const shapesContext = shapesCanvas?.getContext("2d");

    context.setTransform(
      canvasParams.transform,
      0,
      0,
      canvasParams.transform,
      0,
      0
      // origin.x,
      // origin.y
    );
    shapesContext?.setTransform(
      canvasParams.transform,
      0,
      0,
      canvasParams.transform,
      0,
      0
      // origin.x,
      // origin.y
    );
    getCanvasRef(canvasRef);

    const eraser = (brushSize: number, cursorX: number, cursorY: number) => {
      switch (brushSize) {
        case 1:
          context.clearRect(cursorX, cursorY, 1, 1);
          break;
        case 2:
          context.clearRect(cursorX, cursorY, 2, 2);
          break;
        case 3:
          context.clearRect(cursorX - 1, cursorY - 1, 3, 3);
          break;
        case 4:
          context.clearRect(cursorX - 2, cursorY - 2, 4, 4);
          break;

        default:
          break;
      }
    };

    const picker = (e: MouseEvent, cursorX: number, cursorY: number) => {
      const imageData = context.getImageData(
        cursorX * canvasParams.transform,
        cursorY * canvasParams.transform,
        1,
        1
      );
      if (!imageData.data[3]) return;
      const colorRgb = {
        r: imageData.data[0] || 0,
        g: imageData.data[1] || 0,
        b: imageData.data[2] || 0,
        a: imageData.data[3] || 0,
      };
      if (e.button === 0) {
        color.rgb = colorRgb;
      } else if (e.button === 2) {
        secondaryColor.rgb = colorRgb;
      }
    };

    let mouseStart = { cursorX: 0, cursorY: 0 };
    let mouseEnd = { cursorX: 0, cursorY: 0 };

    const drawRect = (e: MouseEvent) => {
      if (e.type === "mousedown") {
        mouseStart = mousePosition(e, canvas, offset, canvasParams);
        if (shapesContext && e.buttons === 1) {
          shapesContext.fillStyle = getColorInRgb(color);
        } else if (shapesContext && e.buttons === 2) {
          shapesContext.fillStyle = getColorInRgb(secondaryColor);
        }
        return;
      }

      mouseEnd = mousePosition(e, canvas, offset, canvasParams);
      shapesContext?.clearRect(0, 0, canvas.width, canvas.height);

      shapesContext?.fillRect(mouseStart.cursorX, mouseStart.cursorY, 1, 1);
      shapesContext?.fillRect(mouseStart.cursorX, mouseEnd.cursorY, 1, 1);
      shapesContext?.fillRect(mouseEnd.cursorX, mouseStart.cursorY, 1, 1);
      shapesContext?.fillRect(mouseEnd.cursorX, mouseEnd.cursorY, 1, 1);
      shapesContext?.fillRect(
        mouseStart.cursorX,
        mouseStart.cursorY,
        1,
        mouseEnd.cursorY - mouseStart.cursorY
      );
      shapesContext?.fillRect(
        mouseStart.cursorX,
        mouseStart.cursorY,
        mouseEnd.cursorX - mouseStart.cursorX,
        1
      );
      shapesContext?.fillRect(
        mouseStart.cursorX,
        mouseStart.cursorY + (mouseEnd.cursorY - mouseStart.cursorY),
        mouseEnd.cursorX - mouseStart.cursorX,
        1
      );
      shapesContext?.fillRect(
        mouseStart.cursorX + (mouseEnd.cursorX - mouseStart.cursorX),
        mouseStart.cursorY,
        1,
        mouseEnd.cursorY - mouseStart.cursorY + 1
      );

      if (e.type === "mouseup") {
        setRectDraw(!rectDraw);
      }
    };

    //returns current pixel color in rgba (0,0,0,0)
    const pixelColor = (x: number, y: number) => {
      return context
        .getImageData(
          x * canvasParams.transform,
          y * canvasParams.transform,
          1,
          1
        )
        .data.join();
    };

    const isInBounds = (x: number, y: number) => {
      return (
        x >= 0 &&
        x < canvasParams.width / canvasParams.transform &&
        y >= 0 &&
        y < canvasParams.height / canvasParams.transform
      );
    };

    const matchStartColor = (
      x: number,
      y: number,
      originPixelColor: string,
      e: MouseEvent
    ) => {
      const pixel = pixelColor(x, y);

      color.rgb.a = 255;
      secondaryColor.rgb.a = 255;
      if (e.button == 0) {
        if (
          pixel ===
          `${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`
        )
          return false;
      } else if (e.button == 2) {
        if (
          pixel ===
          `${secondaryColor.rgb.r},${secondaryColor.rgb.g},${secondaryColor.rgb.b},${secondaryColor.rgb.a}`
        )
          return false;
      }

      return pixel == originPixelColor ? true : false;
    };
    const fill = (e: MouseEvent, cursorX: number, cursorY: number) => {
      if (e.type !== "mousedown") return;
      const originPixelColor = pixelColor(cursorX, cursorY);

      const pixelStack = [[cursorX, cursorY]];

      while (pixelStack.length) {
        const pixelPop = pixelStack.pop();
        if (pixelPop === undefined) return;
        const x: number = pixelPop[0] as number;
        let y: number = pixelPop[1] as number;
        while (
          y >= 0 &&
          matchStartColor(x, y, originPixelColor, e) &&
          isInBounds(x, y)
        ) {
          y--;
        }
        ++y;
        let left = false;
        let right = false;

        while (
          y < canvasParams.height / canvasParams.transform &&
          matchStartColor(x, y, originPixelColor, e) &&
          isInBounds(x, y)
        ) {
          context.fillRect(x, y, 1, 1);

          if (x > 0) {
            if (matchStartColor(x - 1, y, originPixelColor, e)) {
              if (!left) {
                pixelStack.push([x - 1, y]);
                left = true;
              }
            } else if (left) {
              left = false;
            }
          }

          if (x < canvasParams.width / canvasParams.transform) {
            if (matchStartColor(x + 1, y, originPixelColor, e)) {
              if (!right) {
                pixelStack.push([x + 1, y]);
                right = true;
              }
            } else if (right) {
              right = false;
            }
          }
          y++;
        }
      }
    };

    const handleTools = (e: MouseEvent) => {
      e.preventDefault();

      //Get cursor current position
      const { cursorX, cursorY } = mousePosition(
        e,
        canvas,
        offset,
        canvasParams
      );

      //use selected tool
      switch (selectedTool) {
        case 0:
          if (e.type === "contextmenu") return;
          brushDraw(brushSize, cursorX, cursorY, context);
          break;

        case 1:
          eraser(brushSize, cursorX, cursorY);
          break;

        case 2:
          picker(e, cursorX, cursorY);
          break;

        case 3:
          fill(e, cursorX, cursorY);
          break;

        case 6:
          drawRect(e);
          break;

        default:
          break;
      }
    };

    const handleMouse = (e: MouseEvent) => {
      if (e.buttons === 1) {
        context.fillStyle = getColorInRgb(color);
      } else if (e.buttons === 2) {
        context.fillStyle = getColorInRgb(secondaryColor);
      }
      if (e.type === "mousedown" && (e.buttons === 1 || e.buttons === 2)) {
        highlightCanvas?.addEventListener("mousemove", handleTools);
        highlightCanvas?.addEventListener("mouseup", handleMouseUp);
        handleTools(e);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      highlightCanvas?.removeEventListener("mousemove", handleTools);
      highlightCanvas?.removeEventListener("mouseup", handleMouseUp);
      handleTools(e);
    };

    const changeCursor = () => {
      switch (selectedTool) {
        case 0:
          setCursor(brushImage.src);
          break;

        case 1:
          setCursor(eraserImage.src);
          break;

        case 2:
          setCursor(pickerImage.src);
          break;

        case 3:
          setCursor(fillImage.src);
          break;

        case 5:
          setCursor(zoomImage.src);
          break;

        default:
          setCursor(brushImage.src);
          break;
      }
    };
    changeCursor();

    highlightCanvas?.addEventListener("mousedown", handleMouse);
    highlightCanvas?.addEventListener("contextmenu", handleTools);
    return () => {
      highlightCanvas?.removeEventListener("mousedown", handleMouse);
      highlightCanvas?.removeEventListener("contextmenu", handleTools);
    };
  });

  //Highlight canvas
  useEffect(() => {
    const canvas = highlightCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;
    if (
      !highlight ||
      (selectedTool !== 0 && selectedTool !== 1 && selectedTool !== 2)
    ) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    context?.setTransform(
      canvasParams.transform,
      0,
      0,
      canvasParams.transform,
      0,
      0
      // origin.x,
      // origin.y
    );

    const handleHighlight = (e: MouseEvent) => {
      const { cursorX, cursorY } = mousePosition(
        e,
        canvas,
        offset,
        canvasParams
      );
      context.fillStyle = "rgba(255,255,255,.3)";
      context.clearRect(0, 0, canvas.width, canvas.height);
      brushDraw(brushSize, cursorX, cursorY, context);
    };

    canvas.addEventListener("mousemove", handleHighlight);
    return () => {
      canvas.removeEventListener("mousemove", handleHighlight);
    };
  }, [zoom, highlight, selectedTool, brushSize, canvasParams]);

  //History handler
  useEffect(() => {
    const highlightCanvas = highlightCanvasRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const handleHistory = (e: MouseEvent) => {
      if (e.type !== "mouseup" || !canvas || !context) return;
      // zapisywać tylko zmiany
      const newImage = context.getImageData(0, 0, canvas.width, canvas.height);
      setHistoryQueue({
        history: [...historyQueue.history, newImage],
        redo: [],
      });
    };

    const undoHistory = () => {
      setHistoryQueue({
        history: historyQueue.history.slice(0, -1),
        redo: [...historyQueue.redo, ...historyQueue.history.slice(-1)],
      });
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!historyQueue.history[historyQueue.history.length - 1] && canvas) {
        context?.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        return;
      }
    };

    const redoHistory = () => {
      if (historyQueue.redo.length <= 0) return;
      setHistoryQueue({
        history: [...historyQueue.history, ...historyQueue.redo.slice(-1)],
        redo: historyQueue.redo.slice(0, -1),
      });
    };

    if (
      historyQueue.history[historyQueue.history.length - 1] &&
      canvas &&
      context
    ) {
      context.putImageData(
        historyQueue.history[historyQueue.history.length - 1] as ImageData,
        0,
        0
      );
    }

    const undoBtn = document.querySelector("#undo-button");
    const redoBtn = document.querySelector("#redo-button");

    undoBtn?.addEventListener("click", undoHistory);
    redoBtn?.addEventListener("click", redoHistory);
    highlightCanvas?.addEventListener("mouseup", handleHistory);

    return () => {
      undoBtn?.removeEventListener("click", undoHistory);
      redoBtn?.removeEventListener("click", redoHistory);
      highlightCanvas?.removeEventListener("mouseup", handleHistory);
    };
  }, [historyQueue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;

    const newImage = context?.getImageData(0, 0, canvas.width, canvas.height);
    setHistoryQueue({
      history: [...historyQueue.history, newImage],
      redo: [],
    });
  }, [canvasClear]);

  return (
    <TransformWrapper
      initialScale={0.9}
      minScale={0.2}
      maxScale={4}
      disabled={zoom}
      centerZoomedOut={true}
      centerOnInit={true}
      wheel={{ step: 0.05 }}
    >
      {({ instance }) => (
        <>
          <TransformComponent>
            <canvas
              ref={highlightCanvasRef}
              className="highlight-canvas"
              width={canvasParams.width}
              height={canvasParams.height}
              onMouseMove={() =>
                setOffset({
                  x: instance.transformState.positionX,
                  y: instance.transformState.positionY,
                  scale: instance.transformState.scale,
                })
              }
              style={{ cursor: `url('${cursor}') 0 40, auto` }}
            ></canvas>
            <canvas
              id="main-canvas"
              ref={canvasRef}
              className="canvas"
              width={canvasParams.width}
              height={canvasParams.height}
            ></canvas>
            <canvas
              id="shapes-canvas"
              ref={shapesCanvasRef}
              className="canvas"
              width={canvasParams.width}
              height={canvasParams.height}
            ></canvas>
            <canvas
              ref={backgroundCanvasRef}
              className="background-canvas"
              width={canvasParams.width}
              height={canvasParams.height}
            ></canvas>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default Canvas;
