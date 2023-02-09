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
import BarCant from './barCant';
import AddPhotos from './addPhotos';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { PagenationContext } from '../context/pagenation';
import { RoleContext } from '../context/role';

function BarberApp() {

  const {addPhotoDis,setAddPhotoDis,dis,setDis}=useContext(PagenationContext);

  const {role,setRole}=useContext(RoleContext);

  const navigate=useNavigate();

  const handleClick=()=>{

    addPhotoDis==='none'?setAddPhotoDis(''):setAddPhotoDis('none')

  }

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

        <div style={{display:dis}}>

          <MustLogIn/>

          <BarCant/>
          
          <UserProfile/>

          <AddPhotos/>

          <AddAPhotoIcon className='addPhotoIcon' onClick={handleClick} sx={{display:role==='barber'?'':'none',transition:'0.5s', position:"fixed", fontSize:'4vw', zIndex:999, bgcolor:'white',borderRadius:'0.4em' ,border:'1vw solid white' }}/>

          </div>  
        
    </>
  )
}

export default BarberApp