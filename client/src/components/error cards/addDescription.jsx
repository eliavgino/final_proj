import React from 'react'
import Box from '@mui/joy/Box'
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PagenationContext } from '../../context/pagenation';
import { useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AddDesc() {
  
  const {addDescDis,setAddDescDis}=useContext(PagenationContext);

  const navigate=useNavigate()

  return (
    <Box style={{display:addDescDis}} className="addDescContainer">

      <Box sx={{width:{lg:"27vw",xs:"70vw"}}} className="addDescCardContainer">

      <CloseIcon onClick={()=>{setAddDescDis('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:{lg:'0.4vw',xs:"2vw"}}}/>  
      
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="oopsPar">OOPS!</Box>
      <Box sx={{fontSize: {lg:"1.2vw",xs:"4vw"},margin: {lg:"1vw",xs:"2vw"}}} component="p" className="addDescPar">You must add Description!</Box>

      </Box>

    </Box>
  )
}

export default AddDesc;