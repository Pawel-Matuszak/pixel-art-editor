import React, {useState, useRef} from 'react'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'


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
      errMsg.current.innerHTML = "Set name and format";
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
      icon={faSave}
      label={"Save"} 
      className={"save"}/>
    {saveMenu && 
      <div className="save-menu-container">
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.name} onChange={(e)=>setFormData({name: e.target.value, format: formData.format})} placeholder="File name"/>

          <div className="dropdown-container">
            <div className="dropdown-header">
              <div className="dropdown-header-title" onClick={()=>setDropdown(!dropdown)}>{formData.format || "Select format"}</div>
            </div>
            {dropdown &&
              <div className="dropdown-list">
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "png"})}>PNG</div>
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "jpeg"})}>JPEG</div>
                <div className="dropdown-list-item" onClick={()=>setFormData({name: formData.name, format: "bmp"})}>BMP</div>
              </div>
            }
            <div className="err-msg" ref={errMsg}></div>
          </div>

          <button type="submit">Save</button>          
          <a ref={saveImgRef}></a>
        </form>
      </div>
    }
    </>
  )
}

export default SaveImage
