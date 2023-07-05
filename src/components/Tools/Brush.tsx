import brushImage from "@/public/pencil.png";
import Button from "../Button";

const Brush = ({ handleToolChange, currentTool }) => {
  console.log(brushImage.src);
  return (
    <Button
      handleToolChange={handleToolChange}
      currentTool={currentTool}
      toolId={0}
      label={"Pencil"}
      iconSrc={brushImage.src}
      className={""}
    />
  );
};

export default Brush;
