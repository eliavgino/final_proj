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

      <Box className="addDescCardContainer">

      <CloseIcon onClick={()=>{setAddDescDis('none')}} sx={{color:"black",position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>  
      
      <Box component="p" className="oopsPar">OOPS!</Box>
      <Box component="p" className="addDescPar">You must add Description!</Box>

      </Box>

    </Box>
  )
}

export default AddDesc;