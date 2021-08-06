import React, {useState, useRef} from 'react'

const SaveImage = ({canvas}) => {

  const saveImgRef = useRef()

  const [saveMenu, setSaveMenu] = useState()
  const [formData, setFormData] = useState({
    name: "",
    format: "",
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("A");
    downloadImage()
  }

  const downloadImage = async () =>{
    saveImgRef.current.setAttribute('download', `${formData.name}.${formData.format}`);
    saveImgRef.current.setAttribute('href', canvas.current.toDataURL(`image/${formData.format}`));
    saveImgRef.current.click()
  }

  return (
    <>
    <div style={{position: "relative"}}>
      <div className="icon" onClick={()=>setSaveMenu(!saveMenu)}>Save</div>
      <span className="icon-label">Save</span>
    </div>
    {saveMenu && 
      <div className="save-menu-container">
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.name} onChange={(e)=>setFormData({name: e.target.value, format: formData.format})} placeholder="File name"/>
          <input type="text" value={formData.format} onChange={(e)=>setFormData({name: formData.name, format: e.target.value})} placeholder="File format"/>
          <button type="submit">Save</button>          
          <a ref={saveImgRef}></a>
        </form>
      </div>
    }
    </>
  )
}

export default SaveImage
