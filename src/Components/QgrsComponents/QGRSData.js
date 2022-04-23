import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';

const QGRSData = (props) => {
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'start_pos', headerName: 'Start Pos', type: 'number', maxWidth: 125, flex: 1},
    { field: 'num_g', headerName: '# G', type: 'number', maxWidth: 125, flex: 1  },
    { field: 'length', headerName: 'Length', type: 'number', maxWidth: 125, flex: 1 },
    { field: 'sequence', headerName: 'Sequence', flex: 1},
  ];

  const rows = props.data.table;

  return (
    <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
        />
    </div>
  );
}

export default QGRSData;