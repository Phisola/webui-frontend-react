//library
import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner'

//component
import './Image.css'
import peakimage from './../../../images/MicrosoftTeams-image (6).png';
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"

function Image() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)
  return (
    <div className="image-container">
      <div className="image-header">
        Images
      </div>
      
      <div className="image-image-container">
        {moduleState.uploadingnow ? (<Spinner animation="grow" />) : moduleState.apidataset ? moduleState.image.map((e,k)=> {return (<img key={"image"+k} src={e === null || e === "" ? peakimage : e} alt="peakname" title="Click here to view the fullsize image" onClick={e => { moduleDispatch({ type: "openimagepopup",data: k }) }}></img>)}) : (<></>)}
      </div>
    </div>
  );
}

export default Image;
