import brushImage from "@/public/pencil.png";
import Button from "../Button";

interface Props {
  handleToolChange: (toolId: number) => void;
  currentTool: number;
}

const Brush: React.FC<Props> = ({ handleToolChange, currentTool }) => {
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
