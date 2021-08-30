import React, {useState, useRef} from 'react'
import settingsIcon from "../content/cog.png"
import timesIcon from "../content/times.png"
import Button from './Button'

const Settings = ({canvas, getCanvasSize}) => {

  const [settings, setSettings] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [currentOption, setCurrentOption] = useState(0)


  const optionPick = (x) =>{
    setConfirm(true)
    setCurrentOption(x)
  }
  const handleChange = (x) =>{
    getCanvasSize(x)
    canvas.current.getContext("2d").clearRect(0,0,1000,800)
  }

  return (
    //select canvas size
    <div className="settings">
      <Button
        handleToolChange={setSettings} 
        toolId={!settings} 
        icon={settingsIcon}
        label={"Settings"} 
        className={"settings"}/>
      {settings && 
        <div className="save-menu-container">
          <div className="settings-menu-container">
            <div className="settings-title">Select canvas size</div>
            <div className="exit" onClick={()=>setSettings(false)}><img src={timesIcon}/></div>
            <div className="options-size">
              <div className="option-item" onClick={()=>optionPick(90)}>90x72</div>
              <div className="option-item" onClick={()=>optionPick(80)}>80x64</div>
              <div className="option-item" onClick={()=>optionPick(60)}>60x48</div>
              <div className="option-item" onClick={()=>optionPick(50)}>50x40</div>
              <div className="option-item" onClick={()=>optionPick(40)}>40x32</div>
              <div className="option-item" onClick={()=>optionPick(20)}>20x16</div>
            </div>
          {confirm && 
          <div className="confirm-container">
              Canvas will be cleared. Do you want to continue?
              <div className="options">
                <div className="option" onClick={()=>{
                    handleChange(currentOption)
                    setSettings(false)
                    setConfirm(false)
                  }}>Yes</div>
                <div className="option" onClick={()=>setConfirm(false)}>No</div>
              </div>
          </div>}
          </div>
        </div>
      }
      </div>
  )
}

export default Settings
