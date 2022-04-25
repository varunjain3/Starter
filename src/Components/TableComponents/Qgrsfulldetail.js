import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QGRSData from '../QgrsComponents/QGRSData';

const Qgrsfulldetail = (props) => {
    // const { ncbi_id } = useParams();

    // console.log("qfd_props", props);

    const [key, setKey] = useState('NCBIid');
    const [ncbiId, setNcbiId] = useState(props.ncbi_id);
    const [fastaSeq, setFastaSeq] = useState('');
    const [maxLength, setMaxLength] = useState(props.max_length);
    const [mingGroup, setMingGroup] = useState(props.ming_group);
    const [minLoop, setMinLoop] = useState(props.min_loop);
    const [maxLoop, setMaxLoop] = useState(props.max_loop);
    const [isNcbiPending, setIsNcbiPending] = useState(false);
    const [isFastaPending, setIsFastaPending] = useState(false);
    const [ncbiData, setNcbiData] = useState(null);
    const [fastaData, setFastaData] = useState(null);

    const handleNcbiSubmit = (e) => {
        // e.preventDefault();
        setIsNcbiPending(true);
        let baseurl = "http://127.0.0.1:8000/";
        baseurl += "qgrs_ncbi/?NCBI_ID=";
        baseurl += ncbiId;
        console.log(baseurl);
        let data = {
        "Enabled": true,
        "QGRSmax": maxLength,
        "GGroupmin": mingGroup,
        "loop_min": minLoop,
        "loop_max": maxLoop
        };
        fetch(baseurl, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        }).then((response) => {
        return response.json();
        }).then((data) => {
        console.log(data);
        setFastaData(null);
        setNcbiData(data);
        setIsNcbiPending(false);
        });
    }    

    useEffect(() => {
        handleNcbiSubmit();
    }, []);

    return (
        <div>
            {
                (isNcbiPending) && 
                <div>
                    Loading...
                </div>
            }
            {ncbiData && 
                <div>
                <h5>Results for: {ncbiId} </h5>
                <QGRSData data = {ncbiData}/>
                </div>
            }
        </div>
    )
}

export default Qgrsfulldetail