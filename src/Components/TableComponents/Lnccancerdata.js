import * as React from 'react';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const Lnccancerdata = (props) => {
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'lncrna_name', headerName: 'LncRNA Name', maxWidth: 175, flex: 1},
    { field: 'cancer_name', headerName: 'Cancer Name', maxWidth: 200, flex: 1  },
    { field: 'methods', headerName: 'Methods', minWidth: 200, flex: 1  },
    { field: 'expression_pattern', headerName: 'Expression Pattern', maxWidth: 200, flex: 1  },
    { field: 'pubmed_id', headerName: 'Pubmed ID', maxWidth: 125, flex: 1},
    { field: 'qgrs_details', headerName: 'QGRS Details', maxWidth: 125, flex: 1, renderCell: (params) => (
      <Link to={`/qgrsdetail/${params.row['lncrna_name']}`} target="_blank">Details</Link>
    )}
  ];

  const rows = props.data;

  console.log("Props: ", props.data);

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

export default Lnccancerdata;