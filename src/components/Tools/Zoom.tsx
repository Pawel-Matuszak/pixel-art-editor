import zoomImage from "@/public/zoom.png";
import Button from "../Button";

interface Props {
  handleToolChange: (toolId: number) => void;
  currentTool: number;
}

const Zoom: React.FC<Props> = ({ handleToolChange, currentTool }) => {
  return (
    <Button
      handleToolChange={handleToolChange}
      currentTool={currentTool}
      toolId={5}
      label={"Zoom"}
      iconSrc={zoomImage.src}
      className={"zoom"}
    />
  );
};

export default Zoom;
