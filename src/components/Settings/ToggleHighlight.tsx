import highlightOnIcon from "@/public/bulb.png";
import highlightOffIcon from "@/public/bulbOff.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setHighlight } from "@/src/state/toolsSlice";

interface Props {
  className: string;
}

const ToggleHighlight: React.FC<Props> = ({ className }) => {
  const { highlight } = useAppSelector((state) => state.tools);
  const dispatch = useAppDispatch();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        className={`icon ${className}`}
        onClick={() => dispatch(setHighlight(!highlight))}
        style={{ background: highlight ? "rgb(78, 78, 78)" : "" }}
      >
        {highlight ? (
          <img src={highlightOnIcon.src} />
        ) : (
          <img src={highlightOffIcon.src} />
        )}
      </div>
      <span className="icon-label">Highlight</span>
    </div>
  );
};

export default ToggleHighlight;
