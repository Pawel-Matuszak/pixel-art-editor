import brushImage from "@/public/pencil.png";
import Button from "../Button";

const Brush: React.FC = () => {
  return (
    <Button
      toolId={0}
      label={"Pencil"}
      iconSrc={brushImage.src}
      className={""}
    />
  );
};

export default Brush;
