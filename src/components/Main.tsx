import swapImage from "@/public/swap-colors.png";
import { useEffect, useState } from "react";
import { type IColor } from "../types";
import Canvas from "./Canvas";
import ColorSelect from "./ColorPicker/ColorSelect";
import ClearAll from "./Settings/ClearAll";
import HistoryButtons from "./Settings/HistoryButtons";
import SaveImage from "./Settings/SaveImage";
import Settings from "./Settings/Settings";
import ToggleHighlight from "./Settings/ToggleHighlight";
import Brush from "./Tools/Brush";
import ColorPicker from "./Tools/ColorPicker";
import Eraser from "./Tools/Eraser";
import Fill from "./Tools/Fill";
import Rectangle from "./Tools/Rectangle";
import SizeSlider from "./Tools/SizeSlider";
import Zoom from "./Tools/Zoom";

const Main = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<IColor>({
    hex: "#fff",
    rgb: { r: 255, g: 255, b: 255, a: 255 },
  });
  const [secondColor, setSecondColor] = useState<IColor>({
    hex: "#000",
    rgb: { r: 0, g: 0, b: 0, a: 255 },
  });
  const [brushSize, setBrushSize] = useState<number>(1);
  const [currentTool, setCurrentTool] = useState(0);
  const [zoom, setZoom] = useState(true);
  const [canvasClear, setCanvasClear] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const [transform, setTransform] = useState(20);

  const getHighlight = () => {
    setHighlight(!highlight);
  };
  const getCanvasClear = () => {
    setCanvasClear(!canvasClear);
  };

  const getCanvasRef = (canvas: React.RefObject<HTMLCanvasElement>) => {
    setCanvas(canvas.current);
  };

  const getColor = (colorData: IColor) => {
    setColor(colorData);
  };

  const getSecondaryColor = (colorData: IColor) => {
    setSecondColor(colorData);
  };

  const getBrushSize = (value: number) => {
    setBrushSize(value);
  };

  const getCanvasSize = (x: number) => {
    if (!canvas) return;
    setTransform(Math.ceil(canvas.width / x));
  };

  const swapColors = (color: IColor, secondColor: IColor) => {
    const currentSecond = secondColor;
    setSecondColor(color);
    setColor(currentSecond);
  };

  const handleToolChange = (tool: number) => {
    setCurrentTool(tool);
  };

  useEffect(() => {
    if (currentTool === 5) {
      setZoom(false);
    } else {
      setZoom(true);
    }
  }, [currentTool]);

  return (
    <>
      <div className="container">
        {/* Brushes and tools */}
        <div className="left-column-container">
          <div className="tools-container">
            <Brush
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
            <Eraser
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
            <ColorPicker
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
            <Fill
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
            <Zoom
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
            <Rectangle
              handleToolChange={handleToolChange}
              currentTool={currentTool}
            />
          </div>
          <SizeSlider getBrushSize={getBrushSize} />
          <div className="color-picker-container">
            <ColorSelect
              className={"secondary-color"}
              color={secondColor}
              getColor={getSecondaryColor}
            />
            <ColorSelect
              className={"primary-color"}
              color={color}
              getColor={getColor}
            />
            <div
              className="color-swap"
              onClick={() => swapColors(color, secondColor)}
            >
              <img src={swapImage.src} alt="" />
            </div>
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
            zoom={zoom}
            canvasClear={canvasClear}
            highlight={highlight}
            transform={transform}
          />
        </div>

        {/* Options */}
        <div className="right-column-container">
          {canvas && <Settings canvas={canvas} getCanvasSize={getCanvasSize} />}
          <HistoryButtons />
          {canvas && <SaveImage canvas={canvas} />}
          <ToggleHighlight
            getHighlight={getHighlight}
            highlight={highlight}
            className={"highlight"}
          />
          {canvas && (
            <ClearAll canvas={canvas} getCanvasClear={getCanvasClear} />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
