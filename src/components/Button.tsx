const Button = ({
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
        onClick={() => handleToolChange(toolId)}
        style={{ background: currentTool === toolId ? "rgb(78, 78, 78)" : "" }}
      >
        {iconSrc ? <img src={iconSrc} /> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default Button;
