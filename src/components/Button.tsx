import { Dispatch } from "react";

type ToolProps = {
  handleToolChange: (toolId: number) => void;
  toolId: number;
};

type DispatchProps = {
  handleToolChange: Dispatch<any>;
  toolId: boolean;
};

type Props = {
  currentTool?: number;
  label: string;
  iconSrc?: string;
  className: string;
} & (ToolProps | DispatchProps);

const Button: React.FC<Props> = ({
  handleToolChange,
  currentTool,
  toolId,
  label,
  iconSrc,
  className,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        className={`icon ${className}`}
        onClick={() => handleToolChange(toolId as number)}
        style={{ background: currentTool === toolId ? "rgb(78, 78, 78)" : "" }}
      >
        {iconSrc ? <img src={iconSrc} /> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default Button;
