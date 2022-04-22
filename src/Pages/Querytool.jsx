import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import {Table, TableData, TableHead, TableRow, TableBody, TableHeader} from 'fixed-data-table';
import GlobalFilter from '../Components/TableComponents/GlobalFilter';
import { useGlobalFilter } from 'react-table/dist/react-table.development';

const Querytool = () => {

    const [lnccancer, setLnccancer] = useState([]);

    const fetchLnccancer = async () => {
        const response = await axios.get('http://localhost:8000/table_data/lnccancer').catch(err => console.log(err));

        if(response){
            const lnccancer = response.data;

            console.log("Lnccancer: ", lnccancer);
            setLnccancer(lnccancer);
        }
    };

    useEffect(() => {
        fetchLnccancer();
    }, []);

    const lnccancerData = useMemo(() => [...lnccancer], [lnccancer]);
    const lnccancerColumns = useMemo(() => lnccancer[0] ? Object.keys(lnccancer[0]).filter((key) => key != "n_transcript_vars").map((key) => {
      return {Header: key, accessor: key}
    }) : [], [lnccancer]);

      const tmp_data = useMemo(() => (
        [
          {
            "id": 0,
            "lncrna_name": "ABHD11-AS1",
            "cancer_name": "colorectal cancer",
            "methods": "qPCR, RIP, Luciferase reporter assay, Western blot, other",
            "expression_pattern": "up-regulated",
            "pubmed_id": "30429229",
            "n_transcript_vars": "1"
          },
          {
            "id": 1,
            "lncrna_name": "ABHD11-AS1",
            "cancer_name": "colorectal cancer",
            "methods": "qPCR, Western blot, Luciferase reporter assay, in vitro knockdown, RIP, etc.",
            "expression_pattern": "up-regulated",
            "pubmed_id": "30537177",
            "n_transcript_vars": "1"
          },
          {
            "id": 2,
            "lncrna_name": "ADAMTS9-AS2",
            "cancer_name": "colorectal cancer",
            "methods": "qPCR etc.",
            "expression_pattern": "down-regulated",
            "pubmed_id": "27596298",
            "n_transcript_vars": "1"
          },
          {
            "id": 3,
            "lncrna_name": "ADPGK-AS1",
            "cancer_name": "colorectal cancer",
            "methods": "qPCR, Luciferase reporter assay etc",
            "expression_pattern": "up-regulated",
            "pubmed_id": "32196589",
            "n_transcript_vars": "1"
          },
        ]
      ));

    const tableInstance = useTable(
      { columns: lnccancerColumns, data: lnccancerData },
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
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
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

export default Querytool