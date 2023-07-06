import pickerImage from "@/public/picker.png";
import Button from "../Button";

interface Props {
  handleToolChange: (toolId: number) => void;
  currentTool: number;
}

const ColorPicker: React.FC<Props> = ({ handleToolChange, currentTool }) => {
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
