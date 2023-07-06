import React, { useEffect, useState } from "react";

interface Props {
  getBrushSize: (value: number) => void;
}

const SizeSlider: React.FC<Props> = ({ getBrushSize }) => {
  const [brushSize, setBrushSize] = useState(1);

  const handleBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setBrushSize(parseInt(e.target.value));
  };

  useEffect(() => {
    getBrushSize(brushSize);
  }, [brushSize]);

  return (
    <div className="brush-size-container">
      <div className="slider">
        <div className="slider-label">
          Size: <input type="text" value={`${brushSize}px`} readOnly></input>
        </div>
        <input
          type="range"
          className="slider-input"
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
