import eraserImage from "@/public/eraser.png";
import Button from "../Button";

const Eraser: React.FC = () => {
  return (
    <Button
      toolId={1}
      label={"Eraser"}
      iconSrc={eraserImage.src}
      className={"eraser"}
    />
  );
};

export default Eraser;
