import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setZoom } from "../state/toolsSlice";
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
  const [canvasClear, setCanvasClear] = useState(true);
  const [transform, setTransform] = useState(20);
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  const getCanvasClear = () => {
    setCanvasClear(!canvasClear);
  };

  const getCanvasRef = (canvas: React.RefObject<HTMLCanvasElement>) => {
    setCanvas(canvas.current);
  };

  const getCanvasSize = (x: number) => {
    if (!canvas) return;
    setTransform(Math.ceil(canvas.width / x));
  };

  useEffect(() => {
    if (selectedTool === 5) {
      dispatch(setZoom(false));
    } else {
      dispatch(setZoom(true));
    }
  }, [selectedTool, dispatch]);

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
          <SizeSlider />
          <div className="color-picker-container">
            <ColorSelect className="secondary-color" />
            <ColorSelect className="primary-color" />
            <ColorSwap />
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-container">
          <Canvas
            getCanvasRef={getCanvasRef}
            canvasClear={canvasClear}
            transform={transform}
          />
        </div>

        {/* Options */}
        {canvas && (
          <div className="right-column-container">
            <Settings canvas={canvas} getCanvasSize={getCanvasSize} />
            <HistoryButtons />
            <SaveImage canvas={canvas} />
            <ToggleHighlight className="highlight" />
            <ClearAll canvas={canvas} getCanvasClear={getCanvasClear} />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
