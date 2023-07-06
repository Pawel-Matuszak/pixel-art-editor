import { type IColor } from "@/src/types";
import React, { useEffect, useState } from "react";
import { ChromePicker, type ColorChangeHandler } from "react-color";

type Props = {
  getColor: (color: IColor) => void;
  color: IColor;
};

const ColorChange: React.FC<Props> = ({ getColor, color }) => {
  const [background, setBackground] = useState(
    `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`
  );

  const changeBgr = (color: IColor) => {
    setBackground(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`);
  };

  useEffect(() => {
    setBackground(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`);
  }, [color]);

  return (
    <ChromePicker
      color={background}
      onChange={changeBgr as ColorChangeHandler}
      onChangeComplete={getColor as ColorChangeHandler}
      disableAlpha={true}
    />
  );
};

export default ColorChange;
