import Home from './Pages/Home';
import Stats from './Pages/Stats';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              </Routes>
              <Routes>
                <Route exact path = "/stats" element = {<Stats/>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;