import eraserImage from "@/public/eraser.png";
import Button from "../Button";

interface Props {
  handleToolChange: (toolId: number) => void;
  currentTool: number;
}

const Eraser: React.FC<Props> = ({ handleToolChange, currentTool }) => {
  return (
    <Button
      handleToolChange={handleToolChange}
      currentTool={currentTool}
      toolId={1}
      label={"Eraser"}
      iconSrc={eraserImage.src}
      className={"eraser"}
    />
  );
};

export default Eraser;
