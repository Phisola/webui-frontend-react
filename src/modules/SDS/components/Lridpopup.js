import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"


function Lridpopup() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)
  return (
    <Modal dialogClassName=""
      show={moduleState.Lrpopupopen}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={(e) => { moduleDispatch({ type: "closelrpopup" }) }}
    
    >
      <Modal.Header closeButton>

      </Modal.Header>
      <Modal.Body style={{marginLeft:"170px",fontWeight:"bold"}}>
       {moduleState.lrdataReduced}
      </Modal.Body>

    </Modal>
  )
}
export default Lridpopup
