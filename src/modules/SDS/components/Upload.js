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
    if (state.file.name) {
      var formdata = new FormData()
      formdata.append("image_file", state.file)
      // formdata.append('pdf_filename', state.file.name)

      try {
        moduleDispatch({ type: "waiting for data" })
        const response = await Axios.post("/sds/image_post/", formdata)
        response.statusText === "OK" ? moduleDispatch({ type: "datauploaded", data: response.data }) : window.alert("error")
        console.log(response.data)
      }
      catch (err) {
        console.log(err)
      }
    } else {
      window.alert("Please Upload a File first !!!")
    }
  }
  return (
    <div className="upload">
      <div className="upload-left">
        <ul style={{ fontSize: "12px", height: "54px" }}>
          <li>
            Upload only Image file, Click on <strong>NEXT</strong>, Attributes will be generated
          </li>
          <li>
            Click on <strong>UPLOAD TO GDB</strong> button
          </li>
          <li>
            <strong>Lab-Result Id </strong>will be generated
          </li>
        </ul>
      </div>
      <form className="upload-right">
        <input title="Choose File" onChange={(e) => {
          setState((draft) => {
            if (draft.file_name.includes("png")) {
              alert("please choose an Image file")
            }else if (draft.file_name.includes("jpeg")){
              alert("please choose an Image file")
            }
          });
          if (e.target.files.length > 0) {
            setState((draft) => {
              draft.file = e.target.files[0];
              draft.selected = true;
              draft.file_name = e.target.files[0].name;
            }); moduleDispatch({ type: "newfileselected" });

          }
        }} placeholder="No file chosen" className="upload-choose" type="file" accept="image/*" />
        <input onClick={(e) => { e.preventDefault(); UploadFile() }} className="upload-next" type="Submit" value="NEXT" readOnly />
      </form>
    </div>
  );
}

export default Upload;
