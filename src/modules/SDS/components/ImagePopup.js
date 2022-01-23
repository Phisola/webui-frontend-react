import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"


function ImagePopup() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)
  return (
    <Modal dialogClassName="modal-90w"
      show={moduleState.imagepopupopen}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={(e) => { moduleDispatch({ type: "closeimagepopup" }) }}
    >
      <Modal.Header closeButton>

      </Modal.Header>
      <Modal.Body >
        <img src={moduleState.image[moduleState.popupimagelocation] === null || moduleState.image[moduleState.popupimagelocation] === "" ? "" : moduleState.image[moduleState.popupimagelocation]} alt="peakname" style={{ height: "430px", width: "100%" }}></img>
      </Modal.Body>

    </Modal>
  )
}
export default ImagePopup
