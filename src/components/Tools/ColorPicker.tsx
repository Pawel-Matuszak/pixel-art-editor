import pickerImage from "@/public/picker.png";
import Button from "../Button";

const ColorPicker: React.FC = () => {
  return (
    <Button
      toolId={2}
      label={"Color Picker"}
      iconSrc={pickerImage.src}
      className={""}
    />
  );
};

export default ColorPicker;
