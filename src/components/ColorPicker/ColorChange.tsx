import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setPrimaryColor, setSecondaryColor } from "@/src/state/toolsSlice";
import { type IColor } from "@/src/types";
import React, { useEffect, useState } from "react";
import { ChromePicker, type ColorChangeHandler } from "react-color";

interface Props {
  className: string;
}

const ColorChange: React.FC<Props> = ({ className }) => {
  const color = useAppSelector((state) =>
    className == "primary-color"
      ? state.tools.color
      : state.tools.secondaryColor
  );
  const dispatch = useAppDispatch();
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
      onChangeComplete={(color) => {
        const selectedColor = {
          hex: color.hex,
          rgb: {
            r: color.rgb.r,
            g: color.rgb.g,
            b: color.rgb.b,
            a: color.rgb.a || 255,
          },
        };
        dispatch(
          className == "primary-color"
            ? setPrimaryColor(selectedColor)
            : setSecondaryColor(selectedColor)
        ) as unknown as ColorChangeHandler;
      }}
      disableAlpha={true}
    />
  );
};

export default ColorChange;
