import React, {useState} from 'react'
import { ChromePicker } from 'react-color'

const ColorChange = ({getColor, color}) => {

  const [background, setBackground] = useState(color);

  const changeBgr = (color)=>{
    setBackground(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
  }

  return (
      <ChromePicker color={background} onChange={changeBgr} onChangeComplete={getColor} disableAlpha={true}/>
  )
}

export default ColorChange
