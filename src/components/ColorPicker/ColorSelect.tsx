import { IColor } from "@/src/types";
import React, { useState } from "react";
import ColorChange from "./ColorChange";

interface Props {
  className: string;
  color: IColor;
  getColor: (color: IColor) => void;
}

const ColorSelect: React.FC<Props> = ({ className, color, getColor }) => {
  const [colorPicker, setColorPicker] = useState(false);
  const toggleColorPicker = () => {
    setColorPicker(!colorPicker);
  };

  return (
    <>
      <div
        className={className}
        style={{
          backgroundColor: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`,
        }}
        onClick={toggleColorPicker}
      ></div>
      {colorPicker && (
        <>
          <span className="color-picker">
            <ColorChange color={color} getColor={getColor} />
          </span>
          <span
            className="color-picker-exit"
            onClick={() => setColorPicker(false)}
          ></span>
        </>
      )}
    </>
  );
};

export default ColorSelect;
