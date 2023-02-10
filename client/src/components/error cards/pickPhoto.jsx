import React from 'react'
import Box from '@mui/joy/Box'
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PagenationContext } from '../../context/pagenation';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function PickPhoto() {
  
  const {pickPhotoDis,setPickPhotoDis}=useContext(PagenationContext);

  const navigate=useNavigate()

  return (
    <Box style={{display:pickPhotoDis}} className="pickPhotoContainer">

      <Box className="pickPhotoCardContainer">

      <CloseIcon onClick={()=>{setPickPhotoDis('none')}} sx={{color:"black",position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>  
      
      <Box component="p" className="oopsPar">OOPS!</Box>
      <Box component="p" className="pickPhotoPar">You must pick a photo!</Box>

      </Box>

    </Box>
  )
}

export default PickPhoto;