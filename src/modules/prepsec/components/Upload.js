//library
import React, { useContext } from 'react';
import { useImmer } from "use-immer"
import Axios from "axios"
//component
import './Upload.css'

//context
import ModuleDispatchContext from "../DispatchContext"

function Upload() {
  const moduleDispatch = useContext(ModuleDispatchContext)
  const [state, setState] = useImmer({
    file: {},
    file_name: "",
    selected: false,
    uploadnow: false
  })
  async function UploadFile() {
    if(state.file.name){
    var formdata = new FormData()
    formdata.append("pdf_input", state.file)
    formdata.append('pdf_filename', state.file.name)
    formdata.append('image', "")
    formdata.append('excel', "")
    formdata.append('tsv', "")
    try {
      moduleDispatch({ type: "waiting for data" })
      const response = await Axios.post("/get/", formdata)
      response.statusText === "OK" ? moduleDispatch({ type: "datauploaded", data: response.data }) : window.alert("error")
      console.log(response.data)
    }
    catch (err) {
      console.log(err)
      window.alert("error")
    }
  }else{
    window.alert("Please Upload a File first !!!")
  }
  }
  return (
    <div className="upload">
      <div className="upload-left">
        <ul style={{ fontSize: "12px", height: "54px" }}>
          <li>
            Upload PDF, Click on <strong>NEXT</strong>, Attributes will be generated from PDF
          </li>
          <li>
            Select Peaks, filled up data and Click on <strong>GENERATE ATTRIBUTES</strong>
          </li>
          <li>
            Verify the data in Popup and Click on <strong>UPLOAD TO GDB</strong> to persist data
          </li>
        </ul>
      </div>
      <form className="upload-right">
        <input title="Choose File" onChange={(e) => {
          if (e.target.files.length > 0) {
            setState((draft) => {
              draft.file = e.target.files[0];
              draft.selected = true;
              draft.file_name = e.target.files[0].name;
            }); moduleDispatch({ type: "newfileselected" });
          }
        }} placeholder="No file chosen" className="upload-choose" type="file" />
        <input onClick={(e) => { e.preventDefault(); UploadFile() }} className="upload-next" type="Submit" value="NEXT" readOnly />
      </form>
    </div>
  );
}

export default Upload;
