import Home from './Pages/Home';
import Stats from './Pages/Stats';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QGRS from './Pages/Qgrs';
import Querytool from './Pages/Querytool';

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
                <Route exact path = "/stats" element = {<Stats/>} />
                <Route exact path = "/qgrs" element = {<QGRS/>} />
                <Route exact path = "/querytool/*" element = {<Querytool/>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;