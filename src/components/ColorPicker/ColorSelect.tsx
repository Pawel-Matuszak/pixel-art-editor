import { useAppSelector } from "@/src/hooks";
import { useWindowWidth } from "@/src/hooks/useWindowWidth";
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
  const windowWidth = useWindowWidth();
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
          <span
            className={`color-picker absolute left-full top-0 z-50 ${
              windowWidth < 1280 ? "-top-full left-3/4" : ""
            }`}
          >
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
