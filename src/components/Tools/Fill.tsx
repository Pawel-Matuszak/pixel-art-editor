import fillImage from "@/public/fillbucket.png";
import Button from "../Button";

const Fill = ({ handleToolChange, currentTool }) => {
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
