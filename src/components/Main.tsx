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
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  const getCanvasClear = () => {
    setCanvasClear(!canvasClear);
  };

  const getCanvasRef = (canvas: React.RefObject<HTMLCanvasElement>) => {
    setCanvas(canvas.current);
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
      <div className="flex h-screen w-screen items-center justify-center max-xl:flex-col">
        {/* Brushes and tools */}
        <div className="m-2 flex w-32 flex-col items-center max-xl:hidden">
          <div className="flex flex-col">
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
        <div className="canvas-container relative mx-0 my-5  overflow-hidden border-4 ">
          <Canvas getCanvasRef={getCanvasRef} canvasClear={canvasClear} />
        </div>

        {/* Options */}
        {canvas && (
          <div className=" m-2 flex w-32 flex-col items-center max-xl:hidden">
            <Settings canvas={canvas} />
            <HistoryButtons />
            <SaveImage canvas={canvas} />
            <ToggleHighlight />
            <ClearAll canvas={canvas} getCanvasClear={getCanvasClear} />
          </div>
        )}

        {/* Mobile Brushes and tools */}
        <div className="flex w-3/4 flex-row flex-wrap justify-center  rounded-t-md  border-2 border-b-0 border-slate-950 bg-sky-800 max-sm:w-11/12 xl:hidden">
          <div className="flex  flex-col items-center justify-center px-2">
            <div className="flex">
              <Brush />
              <Eraser />
              <ColorPicker />
              <Fill />
              <Zoom />
              <Rectangle />
            </div>
            {canvas && (
              <div className="flex">
                <Settings canvas={canvas} />
                <HistoryButtons />
                <SaveImage canvas={canvas} />
                <ToggleHighlight />
                <ClearAll canvas={canvas} getCanvasClear={getCanvasClear} />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center px-2">
            <div className="w-min">
              <SizeSlider />
            </div>
            <div className="color-picker-container">
              <ColorSelect className="secondary-color" />
              <ColorSelect className="primary-color" />
              <ColorSwap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
