import React, {useState} from 'react'

const SizeSlider = ({getBrushSize}) => {
  const [brushSize, setBrushSize] = useState(1);

  const handleBrushSize = (e) =>{
    setBrushSize(parseInt(e.target.value));
  }
  getBrushSize(brushSize);

  return (
    <div className="brush-size-container">
      <div className="slider">
      <div className="slider-label">Brush size: <input type="text" value={brushSize}></input></div>
        <input type="range" className="slider-input" min="1" max="4" step="1" value={brushSize} onChange={handleBrushSize}></input>
      </div>
      
    </div>
  )
}

export default SizeSlider
