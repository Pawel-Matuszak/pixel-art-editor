import React, {useState, useEffect} from 'react'
import { ChromePicker } from 'react-color'

const ColorChange = ({getColor, color}) => {

  const [background, setBackground] = useState(color);

  const changeBgr = (color)=>{
    setBackground(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
  }

  useEffect(() => {
    setBackground(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
  }, [color])

  return (
      <ChromePicker color={background} onChange={changeBgr} onChangeComplete={getColor} disableAlpha={true}/>
  )
}

export default ColorChange
