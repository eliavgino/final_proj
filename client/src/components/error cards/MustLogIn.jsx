import React from 'react'
import Box from '@mui/joy/Box'
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PagenationContext } from '../../context/pagenation';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function MustLogIn() {
  
  const {mustLogDis, setMustLogIn, setDis}=useContext(PagenationContext);

  const navigate=useNavigate()

  return (
    <Box style={{display:mustLogDis}} className="mustLogInContainer">

      <Box sx={{width:{lg:"27vw",xs:"70vw"}}} className="mustLogInCardContainer">

      <CloseIcon onClick={()=>{setMustLogIn('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:{lg:'0.4vw',xs:"2vw"}}}/>  
      
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="oopsPar">OOPS!</Box>
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="mustLogInPar">You must log in to complete this action!</Box>

      <Button className='mustLogInButton' onClick={()=>{setMustLogIn('none');navigate('/logIn');setDis('none')}} >Log in</Button>

      </Box>

    </Box>
  )
}

export default MustLogIn;