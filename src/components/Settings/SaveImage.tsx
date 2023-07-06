import Button from "@/components/Button";
import caretIcon from "@/public/caret.png";
import saveButton from "@/public/saveBtn.png";
import saveButtonHover from "@/public/saveBtnHover.png";
import saveIcon from "@/public/saveCH.png";
import timesIcon from "@/public/times.png";
import { FormEvent, useRef, useState } from "react";

interface Props {
  canvas: HTMLCanvasElement;
}

const SaveImage: React.FC<Props> = ({ canvas }) => {
  const saveImgRef = useRef<HTMLAnchorElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [saveMenu, setSaveMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    format: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.length <= 0 || formData.format.length <= 0) {
      setErrorMessage("Select name and format");
      return;
    }
    downloadImage();
    setErrorMessage("");
    setSaveMenu(false);
  };

  const downloadImage = () => {
    console.log("downloadImage", canvas);
    if (!saveImgRef.current || !canvas) return;
    console.log(saveImgRef.current);
    saveImgRef.current.setAttribute(
      "download",
      `${formData.name}.${formData.format}`
    );
    saveImgRef.current.setAttribute(
      "href",
      canvas.toDataURL(`image/${formData.format}`)
    );
    saveImgRef.current.click();
  };

  return (
    <>
      <Button
        handleToolChange={setSaveMenu}
        toolId={!saveMenu}
        iconSrc={saveIcon.src}
        label={"Save"}
        className={"save"}
      />
      {saveMenu && (
        <div className="save-menu-container">
          <form onSubmit={handleSubmit} className="dropdown-container">
            <div className="save-title">Save Image</div>
            <div className="exit" onClick={() => setSaveMenu(false)}>
              <img src={timesIcon.src} />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ name: e.target.value, format: formData.format })
              }
              placeholder="File name"
            />
            <div
              className="dropdown-header"
              onClick={() => setDropdown(!dropdown)}
            >
              <div className="dropdown-header-title">
                {formData.format || "Select format"}
              </div>
              <div className="caret">
                <img
                  style={{
                    transform: dropdown ? "scaleY(1)" : "scaleY(-1)",
                    width: "20px",
                    marginTop: "5px",
                  }}
                  src={caretIcon.src}
                />
              </div>
              {dropdown && (
                <div className="dropdown-list">
                  <div
                    className="dropdown-list-item"
                    onClick={() =>
                      setFormData({ name: formData.name, format: "PNG" })
                    }
                  >
                    PNG
                  </div>
                  <div
                    className="dropdown-list-item"
                    onClick={() =>
                      setFormData({ name: formData.name, format: "JPEG" })
                    }
                  >
                    JPEG
                  </div>
                  <div
                    className="dropdown-list-item"
                    onClick={() =>
                      setFormData({ name: formData.name, format: "BMP" })
                    }
                  >
                    BMP
                  </div>
                </div>
              )}
            </div>

            <button type="submit">
              <img
                src={saveButton.src}
                onMouseEnter={(
                  e: React.MouseEvent<HTMLImageElement, MouseEvent>
                ) => {
                  const img = e.currentTarget;
                  img.src = `${saveButtonHover.src}`;
                }}
                onMouseLeave={(
                  e: React.MouseEvent<HTMLImageElement, MouseEvent>
                ) => {
                  e.currentTarget.src = `${saveButton.src}`;
                }}
                alt="save"
              />
            </button>
            <a ref={saveImgRef} href=""></a>
            <div className="err-msg">{errorMessage}</div>
          </form>
        </div>
      )}
    </>
  );
};

export default SaveImage;
