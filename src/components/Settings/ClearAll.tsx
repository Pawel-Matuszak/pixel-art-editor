import clearAllIcon from "@/public/times.png";

interface Props {
  canvas: HTMLCanvasElement;
  getCanvasClear: () => void;
}

const ClearAll: React.FC<Props> = ({ canvas, getCanvasClear }) => {
  const handleClearAll = (canvas: HTMLCanvasElement) => {
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    getCanvasClear();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="icon clear-all" onClick={() => handleClearAll(canvas)}>
        <img src={clearAllIcon.src} />
      </button>
      <span className="icon-label">ClearAll</span>
    </div>
  );
};

export default ClearAll;
