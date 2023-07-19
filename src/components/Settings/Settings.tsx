import settingsIcon from "@/public/cog.png";
import timesIcon from "@/public/times.png";
import { useAppDispatch } from "@/src/hooks";
import { setCanvasTransform } from "@/src/state/toolsSlice";
import { useState } from "react";
import Button from "../Button";

interface Props {
  canvas: HTMLCanvasElement;
}

const Settings: React.FC<Props> = ({ canvas }) => {
  const [settings, setSettings] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [currentOption, setCurrentOption] = useState(40);
  const [hillightOption, setHillightOption] = useState(40);
  const dispatch = useAppDispatch();

  const optionPick = (x: number) => {
    setConfirm(true);
    setCurrentOption(x);
  };
  const handleChange = (x: number) => {
    dispatch(setCanvasTransform(Math.ceil(canvas.width / x)));
    setHillightOption(currentOption);
    canvas?.getContext("2d")?.clearRect(0, 0, 1000, 800);
  };

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
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 90 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(90)}
              >
                90x72
              </div>
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 80 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(80)}
              >
                80x64
              </div>
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 60 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(60)}
              >
                60x48
              </div>
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 50 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(50)}
              >
                50x40
              </div>
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 40 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(40)}
              >
                40x32
              </div>
              <div
                className="option-item"
                style={{
                  backgroundColor:
                    hillightOption === 20 ? "rgb(146, 136, 136)" : "",
                }}
                onClick={() => optionPick(20)}
              >
                20x16
              </div>
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
