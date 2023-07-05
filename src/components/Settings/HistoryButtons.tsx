import undoRedoIcon from "@/public/undo-redo.png";

const HistoryButtons = () => {
  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="icon" id="undo-button">
          <img src={undoRedoIcon.src} alt="Undo button" />
        </div>
        <span className="icon-label">Undo</span>
      </div>

      <div style={{ position: "relative", display: "inline-block" }}>
        <div className="icon" id="redo-button">
          <img
            style={{ transform: "scaleX(-1)" }}
            src={undoRedoIcon.src}
            alt="Redo button"
          />
        </div>
        <span className="icon-label">Redo</span>
      </div>
    </>
  );
};

export default HistoryButtons;
