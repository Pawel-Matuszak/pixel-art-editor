import zoomImage from "@/public/zoom.png";
import Button from "../Button";

const Zoom = ({ handleToolChange, currentTool }) => {
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
