import {useState} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import QGRSData from './QGRSData';

const QGRSForms = () => {
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

  const handleNcbiSubmit = (e) => {
    e.preventDefault();
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

  const handleFastaSubmit = (e) => {
    e.preventDefault();
    setIsFastaPending(true);
    let baseurl = "http://127.0.0.1:8000/";
    baseurl += "qgrs_seq/?seq=";
    baseurl += fastaSeq;
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
      setNcbiData(null);
      setFastaData(data);
      setIsFastaPending(false);
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
              { !isNcbiPending && <button className = "btn btn-primary">Submit</button>}
              { isNcbiPending && <button className = "btn btn-secondary" disabled>Fetching Data.....</button>}
              <br></br>  
              <br></br>  
            </form>
          </div>
        </Tab>
        <Tab eventKey="FastaSeq" title="FastaSeq">
          <div>
            <form onSubmit = {handleFastaSubmit}>
              <label className = "col-form-label">Enter FASTA Sequence: </label>
              <input className = "form-control input-lg" type = "text" required value = {fastaSeq} placeholder="Ex: AA..."
                onChange = { (e) =>{
                  setFastaSeq(e.target.value);
                }}></input>
              <br></br>
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
              { !isFastaPending && <button className = "btn btn-primary">Submit</button>}
              { isFastaPending && <button className = "btn btn-secondary" disabled>Fetching Data.....</button>}
              <br></br>  
              <br></br>  
            </form>
          </div>
        </Tab>
      </Tabs>
      {ncbiData && 
        <div>
          <p>Results:</p>
          <QGRSData data = {ncbiData}/>
        </div>
      }
      {fastaData && <div>
          <p>Results:</p>
          <QGRSData data = {fastaData}/>
        </div>}
    </div>
  );
}

export default QGRSForms;