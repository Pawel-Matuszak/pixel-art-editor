import highlightOnIcon from "@/public/bulb.png";
import highlightOffIcon from "@/public/bulbOff.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setHighlight } from "@/src/state/toolsSlice";
import Button from "../Button";

const ToggleHighlight: React.FC = () => {
  const { highlight } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <Button
      isSelected={highlight}
      onClick={() => dispatch(setHighlight(!highlight))}
      iconSrc={highlight ? highlightOnIcon.src : highlightOffIcon.src}
      label={"Settings"}
      className={"settings"}
    />
  );
};

export default ToggleHighlight;
