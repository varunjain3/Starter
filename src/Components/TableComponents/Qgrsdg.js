import React, { useState, useEffect } from 'react';
import Qgrstablesdata from './Qgrstablesdata';
import axios from 'axios';

const Qgrsdg = () => {
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

    return (
        <div>
            <Qgrstablesdata data={qgrstable}/>
        </div>
    )
}

export default Qgrsdg