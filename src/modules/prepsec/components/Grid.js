//library
import React, { useContext } from 'react';
import { Table, Stack } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

//component
import './Grid.css'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"
import GridDropdownData from './GridDropdownData.json'

function Grid() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)



  return (
    <div className="grid-container">
      <div className="grid-header">
        prepSec : Peak Attributes
    </div>
      {moduleState.uploadingnow && (<Spinner animation="grow" />)}
      {moduleState.apidataset && (
        <Stack className="grid-stack" gap={3}>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Peak Name</th>
                <th>Peak Type</th>
                <th>MW Species (%)</th>
                <th>Species Retention (mL)</th>
              </tr>
            </thead>
            <tbody>
              {
                moduleState.changingapidata.map((d, i) => {
                  if (d.data_type === "grid") {
                    return d.value.map((v, j) => {
                      return (
                        <tr key={j + `grid` + i}>
                          <td>{v.name}</td>
                          <td ><select className="grid-namevalue" onChange={e => { moduleDispatch({ "type": "setnamevalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v['original-name']}><option value=""></option><option value="Main">Main</option> <option value="HMW">HMW</option>  <option value="LMW">LMW</option></select></td>
                          <td >{v['Species-Aggregation']}</td>
                          <td >{v['Species-Retention']}</td>
                        </tr>
                      )
                    })
                  }
                  else if (d.data_type === "meta") {
                    return d.value.map((v, j) => {

                      if (v.hidden === undefined || v.hidden === "undefined" || v.hidden === "") {


                        if (v.variable === 'Temperature') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><select className="grid-namevalue" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v['value']}>{GridDropdownData.Temperatures.map((d, k) => {
                                return (<option value={d.values} key={'option' + k}>{d.values}</option>)
                              })}</select></td>


                            </tr>
                          )
                        }
                        else if (v.variable === 'Column (for purification)') {

                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><select className="grid-namevalue" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}>{GridDropdownData['Coulmn (for Purification)'].map((d, k) => {
                                return (<option value={d.values} key={'option' + k}>{d.values}</option>)
                              })}</select></td>

                            </tr>
                          )
                        }

                        else if (v.variable === 'Run buffer') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><select className="grid-namevalue" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}>{GridDropdownData['Run buffer'].map((d, k) => {
                                return (<option value={d.values} key={'option' + k}>{d.values}</option>)
                              })}</select></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Number of peaks') {

                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="number" min="0" max="1.7976931348623157E308" step="0"  onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) ; }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Run speed (mL/min)') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="number" min="0.0000000000000000000"  step="any" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Concentration [mg/mL]') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="number" min="0" max="1.7976931348623157E308" step="any" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Load amount (mg)') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="number" min="0" max="1.7976931348623157E308" step="any" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Load volume (µL)') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="number" min="0" max="1.7976931348623157E308" step="any" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Contact Person') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="text" maxLength="127" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value} required></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'Description') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="text" maxLength="254" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'ELN of Protocol') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="text" maxLength="254" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else if (v.variable === 'ELN of Performance and Calculation') {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue" type="text" maxLength="254" onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                        else {
                          return (
                            <tr key={j + `meta` + i}>
                              <td>{v.variable}</td>
                              <td colSpan="3"><input className="grid-namevalue"  onChange={e => { moduleDispatch({ "type": "setmetavalue", "data": e.target.value, "arrayi": i, "arrayj": j }) }} value={v.value}></input></td>
                            </tr>
                          )
                        }
                      }



                      else {
                        return null
                      }
                    })
                  }
                  else {
                    return null
                  }
                }
                )
              }
            </tbody>
          </Table>
          <div className="grid-button-group">

            {!moduleState.successgdb && (<><button onClick={e => { moduleDispatch({ "type": "resetgrid" }) }} className="grid-reset" >RESET</button><button onClick={e => { moduleDispatch({ "type": "checkgrid" }) }} className="grid-set">GENERATE ATTRIBUTES</button></>)}
          </div>
        </Stack>
      )}

    </div>
  );
}

export default Grid;
