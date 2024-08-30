import { useState, useEffect } from 'react'
// import './App.css'
import SideNavbar from "./partials/SideNavbar";

import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router
} from "react-router-dom"

// import of components
import UserProfile from './Profile';


function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('Auth-token');
    if (!authToken) {
      navigate('/signin');
    }
  }, []);

  return (
    <>
      {/* <Router> */}
      <div className="flex flex-row h-screen b">
        <div className="left_Home w-[20%] min-w-20 bg-brown-650">
          <SideNavbar />
        </div>
        <div className="right_Home lg:w-[80%] h-screen overflow-y-scroll bg-white-100">
          <Routes>
            <Route exact path='/' element={<>Helloe</>} />
            <Route exact path='/pay' element={<>Pay</>} />
            <Route exact path='/profile' element={<UserProfile/>} />
          </Routes>
          
        </div>
      </div>
      {/* </Router> */}
    </>
  )
}

export default HomePage
