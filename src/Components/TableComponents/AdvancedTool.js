import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lnccancerdata from './Lnccancerdata';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';

const AdvancedTool = () => {
    const [lncrna_name, setLncrna_name] = useState('');
    const [cancer_name, setCancer_name] = useState('');
    const [expression_pattern, setExpression_pattern] = useState('any');
    const [pubmed_id, setPubmed_id] = useState('');

    const [ncbi_ref_id, setNcbi_ref_id] = useState('');
    const [n_transcript_vars, setN_transcript_vars] = useState('');
    const [n2g, setN2g] = useState('');

    const [lnccancer, setLnccancer] = useState([]);
    const [qgrstable, setQgrstable] = useState([]);
    const [finaldata, setFinaldata] = useState([]);

    const fetchLnccancer = async () => {
        const response = await axios.get('http://localhost:8000/table_data/lnccancer').catch(err => console.log(err));

        if(response){
            const tmp = response.data;

            // console.log("Lnccancer: ", tmp);
            setLnccancer(tmp);
        }
    };

    useEffect(() => {
        fetchLnccancer();
    }, []);


    const fetchQgrstable = async () => {
        const response = await axios.get('http://localhost:8000/table_data/qgrsdata').catch(err => console.log(err));

        if(response){
            const tmp = response.data;
            // console.log("Qgrstable", tmp);
            setQgrstable(tmp);
        }
    };

    useEffect(() => {
        fetchQgrstable();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFinaldata(lnccancer);
        
        
        const newQgrsData = qgrstable.filter(x => x.n_transcript_vars === (n_transcript_vars === '' ? x.n_transcript_vars : n_transcript_vars));
        
        const newData = lnccancer.filter(x => x.lncrna_name === (lncrna_name === '' ? x.lncrna_name : lncrna_name))
        .filter(x => x.cancer_name === (cancer_name === '' ? x.cancer_name : cancer_name))
        .filter(x => x.expression_pattern === (expression_pattern === 'any' ? x.expression_pattern : expression_pattern))
        .filter(x => x.pubmed_id === (pubmed_id === '' ? x.pubmed_id : pubmed_id));

        console.log("newdata: ", newData);
        setFinaldata(newData);
    };

    return (
        <div>
            <h3>Advanced Query Tool</h3>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <label className = "col-form-label">LncRNA Name</label>
                        <input className = "form-control" 
                        type="text" 
                        value = {lncrna_name}
                        onChange={(e)=>setLncrna_name(e.target.value)}
                        />
                    </Col>

                    <Col>
                        <label className = "col-form-label">Cancer Name</label>
                        <input className = "form-control" 
                        type="text"
                        value = {cancer_name}
                        onChange={(e)=>setCancer_name(e.target.value)}
                        />
                    </Col>

                    <Col>
                        <label className = "col-form-label">Expression Pattern</label>
                        <select className='form-control'
                            value={expression_pattern}
                            onChange={(e)=>setExpression_pattern(e.target.value)}
                        >
                            <option value="any">any</option>
                            <option value="up-regulated">up-regulated</option>
                            <option value="down-regulated">down-regulated</option>
                        </select>
                    </Col>

                    <Col>
                        <label className = "col-form-label">Pubmed ID</label>
                        <input className = "form-control" 
                        type="text" 
                        value = {pubmed_id}
                        onChange={(e)=>setPubmed_id(e.target.value)}
                        />
                    </Col>

                </Row>

                {/* <div>
                    <label>NCBI Reference ID</label>
                    <input 
                    type="text" 
                    value = {ncbi_ref_id}
                    onChange={(e)=>setNcbi_ref_id(e.target.value)}
                    />
                </div>

                <div>
                    <label>Number of Transcript Variants</label>
                    <input 
                    type="text" 
                    value = {n_transcript_vars}
                    onChange={(e)=>setN_transcript_vars(e.target.value)}
                    />
                </div>

                <div>
                    <label>Number of 2G PQS</label>
                    <input 
                    type="text" 
                    value = {n2g}
                    onChange={(e)=>setN2g(e.target.value)}
                    />
                </div> */}

                {/* <div> */}
                    <button className = "btn btn-primary">Submit</button>
                {/* </div> */}

                {/* <table>
                    <thead>
                        <tr>
                            <th>LncRNA Name</th>
                            <th>Cancer Name</th>
                            <th>Pubmed ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            finaldata.map(x => <tr key={x.id}>
                                <td>
                                    {x.lncrna_name}
                                </td>
                                <td>
                                    {x.cancer_name}
                                </td>
                                <td>
                                    {x.pubmed_id}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table> */}

                <Lnccancerdata data={finaldata}/>
                
            </form>
        </div>
    )
}

export default AdvancedTool