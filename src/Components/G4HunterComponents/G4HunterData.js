import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';

const G4HunterData = (props) => {
  const columns = [
    { field: 'start', headerName: 'Start Pos', type: 'number', maxWidth: 100, flex: 1},
    { field: 'num_g', headerName: '# G', type: 'number', maxWidth: 100, flex: 1  },
    { field: 'len', headerName: 'Length', type: 'number', maxWidth: 100, flex: 1 },
    { field: 'score', headerName: 'Score', type: 'number', maxWidth: 125, flex: 1 },
    { field: 'sequence', headerName: 'Sequence', flex: 1},
  ];

  const rows = props.data;

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

export default G4HunterData;