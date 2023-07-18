import swapImage from "@/public/swap-colors.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setPrimaryColor, setSecondaryColor } from "@/src/state/toolsSlice";
import { type IColor } from "@/src/types";

const ColorSwap = () => {
  const dispatch = useAppDispatch();
  const { color, secondaryColor } = useAppSelector((state) => state.tools);

  const swapColors = (color: IColor, secondColor: IColor) => {
    const currentSecond = secondColor;
    dispatch(setSecondaryColor(color));
    dispatch(setPrimaryColor(currentSecond));
  };

  return (
    <div
      className="color-swap"
      onClick={() => swapColors(color, secondaryColor)}
    >
      <img src={swapImage.src} alt="Swap colors icon" />
    </div>
  );
};

export default ColorSwap;
