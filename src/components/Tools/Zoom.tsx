import zoomImage from "@/public/zoom.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Button from "../Button";

const Zoom: React.FC = () => {
  const { selectedTool } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={selectedTool == 5}
      onClick={() => dispatch(setTool(5))}
      label={"Zoom"}
      iconSrc={zoomImage.src}
      className={"zoom"}
    />
  );
};

export default Zoom;
