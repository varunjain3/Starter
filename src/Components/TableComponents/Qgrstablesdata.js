import * as React from 'react';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';

function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const Qgrstablesdata = (props) => {
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'lncrna_name', headerName: 'LncRNA Name', minWidth: 125,maxWidth:200, flex: 1},
    { field: 'ncbi_ref_id', headerName: 'NCBI Reference ID', minWidth: 125, flex: 1},
    { field: 'n2g', headerName: '#2g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1  },
    { field: 'n3g', headerName: '#3g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1  },
    { field: 'n4g', headerName: '#4g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1},
  ];

  const rows = props.data;

  console.log("Props: ", props);

  return (
    <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          components={{
            Toolbar: MyExportButton,
          }}
        />
    </div>
  );
}

export default Qgrstablesdata;