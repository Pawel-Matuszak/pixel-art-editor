import fillImage from "@/public/fillbucket.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Button from "../Button";

const Fill: React.FC = () => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={selectedTool == 3}
      onClick={() => dispatch(setTool(3))}
      label={"Fill"}
      iconSrc={fillImage.src}
      className={""}
    />
  );
};

export default Fill;
