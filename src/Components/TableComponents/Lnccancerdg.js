import React, { useState, useEffect } from 'react';
import Lnccancerdata from './Lnccancerdata';
import axios from 'axios';

const Lnccancerdg = () => {
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

    return (
        <div>
            <Lnccancerdata data={lnccancer}/>
        </div>
    )
}

export default Lnccancerdg