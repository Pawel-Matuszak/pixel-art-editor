import zoomImage from "@/public/zoom.png";
import Button from "../Button";

const Zoom: React.FC = () => {
  return (
    <Button
      toolId={5}
      label={"Zoom"}
      iconSrc={zoomImage.src}
      className={"zoom"}
    />
  );
};

export default Zoom;
