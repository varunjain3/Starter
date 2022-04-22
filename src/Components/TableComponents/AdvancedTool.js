import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvancedTool = () => {
    const [lncrnaname, setLncrnaname] = useState('');
    const [cancername, setCancername] = useState('');
    const [expressionpattern, setExpressionpattern] = useState('');
    const [ncbirefid, setNcbirefid] = useState('');
    const [ntransvars, setNtransvars] = useState('');
    const [n2g, setN2g] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = { lncrnaname, cancername, expressionpattern, ncbirefid, ntransvars, n2g};
        console.log(formdata);
        const filterElems = []
        for(var key in formdata){
            if(formdata[key]!=''){
                filterElems.push(key);
            }
        };
        console.log(filterElems);
    }

    return (
        <div>
            <h3>Advanced Query Tool</h3>
            <form onSubmit={handleSubmit}>
                <label>LncRNA Name</label>
                <input 
                type="text" 
                value = {lncrnaname}
                onChange={(e)=>setLncrnaname(e.target.value)}
                />
                <label>Cancer Name</label>
                <input 
                type="text"
                value = {cancername}
                onChange={(e)=>setCancername(e.target.value)}
                />
                <label>Expression Pattern</label>
                <select
                    value={expressionpattern}
                    onChange={(e)=>setExpressionpattern(e.target.value)}
                >
                    <option value="up-regulated">up-regulated</option>
                    <option value="down-regulated">down-regulated</option>
                </select>
                <label>NCBI Reference ID</label>
                <input 
                type="text" 
                value = {ncbirefid}
                onChange={(e)=>setNcbirefid(e.target.value)}
                />
                <label>Number of Transcript Variants</label>
                <input 
                type="text" 
                value = {ntransvars}
                onChange={(e)=>setNtransvars(e.target.value)}
                />
                <label>Number of 2G PQS</label>
                <input 
                type="text" 
                value = {n2g}
                onChange={(e)=>setN2g(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <ul>
                {
                    lnccancer
                    .filter(lnccancer => lnccancer.cancer_name === 'colon cancer')
                    .map(lnccancer => <li key={lnccancer.id}>{lnccancer.lncrna_name}</li>)
                }
            </ul>
        </div>
    )
}

export default AdvancedTool