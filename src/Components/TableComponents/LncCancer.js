import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, useFilters } from 'react-table';
import {Table, TableData, TableHead, TableRow, TableBody, TableHeader} from 'fixed-data-table';
// import GlobalFilter from '../Components/TableComponents/GlobalFilter';
import GlobalFilter from './GlobalFilter';
import { useGlobalFilter } from 'react-table/dist/react-table.development';
// import ColumnFilter from '../Components/TableComponents/ColumnFilter';
import ColumnFilter from './ColumnFilter';

const LncCancer = () => {

    const [lnccancer, setLnccancer] = useState([]);

    const fetchLnccancer = async () => {
        const response = await axios.get('http://localhost:8000/table_data/lnccancer').catch(err => console.log(err));

        if(response){
            const lnccancer = response.data;

            // console.log("Lnccancer: ", lnccancer);
            setLnccancer(lnccancer);
        }
    };

    useEffect(() => {
        fetchLnccancer();
    }, []);

    const lnccancerData = useMemo(() => [...lnccancer], [lnccancer]);
    const lnccancerColumns = useMemo(() => lnccancer[0] ? Object.keys(lnccancer[0]).filter((key) => key != "n_transcript_vars" && key != "id").map((key) => {
      return {Header: key, accessor: key, Filter: ColumnFilter}
    }) : [], [lnccancer]);

    const tableInstance = useTable(
      { columns: lnccancerColumns, data: lnccancerData },
      useFilters,
      useGlobalFilter,
      );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state,
    } = tableInstance;

  return (
    <div>
      {/* <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/> */}
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
    </div>
  )
}

export default LncCancer