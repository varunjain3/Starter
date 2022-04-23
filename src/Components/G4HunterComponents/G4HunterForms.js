import {useState} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import G4HunterData from './G4HunterData';

const G4HunterForms = () => {
  const [key, setKey] = useState('NCBIid');
  const [ncbiId, setNcbiId] = useState('');
  const [windowSize, setWindowSize] = useState(25);
  const [threshold, setThreshold] = useState(0.9);
  const [isNcbiPending, setIsNcbiPending] = useState(false);
  const [ncbiData, setNcbiData] = useState(null);

  const handleNcbiSubmit = (e) => {
    e.preventDefault();
    setIsNcbiPending(true);
    let baseurl = "http://127.0.0.1:8000/";
    baseurl += "g4hunter/?NCBI_ID=";
    baseurl += ncbiId;
    console.log(baseurl);
    let data = {
      "window_size": windowSize,
      "threshold": threshold,
    };
    fetch(baseurl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
      setNcbiData(data);
      setIsNcbiPending(false);
    });
  }

  return (
    <div className="container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="NCBIid" title="NCBI ID">
          <div>
          <form onSubmit = {handleNcbiSubmit}>
              <label className = "col-form-label">Enter NCBI ID: </label>
              <input className = "form-control" type = "text" required value = {ncbiId} placeholder="Ex: NR_152759.1"
                onChange = { (e) =>{
                  setNcbiId(e.target.value);
                }}></input>
              <br></br>
              <Row>
                <Col>
                  <label className = "col-form-label">Window Size: </label>
                  <input className = "form-control" type = "number" required value = {windowSize} min = "0" max = "100"
                    onChange = { (e) =>{
                      setWindowSize(e.target.value);
                    }}></input>
                  <br></br>
                </Col>
                <Col>
                  <label className = "col-form-label">Threshold: </label>
                  <input className = "form-control" type = "float" required value = {threshold} min = "0.0" max = "3.0"
                    onChange = { (e) =>{
                      setThreshold(e.target.value);
                    }}></input>
                  <br></br>
                </Col>
              </Row>
              <br></br>  
              { !isNcbiPending && <button className = "btn btn-primary">Submit</button>}
              { isNcbiPending && <button className = "btn btn-secondary" disabled>Fetching Data.....</button>}
              <br></br>  
              <br></br>  
            </form>
          </div>
        </Tab>
      </Tabs>
      {ncbiData && 
        <div>
          <p>Results:</p>
          <G4HunterData data = {ncbiData}/>
        </div>
      }
    </div>
  );
}

export default G4HunterForms;