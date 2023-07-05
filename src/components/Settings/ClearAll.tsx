import clearAllIcon from "@/public/times.png";

const ClearAll = ({ canvas, getCanvasClear }) => {
  const handleClearAll = (canvas) => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.current.width, canvas.current.height);
    getCanvasClear();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div className="icon clear-all" onClick={() => handleClearAll(canvas)}>
        <img src={clearAllIcon.src} />
      </div>
      <span className="icon-label">ClearAll</span>
    </div>
  );
};

export default ClearAll;
