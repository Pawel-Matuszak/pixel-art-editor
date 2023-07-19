import settingsIcon from "@/public/cog.png";
import timesIcon from "@/public/times.png";
import { useAppDispatch } from "@/src/hooks";
import { setCanvasTransform, setTransformFactor } from "@/src/state/toolsSlice";
import { useState } from "react";
import Button from "../Button";

interface Props {
  canvas: HTMLCanvasElement;
}

const Settings: React.FC<Props> = ({ canvas }) => {
  const [settings, setSettings] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [currentOption, setCurrentOption] = useState(40);
  const [highlightedOption, setHighlightedOption] = useState(40);
  const dispatch = useAppDispatch();

  const optionPick = (x: number) => {
    setConfirm(true);
    setCurrentOption(x);
  };
  const handleChange = (x: number) => {
    dispatch(setTransformFactor(x));
    dispatch(setCanvasTransform(Math.ceil(canvas.width / x)));
    setHighlightedOption(currentOption);
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const canvasSizes = [
    { width: 90, height: 72 },
    { width: 80, height: 64 },
    { width: 60, height: 48 },
    { width: 50, height: 40 },
    { width: 40, height: 32 },
    { width: 20, height: 16 },
  ];

  return (
    //select canvas size
    <div className="settings">
      <Button
        isSelected={settings}
        onClick={() => setSettings(!settings)}
        iconSrc={settingsIcon.src}
        label={"Settings"}
        className={"settings"}
      />
      {settings && (
        <div className="save-menu-container">
          <div className="settings-menu-container">
            <div className="settings-title">Select canvas size</div>
            <div className="exit" onClick={() => setSettings(false)}>
              <img src={timesIcon.src} />
            </div>
            <div className="options-size">
              {canvasSizes.map((size, index) => (
                <div
                  className={`option-item bg-slate-400 text-slate-100 hover:bg-slate-500 ${
                    highlightedOption == size.width ? "bg-slate-500" : ""
                  }`}
                  key={index}
                  onClick={() => optionPick(size.width)}
                >
                  {size.width}x{size.height}
                </div>
              ))}
            </div>
            {confirm && (
              <div className="confirm-container">
                Canvas will be cleared. Do you want to continue?
                <div className="options">
                  <div
                    className="option"
                    onClick={() => {
                      handleChange(currentOption);
                      setSettings(false);
                      setConfirm(false);
                    }}
                  >
                    Yes
                  </div>
                  <div className="option" onClick={() => setConfirm(false)}>
                    No
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
