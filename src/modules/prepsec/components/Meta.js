//library
import React, { useContext } from 'react';
import { Table, Modal, Button } from 'react-bootstrap'

//component
import './Meta.css'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"

function Meta() {

  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)
  if (moduleState.ispopupopen && moduleState.newdata) {
    // console.log(moduleState.newdata)
    return (
      <Modal dialogClassName="modal-90w"
        show={moduleState.ispopupopen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={(e) => { moduleDispatch({ type: "closepopup" }) }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Generated PrepSec Attributes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="meta-table" striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {moduleState.newdata.map((data, i) => {
                if (data.value !== "") {
                  return (
                    <tr key={i + 'prepsec'}>
                      <td><strong>{data.variable}</strong></td>
                      <td>{data.value}</td>
                    </tr>
                  )
                } else { return null }
              })}
            </tbody>

          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => { moduleDispatch({ type: "uploadtogdb" }) }} className="meta-upload" >UPLOAD TO GDB</Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

export default Meta;
