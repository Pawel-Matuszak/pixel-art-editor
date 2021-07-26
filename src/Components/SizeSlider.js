import React, {useState} from 'react'

const SizeSlider = ({getBrushSize}) => {
  const [brushSize, setBrushSize] = useState(1);
  const [hover, setHover] = useState(false)

  const handleBrushSize = (e) =>{
    setBrushSize(parseInt(e.target.value));
  }
  getBrushSize(brushSize);

  return (
    <div className="brush-size-container">
      {hover && <span className="label">Select brush size</span>}
      <input type="range" min="1" max="4" step="1" value={brushSize} onMouseOver={()=>setHover(!hover)} onMouseOut={()=>setHover(false)} onChange={handleBrushSize}></input>
    </div>
  )
}

export default SizeSlider
