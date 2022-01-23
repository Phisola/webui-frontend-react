//library
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Table, Stack } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import ReactExport from "react-export-excel";
// import 'ag-grid-enterprise';


//component
import './Grid.css'

//context
import ModuleStateContext from "../StateContext"
import ModuleDispatchContext from "../DispatchContext"

function Grid() {
  const moduleState = useContext(ModuleStateContext)
  const moduleDispatch = useContext(ModuleDispatchContext)

  const [rowDatasReduced, setrowDatasReduced] = useState([]);
  const [rowDatasNonReduced, setrowDatasNonReduced] = useState([]);
  const gridRef = useRef(null);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);


  const headerHeight = 25;
  const rowHeight = 30;

  useEffect(() => {
    if (moduleState.rowDataReduced.length) {
      setrowDatasReduced(moduleState.rowDataReduced)
    }
  }, [moduleState.rowDataReduced])

  useEffect(() => {
    if (moduleState.rowDataNonReduced.length) {
      setrowDatasNonReduced(moduleState.rowDataNonReduced)
    }
  }, [moduleState.rowDataNonReduced])

  const onCellValueChanged = (event) => {
    console.log('Data after change is', event.data);
  };

  const columnDefs = [
    {
      headerName: 'Lab-Result_ID',

      field: 'lr_id',
      width: 170,
      pinned: 'left',
      editable: false,
      sortable: true,
      filter: true,
      cellStyle: { 'background-color': '#f2f2f2' },
      headerCheckboxSelection:true,
      headerCheckboxSelectionFilteredOnly:true,
      checkboxSelection:true,
    },
    {
      headerName: 'Batch Id',

      field: 'batch_id',
      width: 140,
      pinned: 'left',
      editable: false,
      sortable: true,
      filter: true,
      cellStyle: { 'background-color': '#f2f2f2' }
    },
    {
      headerName: 'Description',
      width: 240,
      field: 'desc',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const description = params.newValue;
        moduleDispatch({ "type": "updateDescriptionReduced", "data": description ,rowIndex:params.node.rowIndex})
        return true;
      }

    },
    {
      headerName: 'Site/Team',
      width: 140,
      field: 'team',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const site = params.newValue;
        moduleDispatch({ "type": "updateSiteReduced", "data": site,rowIndex:params.node.rowIndex })
        return true;
      },
      cellEditor:"agSelectCellEditor",
      cellEditorParams: { cellHeight: 50, values: ['Frankfurt (DE)', 'US, Framingham, 49 NYA'] },
    },
    {
      headerName: 'Contact Person',
      width: 180,
      field: 'contact',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const person = params.newValue;
        moduleDispatch({ "type": "updatePersonReduced", "data": person,rowIndex:params.node.rowIndex })
        return true;
      }

    },
    {
      headerName: 'Reference to Image - Original',
      width: 355,
      field: 'ref_img',
      editable: false,
      sortable: true,
      filter: true

    },
    {
      headerName: 'Acquisition Date',
      width: 155,
      field: 'acq_date',
      editable: false,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const date = params.newValue;
        moduleDispatch({ "type": "updateDateReduced", "data": date,rowIndex:params.node.rowIndex })
        return true;
      }

    },
    {
      headerName: 'Name',
      width: 140,
      field: "name",
      editable: true,
      sortable: true,
      filter: true,
      width: 350,
      valueSetter: params => {
        const name = params.newValue;
        moduleDispatch({ "type": "updateNameReduced", "data": name,rowIndex:params.node.rowIndex })
        return true;
      }


    },
    {
      headerName: 'Analyzed Entity Name',
      width: 200,
      field: 'analyzed_entity',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const entity = params.newValue;
        moduleDispatch({ "type": "updateEntityReduced", "data": entity,rowIndex:params.node.rowIndex })
        return true;
      }


    },
    {
      headerName: 'Valid',
      width: 100,
      field: 'valid',
      editable: true,
      sortable: true,
      filter: true,
      cellEditor:"agSelectCellEditor",
      cellEditorParams: { cellHeight: 50, values: ['Yes', 'No'] },
      valueSetter: params => {
        const valid = params.newValue;
        moduleDispatch({ "type": "updateValidReduced", "data": valid,rowIndex:params.node.rowIndex })
        return true;
      }


    },
    {
      headerName: 'Outcome',
      width: 120,
      field: 'outcome',
      editable: true,
      sortable: true,
      filter: true,
      cellEditor:"agSelectCellEditor",
      cellEditorParams: { cellHeight: 50, values: ['Passed', 'Not passed'] },
      valueSetter: params => {
        const outcome = params.newValue;
        moduleDispatch({ "type": "updateOutcomeReduced", "data": outcome,rowIndex:params.node.rowIndex })
        return true;
      }


    }
  ]

  const columnDefss = [
    {
      headerName: 'Lab-Result_ID',

      field: 'lr_id',
      width: 140,
      pinned: 'left',
      editable: false,
      sortable: true,
      filter: true,
      cellStyle: { 'background-color': '#f2f2f2' }
    },
    {
      headerName: 'Batch Id',

      field: 'batch_id',
      width: 140,
      pinned: 'left',
      editable: false,
      sortable: true,
      filter: true,
      cellStyle: { 'background-color': '#f2f2f2' }
    },
    {
      headerName: 'Description',
      field: 'desc',
      editable: true,
      sortable: true,
      filter: true,
      width: 250,
      valueSetter: params => {
        const description = params.newValue;
        moduleDispatch({ "type": "updateDescriptionNonReduced", "data": description ,rowIndex:params.node.rowIndex})
        return true;
      }

    },
    {
      headerName: 'Site/Team',
      width: 140,
      field: 'team',
      editable: true,
      sortable: true,
      valueSetter: params => {
        const site = params.newValue;
        moduleDispatch({ "type": "updateSiteNonReduced", "data": site ,rowIndex:params.node.rowIndex})
        return true;
      }
      
    },
    {
      headerName: 'Contact Person',
      width: 180,
      field: 'contact',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const person = params.newValue;
        moduleDispatch({ "type": "updatePersonNonReduced", "data": person ,rowIndex:params.node.rowIndex})
        return true;
      }

    },
    {
      headerName: 'Reference to Image - Original',
      width: 355,
      field: 'ref_img',
      editable: true,
      sortable: true,
      filter: true

    },
    {
      headerName: 'Acquisition Date',
      width: 155,
      field: 'acq_date',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const date = params.newValue;
        moduleDispatch({ "type": "updateDateNonReduced", "data": date ,rowIndex:params.node.rowIndex})
        return true;
      }

    },
    {
      headerName: 'Name',
      field: "name",
      width: 140,
      field: 'name',
      editable: true,
      sortable: true,
      filter: true,
      width: 350,

      valueSetter: params => {
        const name = params.newValue;
        moduleDispatch({ "type": "updateNameNonReduced", "data": name ,rowIndex:params.node.rowIndex})
        return true;
      }


    },
    {
      headerName: 'Analyzed Entity Name',
      width: 200,
      field: 'analyzed_entity',
      editable: true,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const entity = params.newValue;
        moduleDispatch({ "type": "updateEntityNonReduced", "data": entity ,rowIndex:params.node.rowIndex})
        return true;
      }


    },
    {
      headerName: 'Valid',
      width: 100,
      field: 'valid',
      editable: false,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const valid = params.newValue;
        moduleDispatch({ "type": "updateValidNonReduced", "data": valid ,rowIndex:params.node.rowIndex})
        return true;
      }


    },
    {
      headerName: 'Outcome',
      width: 120,
      field: 'outcome',
      editable: false,
      sortable: true,
      filter: true,
      valueSetter: params => {
        const outcome = params.newValue;
        moduleDispatch({ "type": "updateOutcomeNonReduced", "data": outcome ,rowIndex:params.node.rowIndex})
        return true;
      }


    }
  ]

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

  }
  useEffect(()=>{
    if ( gridApi){
      setTimeout(() => {
        selectAll();
      }); 
  }}
  ,[gridApi])
  
  const onSelectionChanged =(event) =>{
    console.log(event.api.getSelectedRows())
    const checkedData = event.api.getSelectedRows()
    moduleDispatch({ "type": "updateReduced", "data": checkedData })
  }

  const selectAll = () => {
    gridApi.forEachNode(function (node) {
      node.setSelected(true);
    });
  };

  const data = rowDatasReduced
  const fileName = 'SDS_Excel'  
  const exportType = 'xls'  


  return (
    <div className="grid-container">

      {moduleState.uploadingnow && (<Spinner animation="grow" />)}
      {moduleState.apidataset && (
        <Tabs defaultActiveKey="first" >
          <Tab eventKey="first" title="Reduced"  >
            <div className="grid-headerss">
              Measurement Type SDS-PAGE (Reduced)
            </div>
            <Stack className="grid-stack" gap={3}>
              <div className="ag-theme-alpine" style={{ height: 420 }}>
                <AgGridReact
                  rowData={moduleState.rowDataReduced}
                  headerHeight={headerHeight}
                  rowHeight={rowHeight}
                  columnDefs={columnDefs}
                  onGridReady={onGridReady}
                  singleClickEdit={true}
                  rowSelection={'multiple'}
                  onCellValueChanged={onCellValueChanged}
                  onSelectionChanged={onSelectionChanged}
                  suppressRowClickSelection={true}
                >

                </AgGridReact>
              </div>
              <div className="grid-button-group">

                <button onClick={e => { moduleDispatch({ "type": "UploadtoGdbReduced" }) }} className="grid-sets">Upload to GDB</button>
              </div>
            </Stack>
          </Tab>
          <Tab eventKey="second" title="Non-Reduced">
            <div className="grid-headerss">
              Measurement Type SDS-PAGE (Non-Reduced)
            </div>
            <Stack className="grid-stack" gap={3}>
              <div className="ag-theme-alpine" style={{ height: 420 }}>
                <AgGridReact
                  headerHeight={headerHeight}
                  rowData={moduleState.rowDataNonReduced}
                  rowHeight={rowHeight}
                  columnDefs={columnDefss}
                  onGridReady={onGridReady}
                  singleClickEdit={true}
                  onCellValueChanged={onCellValueChanged}
                  onSelectionChanged={onSelectionChanged}
                >

                </AgGridReact>
              </div>
              <div className="grid-button-group">
              {/* <ExcelFile element={<button className="grid-sets">Download as Excel</button>}>
                <ExcelSheet data={data} name="sds_excel_data">
                    <ExcelColumn label="Lab-Result_ID" value="lr_id"/>
                    <ExcelColumn label="Batch Id" value="batch_id"/>
                    <ExcelColumn label="Description" value="desc"/>
                    <ExcelColumn label="Site/Team" value="team"/>
                    <ExcelColumn label="Contact Person" value="contact"/>
                    <ExcelColumn label="Reference to Image - Original" value="ref_img"/>
                    <ExcelColumn label="Acquisition Date" value="acq_date"/>
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Valid" value="valid"/>
                    <ExcelColumn label="Outcome" value="outcome"/>
                </ExcelSheet>
            </ExcelFile> */}

                <button onClick={e => { moduleDispatch({ "type": "UploadtoGdbNonReduced" }) }} className="grid-sets">Upload to GDB</button>
              </div>
            </Stack>
          </Tab>
        </Tabs>
      )}



    </div>
  );
}

export default Grid;
