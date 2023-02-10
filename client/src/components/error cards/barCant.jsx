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

      <Box className="barCantCardContainer">

      <CloseIcon onClick={()=>{setBarCantDis('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>  
      
      <Box component="p" className="oopsPar">OOPS!</Box>
      <Box component="p" className="barCantPar">Barbers cant leave comments!</Box>

      </Box>

    </Box>
  )
}

export default BarCant;