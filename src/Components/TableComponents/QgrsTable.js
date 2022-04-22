import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useFilters, useTable } from 'react-table/dist/react-table.development';
import ColumnFilter from './ColumnFilter';

const QgrsTable = () => {

    const [qgrstable, setQgrstable] = useState([]);

    const fetchQgrstable = async () => {
        const response = await axios.get('http://localhost:8000/table_data/qgrsdata').catch(err => console.log(err));

        if(response){
            const qgrstable = response.data;
            console.log("Qgrstable", qgrstable);
            setQgrstable(qgrstable);
        }
    };

    useEffect(() => {
        fetchQgrstable();
    }, []);

    const qgrstableData = useMemo(() => [...qgrstable], [qgrstable]);
    const qgrstableColumns = useMemo(() => qgrstable[0] ? Object.keys(qgrstable[0]).filter((key) => key != "n_transcript_vars" && key != "id").map((key) => {
        return {Header: key, accessor: key, Filter: ColumnFilter}
      }) : [], [qgrstable]);

    
    const tableInstance = useTable(
        {columns: qgrstableColumns, data: qgrstableData},
        useFilters,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
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

export default QgrsTable