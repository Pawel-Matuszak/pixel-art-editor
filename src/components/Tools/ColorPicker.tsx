import pickerImage from "@/public/picker.png";
import Button from "../Button";

const ColorPicker = ({ handleToolChange, currentTool }) => {
  return (
    <Button
      handleToolChange={handleToolChange}
      currentTool={currentTool}
      toolId={2}
      label={"Color Picker"}
      iconSrc={pickerImage.src}
      className={""}
    />
  );
};

export default ColorPicker;
