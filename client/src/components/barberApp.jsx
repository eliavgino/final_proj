import React from 'react'
import HomePage from './homePage'
import NavBar from './navBar'
import { useContext } from 'react';
import { PagenationContext } from '../context/pagenation';
import Login from './logIn';
import SignUp from './signUp';

function BarberApp() {
    
  const {page, setPage,logSignDisplay}=useContext(PagenationContext);


  return (
    <>
        <NavBar/>
        <HomePage/>
        <div style={{display:logSignDisplay,position:'fixed',width:'100vw',height:'100vh',backgroundColor:'white'}}>{page==='logIn'?<Login/>:<SignUp/>}</div>
    </>
  )
}

export default BarberApp