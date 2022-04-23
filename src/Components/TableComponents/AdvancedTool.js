import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvancedTool = () => {
    const [lncrna_name, setLncrna_name] = useState('');
    const [cancer_name, setCancer_name] = useState('');
    const [expression_pattern, setExpression_pattern] = useState('');
    const [ncbi_ref_id, setNcbi_ref_id] = useState('');
    const [n_transcript_vars, setN_transcript_vars] = useState('');
    const [n2g, setN2g] = useState('');

    const [lnccancer, setLnccancer] = useState([]);
    const [qgrstable, setQgrstable] = useState([]);

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


    const fetchQgrstable = async () => {
        const response = await axios.get('http://localhost:8000/table_data/qgrsdata').catch(err => console.log(err));

        if(response){
            const qgrstable = response.data;
            // console.log("Qgrstable", qgrstable);
            setQgrstable(qgrstable);
        }
    };

    useEffect(() => {
        fetchQgrstable();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = { lncrna_name, cancer_name, expression_pattern, ncbi_ref_id, n_transcript_vars, n2g};
        console.log(formdata);
        const filterElems = []
        for(var key in formdata){
            if(formdata[key]!==''){
                filterElems.push(key);
            }
        };
        console.log(filterElems);
        for(var elem in filterElems){
            console.log(elem);
        }
    }

    return (
        <div>
            <h3>Advanced Query Tool</h3>
            <form onSubmit={handleSubmit}>
                <label>LncRNA Name</label>
                <input 
                type="text" 
                value = {lncrna_name}
                onChange={(e)=>setLncrna_name(e.target.value)}
                />
                <label>Cancer Name</label>
                <input 
                type="text"
                value = {cancer_name}
                onChange={(e)=>setCancer_name(e.target.value)}
                />
                <label>Expression Pattern</label>
                <select
                    value={expression_pattern}
                    onChange={(e)=>setExpression_pattern(e.target.value)}
                >
                    <option value="up-regulated">up-regulated</option>
                    <option value="down-regulated">down-regulated</option>
                </select>
                <label>NCBI Reference ID</label>
                <input 
                type="text" 
                value = {ncbi_ref_id}
                onChange={(e)=>setNcbi_ref_id(e.target.value)}
                />
                <label>Number of Transcript Variants</label>
                <input 
                type="text" 
                value = {n_transcript_vars}
                onChange={(e)=>setN_transcript_vars(e.target.value)}
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
                    // lnccancer
                    // .filter(lnccancer => lnccancer.cancer_name === 'colon cancer')
                    // .map(lnccancer => <li key={lnccancer.id}>{lnccancer.lncrna_name}</li>)
                }
            </ul>
        </div>
    )
}

export default AdvancedTool