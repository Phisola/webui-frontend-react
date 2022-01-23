//library
import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from "use-immer"
import Axios from 'axios';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import './Module.css';
import Upload from './components/Upload'
import Image from './components/Image'
import ImagePopup from './components/ImagePopup'
import Grid from './components/Grid'
import Meta from './components/Meta'
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
    metagrid: null,
    newdata: null,
    image: [],
    uploadready: false,
    successgdb: false,
    uploadingnow: false,
    imagepopupopen: false,
    Lrpopupopen: false,
    lrid: null
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setdatagrid":
        draft.datagrid = action.data
        break;
      case "setmetagrid":
        draft.metagrid = action.data
        break;
      case "waiting for data":
        draft.apidataset = false
        draft.uploadingnow = true
        break;
      case "datauploaded":
        draft.uploadeddata = true;
        draft.apidata = action.data
        draft.changingapidata = action.data
        draft.apidataset = true
        draft.uploadingnow = false
        break;
      case "gotapidata":
        break;
      case "setnamevalue":
        draft.changingapidata[action.arrayi].value[action.arrayj]['original-name'] = action.data
        break;
      case "setmetavalue":
        draft.changingapidata[action.arrayi].value[action.arrayj]['value'] = action.data
        break;
      case "resetgrid":
        draft.changingapidata = draft.apidata
        draft.ispopupopen = false
        break;
      case "checkgrid":
        draft.checkgrid = !draft.checkgrid
        break;
      case "createnewdata":
        draft.newdata = action.data.concat(draft.changingapidata[draft.metagrid].value)
        break;
      case "openpopup":
        draft.ispopupopen = true
        break;
      case "closepopup":
        draft.ispopupopen = false
        break;
      case "newfileselected":
        draft.uploadeddata = false
        draft.apidataset = false
        draft.apidata = {}
        draft.changingapidata = {}
        draft.successgdb = false
        draft.uploadready = false
        break;
      case "imagefound":
        draft.image = action.data
        break
      case "uploadtogdb":
        draft.uploadready = true
        break;
      case "uploadtogdbsuccess":
        draft.successgdb = true
        break;
      case "openimagepopup":
        draft.imagepopupopen = true
        draft.popupimagelocation = action.data
        break;
      case "closeimagepopup":
        draft.imagepopupopen = false
        break;
      case "openlrpopup":
        draft.Lrpopupopen = true
        draft.lrid = action.data
        break;
      case "closelrpopup":
        draft.Lrpopupopen = false
        break;

      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)


  useEffect(() => {

    if (state.uploadeddata) {



      state.apidata.forEach((data, i) => {
        if (data.data_type === "grid") {
          dispatch({ type: "setdatagrid", data: i })
        }

        else if (data.data_type === "meta") {
          dispatch({ type: "setmetagrid", data: i })
        }

        else {
          dispatch({ type: "imagefound", data: data.value })
          console.log(data.value)

        }

      })



    }

  }, [state.uploadeddata, dispatch])

  async function gdbUpload(gdbdata) {
    try {
      const response = await Axios.post("/update/", gdbdata)
      var lrdata = ""
      if (response.data) {
        lrdata = "LR ID : " + response.data
      }
      else {
        lrdata = "Information could not be saved"
      }
      dispatch({ type: "uploadtogdbsuccess" })
      dispatch({ type: "closepopup" })
      dispatch({ type: "openlrpopup", data: lrdata })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (state.uploadready) {
      let uploadData = []
      state.newdata.forEach((data, i) => {
        if (data.value !== "") {
          uploadData.push(data)
        }
      })
      console.log(uploadData)
      //upload data using axios
      gdbUpload(uploadData)
    }
  }, [state.uploadready, dispatch])

  useEffect(() => {
    var main_count = 0;
    var hmw_count = 0;
    var lmw_count = 0;
    var msg = "";
    if (state.apidataset) {
      state.changingapidata[state.datagrid].value.forEach((d) => {
        if (d['original-name'] === "Main") {
          main_count++;
        }
        else if (d['original-name'] === "HMW") {
          hmw_count++;
        }
        else if (d['original-name'] === "LMW") {
          lmw_count++;
        }
      })
      state.changingapidata[state.metagrid].value.forEach((d) => {
        if (d.variable === "Contact Person" && d.value.trim() === "") {
          msg += "Contact Person field is required"
        }
      })

      if (main_count + hmw_count + lmw_count > 3) {
        msg += "Maximum selection will be 3 and there should not be any repetation of peak selection."
      }
      else if (main_count > 1 || hmw_count > 1 || lmw_count > 1) {
        msg += "No peak will be selected more than once."
      }
      else if ((main_count + hmw_count + lmw_count) === 2 && (main_count !== 1 || lmw_count !== 1)) {
        msg += "First peak selection will be Main and second selection will be LMW."
      }
      else if ((main_count + hmw_count + lmw_count) === 1 && main_count !== 1) {
        msg += "First peak selection will be Main."
      }
      else if (main_count !== 1) {
        msg += "First peak selection will be Main."
      }
      var rev_grid_obj = [];
      if (msg !== "") {
        appDispatch({ type: "flashMessage", data: { type: "danger", body: msg } })
      }
      else {
        state.changingapidata[state.datagrid].value.forEach((d) => {
          if (d['original-name'] === "Main") {
            rev_grid_obj.push(
              {
                "variable": "Expected MW Species Retention (mL)",
                "value": d['Species-Retention']
              }
            );
            rev_grid_obj.push(
              {
                "variable": "Expected MW Species",
                "value": d['Species-Aggregation']
              }
            );
          }
          else if (d['original-name'] === "HMW") {
            rev_grid_obj.push(
              {
                "variable": "High MW Species Retention (mL)",
                "value": d['Species-Retention']
              }
            );
            rev_grid_obj.push(
              {
                "variable": "High MW Species-Aggregation",
                "value": d['Species-Aggregation']
              }
            );
          }
          else if (d['original-name'] === "LMW") {
            rev_grid_obj.push(
              {
                "variable": "Low MW Species Retention (mL)",
                "value": d['Species-Retention']
              }
            );
            rev_grid_obj.push(
              {
                "variable": "Low MW Species",
                "value": d['Species-Aggregation']
              }
            );
          }
        })
        dispatch({ type: "createnewdata", data: rev_grid_obj })
        dispatch({ type: "openpopup" })
      }
    }
  }, [state.checkgrid])
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
        {state.imagepopupopen && (<ImagePopup />)}
        {state.ispopupopen && (<Meta />)}
        {state.Lrpopupopen && (<LridPopup />)}
      </ModuleDispatchContext.Provider>
    </ModuleStateContext.Provider>
  );
}

export default Module;
