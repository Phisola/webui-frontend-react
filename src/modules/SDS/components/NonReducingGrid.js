//library
import React, { useContext } from 'react';
import { Table, Stack } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

//component
import './Grid.css'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"

function NonReducingGrid() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)



  return (
    <div className="grid-container">
      <div className="grid-header">
        SDS : Attributes
    </div>
      {/* {moduleState.uploadingnow && (<Spinner animation="grow" />)}
      {moduleState.apidataset && ( */}
        <Stack className="grid-stack" gap={3}>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th colspan="11">
              Measurement Type SDS-PAGE (Reduced)
              </th>
              </tr>
              <tr>
                <th>Lab-Result ID</th>
                <th>Batch Id</th>
                <th>Description</th>
                <th>Site/Team</th>
                <th>Contact Person</th>
                <th>Reference to Image - Original</th>
                <th>Acquisition Date</th>
                <th>Name</th>
                <th>Analyzed Entity Name</th>
                <th>Valid</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </Table>
          <div className="grid-button-group">

            {!moduleState.successgdb && (<><button onClick={e => { moduleDispatch({ "type": "checkgrid" }) }} className="grid-sets">Upload to GDB</button></>)}
          </div>
        </Stack>
      {/* )} */}

    </div>
  );
}

export default NonReducingGrid;
