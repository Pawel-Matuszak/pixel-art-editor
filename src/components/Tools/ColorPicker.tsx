import pickerImage from "@/public/picker.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Button from "../Button";

const ColorPicker: React.FC = () => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={selectedTool == 2}
      onClick={() => dispatch(setTool(2))}
      label={"Color Picker"}
      iconSrc={pickerImage.src}
      className={""}
    />
  );
};

export default ColorPicker;
