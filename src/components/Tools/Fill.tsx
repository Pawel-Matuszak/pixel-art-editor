import fillImage from "@/public/fillbucket.png";
import Button from "../Button";
interface Props {
  handleToolChange: (toolId: number) => void;
  currentTool: number;
}
const Fill: React.FC<Props> = ({ handleToolChange, currentTool }) => {
  return (
    <Button
      handleToolChange={handleToolChange}
      currentTool={currentTool}
      toolId={3}
      label={"Fill"}
      iconSrc={fillImage.src}
      className={""}
    />
  );
};

export default Fill;
