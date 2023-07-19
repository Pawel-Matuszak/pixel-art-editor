import eraserImage from "@/public/eraser.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Button from "../Button";

const Eraser: React.FC = () => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={selectedTool == 1}
      onClick={() => dispatch(setTool(1))}
      label={"Eraser"}
      iconSrc={eraserImage.src}
      className={"eraser"}
    />
  );
};

export default Eraser;
