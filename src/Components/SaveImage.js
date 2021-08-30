import React, {useState, useRef} from 'react'
import { faSave,  faTimes, faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import saveIcon from "../content/saveCH.png"
import saveButton from "../content/saveBtn.png"
import timesIcon from "../content/times.png"
import caretIcon from "../content/caret.png"

const SaveImage = ({canvas}) => {

  const saveImgRef = useRef(null)
  const errMsg = useRef(null)

  const [saveMenu, setSaveMenu] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    format: "",
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(formData.name.length<=0 || formData.format.length<=0){
      errMsg.current.innerHTML = "Select name and format";
      return;
    };
    downloadImage();
    errMsg.current.innerHTML = "";
    setSaveMenu(false);
  }

  const downloadImage = async () =>{
    saveImgRef.current.setAttribute('download', `${formData.name}.${formData.format}`);
    saveImgRef.current.setAttribute('href', canvas.current.toDataURL(`image/${formData.format}`));
    saveImgRef.current.click()
  }

  return (
    <>
    <Button
      handleToolChange={setSaveMenu} 
      toolId={!saveMenu} 
      icon={saveIcon}
      label={"Save"} 
      className={"save"}/>
    {saveMenu && 
      <div className="save-menu-container">
        <form onSubmit={handleSubmit} className="dropdown-container">
          <div className="save-title">Save Image</div>
          <div className="exit" onClick={()=>setSaveMenu(false)}><img src={timesIcon}/></div>
          <input type="text" value={formData.name} onChange={(e)=>setFormData({name: e.target.value, format: formData.format})} placeholder="File name"/>
          <div className="dropdown-header" onClick={()=>setDropdown(!dropdown)}>
            <div className="dropdown-header-title" >{formData.format || "Select format"}</div>
            <div className="caret"><img style={{transform: (dropdown) ? "scaleY(1)" : "scaleY(-1)", width: "20px", marginTop: "5px"}}src={caretIcon}/></div>
            {dropdown &&
              <div className="dropdown-list">
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "PNG"})}>PNG</div>
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "JPEG"})}>JPEG</div>
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "BMP"})}>BMP</div>
              </div>
            }
          </div>
          
          <button type="submit">
            <img src={saveButton} alt="save"/>  
          </button>          
          <a ref={saveImgRef}></a>
          <div className="err-msg" ref={errMsg}></div>
        
        </form>
      </div>
    }
    </>
  )
}

export default SaveImage
