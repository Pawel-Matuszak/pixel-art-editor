import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setBrushSize } from "@/src/state/toolsSlice";
import React from "react";

const SizeSlider: React.FC = () => {
  const { brushSize } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  const handleBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrushSize(parseInt(e.target.value)));
  };

  return (
    <div className="brush-size-container">
      <div className="slider">
        <div className="slider-label ">
          Size:{" "}
          <input
            className="bg-gray-400"
            type="text"
            value={`${brushSize}px`}
            readOnly
          ></input>
        </div>
        <input
          type="range"
          className="slider-input bg-gray-400"
          min="1"
          max="4"
          step="1"
          value={brushSize}
          onChange={handleBrushSize}
        ></input>
      </div>
    </div>
  );
};

export default SizeSlider;
