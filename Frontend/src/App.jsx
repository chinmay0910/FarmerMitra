import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

// import of components
import HomePage from './Components/HomePage';
import Signin from './Components/SigninPage';
import Main from './Components/landingPage/HomePage';

function App() {

  return (
    <Router>
          <Routes>
            <Route exact path='/*' element={<HomePage />} />
          <Route exact path='/landing' element={<Main/>} />
            <Route exact path='/signin' element={<Signin />} />
          </Routes>
        </Router>
  )
}

export default App;