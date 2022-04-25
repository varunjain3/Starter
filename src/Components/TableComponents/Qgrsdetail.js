import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Qgrstablesdata from './Qgrstablesdata';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';

const Qgrsdetail = () => {
    const { lncrna_name } = useParams();

    const [key, setKey] = useState('NCBIid');
    const [ncbiId, setNcbiId] = useState('');
    const [fastaSeq, setFastaSeq] = useState('');
    const [maxLength, setMaxLength] = useState(45);
    const [mingGroup, setMingGroup] = useState(2);
    const [minLoop, setMinLoop] = useState(0);
    const [maxLoop, setMaxLoop] = useState(36);
    const [isNcbiPending, setIsNcbiPending] = useState(false);
    const [isFastaPending, setIsFastaPending] = useState(false);
    const [ncbiData, setNcbiData] = useState(null);
    const [fastaData, setFastaData] = useState(null);

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

    const newData = qgrstable.filter(
        x => x.lncrna_name === lncrna_name
    );

    return (
        <div><h2>
                Qgrsdetail: {lncrna_name}
            </h2>
            <div className="advanced-filters-form">
                <form>
                <Row>
                    <Col>
                    <label className = "col-form-label">Max Length: </label>
                    <input className = "form-control" type = "number" required value = {maxLength} min = "0" max = "45"
                        onChange = { (e) =>{
                        setMaxLength(e.target.value);
                        }}></input>
                    <br></br>
                    </Col>
                    <Col>
                    <label className = "col-form-label">Min G-group: </label>
                    <input className = "form-control" type = "number" required value = {mingGroup} min = "2" max = "6"
                        onChange = { (e) =>{
                        setMingGroup(e.target.value);
                        }}></input>
                    <br></br>
                    </Col>
                </Row>
                <label className = "col-form-label">Loop Size: </label>
                <Row>
                    <Col>
                    <input className = "form-control" type = "number" required value = {minLoop} min = "0" max = "36"
                        onChange = { (e) =>{
                        setMinLoop(e.target.value);
                        }}></input>
                    <small className="text-muted">
                        From
                    </small>
                    </Col>
                    <Col>
                    <input className = "form-control" type = "number" required value = {maxLoop} min = "0" max = "36"
                        onChange = { (e) =>{
                        setMaxLoop(e.target.value);
                        }}></input>
                    <small className="text-muted">
                        To
                    </small>
                    </Col>
                </Row>
                <br></br>
                { isNcbiPending && <button className = "btn btn-secondary" disabled>Fetching Data.....</button>}
                <br></br>  
                <br></br>  
                </form>
            </div>
            <Qgrstablesdata data={newData} queryparams={[maxLength, mingGroup, minLoop, maxLoop]}/>
        </div>
    )
}

export default Qgrsdetail