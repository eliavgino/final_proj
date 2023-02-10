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

      <Box sx={{width:{lg:"27vw",xs:"70vw"}}} className="pickPhotoCardContainer">

      <CloseIcon onClick={()=>{setPickPhotoDis('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:{lg:'0.4vw',xs:"2vw"}}}/>  
      
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="oopsPar">OOPS!</Box>
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="pickPhotoPar">You must pick a photo!</Box>

      </Box>

    </Box>
  )
}

export default PickPhoto;