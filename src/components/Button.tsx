type Props = {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  iconSrc?: string;
  className: string;
};

const Button: React.FC<Props> = ({
  isSelected,
  onClick,
  label,
  iconSrc,
  className,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        className={`icon ${className}`}
        onClick={onClick}
        style={{ background: isSelected ? "rgb(78, 78, 78)" : "" }}
      >
        {iconSrc ? <img src={iconSrc} /> : label}
      </div>
      <span className="icon-label">{label}</span>
    </div>
  );
};

export default Button;
