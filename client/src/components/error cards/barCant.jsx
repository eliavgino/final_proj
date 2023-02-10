import React from 'react'
import Box from '@mui/joy/Box'
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PagenationContext } from '../../context/pagenation';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function BarCant() {
  
  const {barCantDis,setBarCantDis}=useContext(PagenationContext);

  const navigate=useNavigate()

  return (
    <Box style={{display:barCantDis}} className="barCantContainer">

      <Box sx={{width:{lg:"27vw",xs:"70vw"}}}  className="barCantCardContainer">

      <CloseIcon onClick={()=>{setBarCantDis('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:{lg:'0.4vw',xs:"2vw"}}}/>  
      
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="oopsPar">OOPS!</Box>
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="barCantPar">Barbers cant leave comments!</Box>

      </Box>

    </Box>
  )
}

export default BarCant;