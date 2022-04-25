import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import Qgrsfulldetail from './Qgrsfulldetail';
import {Row, Col} from 'react-bootstrap';

function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const Qgrstablesdata = (props) => {

  const [ncbi_id, setNcbi_id] = useState('');
  const [max_length, setMax_length] = useState(props.queryparams[0]);
  const [ming_group, setMing_group] = useState(props.queryparams[1]);
  const [min_loop, setMin_loop] = useState(props.queryparams[2]);
  const [max_loop, setMax_loop] = useState(props.queryparams[3]);

  useEffect(() => {
    setNcbi_id(ncbi_id);
  }, [ncbi_id]);

  const clickHandler = (params) => {
    params[1].preventDefault();
    setNcbi_id(params[0].row.ncbi_ref_id);
    setMax_length(Number(props.queryparams[0]));
    setMing_group(Number(props.queryparams[1]));
    setMin_loop(Number(props.queryparams[2]));
    setMax_loop(Number(props.queryparams[3]));
    // console.log(max_loop);
    console.log("pp", params);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'lncrna_name', headerName: 'LncRNA Name', minWidth: 125,maxWidth:200, flex: 1},
    // { field: 'ncbi_ref_id', headerName: 'NCBI Reference ID', minWidth: 125, flex: 1, renderCell: (params) => (

    // )},
    // { field: 'ncbi_ref_id', headerName: 'NCBI Reference ID', minWidth: 125, flex: 1, renderCell: (params) => (
    //   <div>
    //     {params.row['ncbi_ref_id']}
    //     <Link to={`/qgrsfulldetail/${params.row['ncbi_ref_id']}`} target="_blank">Details</Link>
    //   </div>
    // )},

    { field: 'ncbi_ref_id', headerName: 'NCBI Reference ID', minWidth: 125, flex: 1.5, renderCell: (params) => (
      <div>
        {params.row['ncbi_ref_id']}
        <button onClick={(e) => {
          clickHandler([params, e]);
        }}>
        Details
        </button>
      </div>
    )},

    { field: 'n2g', headerName: '#2g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1  },
    { field: 'n3g', headerName: '#3g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1  },
    { field: 'n4g', headerName: '#4g PQS', type:'number', minWidth: 125,maxWidth:200, flex: 1},
  ];

  const rows = props.data;

  console.log("Props: ", props);

  return (
    <Row>
        <Col style={{ height: 1000, width: '50%' }}>
          {/* <h5>Results for: {props.data[0].lncrna_name}</h5> */}
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              components={{
                Toolbar: MyExportButton,
              }}
            />
        </Col>
        <Col style={{ height: 1000, width: '50%', align: 'right'}}>
          {
            ncbi_id !== '' &&
            <div>
              <Qgrsfulldetail key={[ncbi_id, max_length, ming_group, min_loop, max_loop]} ncbi_id={ncbi_id} max_length={max_length} ming_group = {ming_group} min_loop = {min_loop} max_loop = {max_loop}/>
            </div>
          }
        </Col>
    </Row>
  );
}

export default Qgrstablesdata;