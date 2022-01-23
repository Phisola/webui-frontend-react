//library
import React, { useEffect, useContext, useState } from "react"
import { useImmerReducer } from "use-immer"
import Axios from 'axios';

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

//component
import "./Module.css"
import Upload from "./components/Upload"
import Image from "./components/Image"
import ImagePopup from "./components/ImagePopup"
import Grid from "./components/Grid"
import LridPopup from './components/Lridpopup'


//contexts
import ModuleStateContext from "./StateContext"
import ModuleDispatchContext from "./DispatchContext"
import DispatchContext from "../../DispatchContext"

function Module() {
  const appDispatch = useContext(DispatchContext)

  const initialState = {
    apidata: {},
    changingapidata: {},
    uploadeddata: false,
    apidataset: false,
    checkgrid: false,
    errorgrid: false,
    ispopupopen: false,
    datagrid: null,
    newdata: null,
    image: [],
    uploadreadyReduced: false,
    uploadreadyNonReduced: false,
    successgdb: false,
    uploadingnow: false,
    imagepopupopen: false,
    popupimagelocation: 0,
    Lrpopupopen: false,
    lrid: null,
    rowDataReduced: [],
    rowDataNonReduced: [],
    checkedrowDataReduced: []
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setdatagrid":
        draft.datagrid = action.data
        var reduced = JSON.parse(JSON.stringify(action.values))
        reduced.map((d, i) => {

          d.name = d.batch_id + "-REDUCED-SDS-" + d.acq_date
        })
        draft.rowDataReduced = reduced
        var non_reduced = JSON.parse(JSON.stringify(action.values))
        non_reduced.map((d, i) => {

          d.name = d.batch_id + "-NON-REDUCED-SDS-" + d.acq_date
        })
        draft.rowDataNonReduced = non_reduced
        break
      case "waiting for data":
        draft.apidataset = false
        draft.uploadingnow = true
        break
      case "datauploaded":
        draft.uploadeddata = true
        draft.apidata = action.data
        draft.changingapidata = action.data
        draft.apidataset = true
        draft.uploadingnow = false
        break

      case "newfileselected":
        draft.uploadeddata = false
        draft.apidataset = false
        draft.apidata = {}
        draft.changingapidata = {}
        draft.successgdb = false
        draft.uploadready = false
        break
      case "imagefound":
        draft.image = action.data
        break
      case "uploadtogdb":
        draft.uploadready = true
        break
      case "uploadtogdbsuccess":
        draft.successgdb = true
        break
      case "openimagepopup":
        draft.imagepopupopen = true
        draft.popupimagelocation = action.data
        break
      case "closeimagepopup":
        draft.imagepopupopen = false
        break
      case "updateDescriptionReduced":
        draft.rowDataReduced[action.rowIndex].desc = action.data
        break
      case "updateDescriptionNonReduced":
        draft.rowDataNonReduced[action.rowIndex].desc = action.data
        break
      case "updateSiteReduced":
        draft.rowDataReduced[action.rowIndex].team = action.data
        break
      case "updateSiteNonReduced":
        draft.rowDataNonReduced[action.rowIndex].team = action.data
        break
      case "updatePersonReduced":
        draft.rowDataReduced[action.rowIndex].contact = action.data
        break
      case "updatePersonNonReduced":
        draft.rowDataNonReduced[action.rowIndex].contact = action.data
        break
      case "updateDateReduced":
        draft.rowDataReduced[action.rowIndex].acq_date = action.data
        break
      case "updateDateNonReduced":
        draft.rowDataNonReduced[action.rowIndex].acq_date = action.data
        break
      case "updateEntityReduced":
        draft.rowDataReduced[action.rowIndex].analyzed_entity = action.data
        break
      case "updateEntityNonReduced":
        draft.rowDataNonReduced[action.rowIndex].analyzed_entity = action.data
        break
      case "updateValidReduced":
        draft.rowDataReduced[action.rowIndex].valid = action.data
        break
      case "updateValidNonReduced":
        draft.rowDataNonReduced[action.rowIndex].valid = action.data
        break
      case "updateOutcomeReduced":
        draft.rowDataReduced[action.rowIndex].outcome = action.data
        break
      case "updateOutcomeNonReduced":
        draft.rowDataNonReduced[action.rowIndex].outcome = action.data
        break
      case "updateNameReduced":
        draft.rowDataReduced[action.rowIndex].name = action.data
        break
      case "updateNameNonReduced":
        draft.rowDataNonReduced[action.rowIndex].name = action.data
        break
      case "UploadtoGdbReduced":
        draft.uploadreadyReduced = true
        break
      case "UploadtoGdbNonReduced":
        draft.uploadreadyNonReduced = true
        break

      case "ReducedLrids":
        draft.Lrpopupopen = false
        draft.lrdataReduced = action.data
        draft.lrdataNonReduced = action.data
        draft.rowDataReduced.forEach((d, i) => {
          d.lr_id = action.data[i]
        })
        break;
      case "closelrpopup":
        draft.Lrpopupopen = false
        break;
      case "ReducedNonLrids":
        draft.rowDataNonReduced.forEach((d, i) => {
          d.lr_id = action.data[i]
        })
      case "updateReduced":
        draft.checkedrowDataReduced = action.data

      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.uploadeddata) {
      state.apidata.forEach((data, i) => {
        if (data.data_type === "grid") {
          dispatch({ type: "setdatagrid", data: i, values: data.value })
          // console.log(data.value)
        } else {
          dispatch({ type: "imagefound", data: data.value })
          console.log(data.value)
        }
      })
    }
  }, [state.uploadeddata, dispatch])



  async function gdbUploadReduced(gdbdata) {
    try {
      const response = await Axios.post("/sds/gdb_upload_reducing/", gdbdata)
      var lrdataReduced = ""
      if (response.data) {
        lrdataReduced = response.data
        alert("Lr-Ids generated successfully")
        console.log(response.data)
      }
      else {
        alert("Information could not be saved")
      }
      dispatch({ type: "ReducedLrids", data: lrdataReduced })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    if (state.uploadreadyReduced) {
      console.log(state.checkedrowDataReduced)
      gdbUploadReduced(state.checkedrowDataReduced)

    }

  }, [state.uploadreadyReduced])


  async function gdbUploadNonReduced(gdbdatas) {
    try {
      const response = await Axios.post("/sds/gdb_upload_non_reducing/", gdbdatas)
      var lrdataNonReduced = ""
      if (response.data) {
        lrdataNonReduced = response.data
        alert("Lr-Ids generated successfully")
        console.log(response.data)
      }
      else {
        alert("Information could not be saved")
      }
      dispatch({ type: "ReducedNonLrids", data: lrdataNonReduced })

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {

    if (state.uploadreadyNonReduced) {
      console.log(state.rowDataNonReduced)
      gdbUploadNonReduced(state.rowDataNonReduced)
    }

  }, [state.uploadreadyNonReduced])


  useEffect(() => {
    console.log(state.imagepopupopen)
  }, [state.imagepopupopen])

  useEffect(() => {
    console.log(state.Lrpopupopen)
  }, [state.Lrpopupopen])

  return (
    <ModuleStateContext.Provider value={state}>
      <ModuleDispatchContext.Provider value={dispatch}>
        <Upload></Upload>
        <div className="middle">
          <Image></Image>

          <Grid></Grid>
        </div>
        {state.imagepopupopen && <ImagePopup />}
        {state.Lrpopupopen && (<LridPopup />)}

      </ModuleDispatchContext.Provider>
    </ModuleStateContext.Provider>
  )
}

export default Module
