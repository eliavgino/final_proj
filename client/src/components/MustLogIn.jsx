import React from 'react'
import Box from '@mui/joy/Box'
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PagenationContext } from '../context/pagenation';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function MustLogIn() {
  
  const {mustLogDis, setMustLogIn, setDis}=useContext(PagenationContext);

  const navigate=useNavigate()

  return (
    <Box style={{display:mustLogDis}} className="mustLogInContainer">

      <Box className="mustLogInCardContainer">

      <CloseIcon onClick={()=>{setMustLogIn('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>  
      
      <Box component="p" className="oopsPar">OOPS!</Box>
      <Box component="p" className="mustLogInPar">You must log in to complete this action!</Box>

      <Button className='mustLogInButton' onClick={()=>{setMustLogIn('none');navigate('/logIn');setDis('none')}} >Log in</Button>

      </Box>

    </Box>
  )
}

export default MustLogIn;