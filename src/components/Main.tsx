import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import Canvas from "./Canvas";
import ColorSelect from "./ColorPicker/ColorSelect";
import ColorSwap from "./ColorPicker/ColorSwap";
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
  const [brushSize, setBrushSize] = useState<number>(1);
  const [zoom, setZoom] = useState(true);
  const [canvasClear, setCanvasClear] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const [transform, setTransform] = useState(20);
  const { selectedTool } = useAppSelector((state) => state.tools);

  const getHighlight = () => {
    setHighlight(!highlight);
  };
  const getCanvasClear = () => {
    setCanvasClear(!canvasClear);
  };

  const getCanvasRef = (canvas: React.RefObject<HTMLCanvasElement>) => {
    setCanvas(canvas.current);
  };

  const getBrushSize = (value: number) => {
    setBrushSize(value);
  };

  const getCanvasSize = (x: number) => {
    if (!canvas) return;
    setTransform(Math.ceil(canvas.width / x));
  };

  useEffect(() => {
    if (selectedTool === 5) {
      setZoom(false);
    } else {
      setZoom(true);
    }
  }, [selectedTool]);

  return (
    <>
      <div className="container">
        {/* Brushes and tools */}
        <div className="left-column-container">
          <div className="tools-container">
            <Brush />
            <Eraser />
            <ColorPicker />
            <Fill />
            <Zoom />
            <Rectangle />
          </div>
          <SizeSlider getBrushSize={getBrushSize} />
          <div className="color-picker-container">
            <ColorSelect className="secondary-color" />
            <ColorSelect className="primary-color" />
            <ColorSwap />
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-container">
          <Canvas
            brushSize={brushSize}
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
            className="highlight"
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
