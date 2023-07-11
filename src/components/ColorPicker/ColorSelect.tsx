import { useAppSelector } from "@/src/hooks";
import React, { useState } from "react";
import ColorChange from "./ColorChange";

interface Props {
  className: string;
}

const ColorSelect: React.FC<Props> = ({ className }) => {
  const [colorPicker, setColorPicker] = useState(false);
  const toggleColorPicker = () => {
    setColorPicker(!colorPicker);
  };

  const { color, secondaryColor } = useAppSelector((state) => state.tools);

  return (
    <>
      <div
        className={className}
        style={{
          backgroundColor:
            className == "primary-color"
              ? `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`
              : `rgb(${secondaryColor.rgb.r},${secondaryColor.rgb.g},${secondaryColor.rgb.b})`,
        }}
        onClick={toggleColorPicker}
      ></div>
      {colorPicker && (
        <>
          <span className="color-picker">
            <ColorChange className={className} />
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
