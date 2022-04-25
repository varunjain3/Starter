import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QGRS from './Pages/Qgrs';
import Querytool from './Pages/Querytool';
import G4Hunter from './Pages/G4Hunter';
import Qgrsdg from './Components/TableComponents/Qgrsdg';
import Lnccancerdg from './Components/TableComponents/Lnccancerdg';
import Qgrsdetail from './Components/TableComponents/Qgrsdetail';
import Qgrsfulldetail from './Components/TableComponents/Qgrsfulldetail';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <div className = "main">
            <NavBar />
            <div className = "content">
              <Routes>
                <Route exact path = "/" element = {<Home/>} />
                <Route exact path = "/qgrs" element = {<QGRS/>} />
                <Route exact path = "/g4hunter" element = {<G4Hunter/>} />
                <Route exact path = "/querytool" element = {<Querytool/>} />
                {/* <Route exact path = "/qgrsdg" element = {<Qgrsdg/>} /> */}
                <Route exact path = "/lnccancerdg" element = {<Lnccancerdg/>} />
                <Route exact path = "/qgrsdetail/:lncrna_name" element = {<Qgrsdetail/>} />
                {/* <Route exact path = '/qgrsfulldetail/:ncbi_id' element = {<Qgrsfulldetail/>} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;