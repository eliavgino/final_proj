import React, { useEffect } from 'react'
import HomePage from './homePage'
import NavBar from './navBar'
import { useContext } from 'react';
import Login from './logIn';
import SignUp from './signUp';
import BarberProfile from './barberProfile';
import { BrowserRouter,Route,Router,Routes, useNavigate } from "react-router-dom";
import UserProfile from './userProfile';
import MustLogIn from './MustLogIn';

function BarberApp() {

  const navigate=useNavigate();

  useEffect(() => {
  
    navigate('/');

  }, [])
  

  return (
    <>
        <NavBar/>
      
          <Routes>

            <Route element={<HomePage/>} path="/"/>
            <Route element={<Login/>} path="/logIn"/>
            <Route element={<BarberProfile/>} path="/barberProfile"/>

          </Routes>

          <MustLogIn/>
          
          <UserProfile />
        
    </>
  )
}

export default BarberApp