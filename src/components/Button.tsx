import { useAppDispatch, useAppSelector } from "../hooks";
import { setTool } from "../state/toolsSlice";

type Props = {
  toolId: number;
  label: string;
  iconSrc?: string;
  className: string;
};

const Button: React.FC<Props> = ({ toolId, label, iconSrc, className }) => {
  const dispatch = useAppDispatch();
  const { selectedTool } = useAppSelector((state) => state.tools);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={`icon ${className}`}
        onClick={() => dispatch(setTool(toolId))}
        style={{ background: selectedTool === toolId ? "rgb(78, 78, 78)" : "" }}
      >
        {iconSrc ? <img src={iconSrc} /> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default Button;
