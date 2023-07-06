import highlightOnIcon from "@/public/bulb.png";
import highlightOffIcon from "@/public/bulbOff.png";

interface Props {
  getHighlight: () => void;
  highlight: boolean;
  className: string;
}

const ToggleHighlight: React.FC<Props> = ({
  getHighlight,
  highlight,
  className,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        className={`icon ${className}`}
        onClick={getHighlight}
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
