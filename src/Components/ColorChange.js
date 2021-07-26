import React, {useState} from 'react'
import { ChromePicker } from 'react-color'

const ColorChange = ({getColor, color}) => {

  const [background, setBackground] = useState(color);

  const changeBgr = (color)=>{
    setBackground(color.hex)
  }

  return (
      <ChromePicker color={background} onChange={changeBgr} onChangeComplete={getColor}/>
  )
}

export default ColorChange
