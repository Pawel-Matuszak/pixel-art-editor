import brushImage from "@/public/pencil.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Button from "../Button";

const Brush: React.FC = () => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={selectedTool == 0}
      onClick={() => dispatch(setTool(0))}
      label={"Pencil"}
      iconSrc={brushImage.src}
      className={""}
    />
  );
};

export default Brush;
