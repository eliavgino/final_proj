import React from 'react'
import Box from '@mui/joy/Box';
import { Typography } from '@mui/material';
import { HairCutsContext } from "../context/hairCuts";
import { useContext } from 'react';

function UserHairCuts () {

  const {userHairCuts}=useContext(HairCutsContext);

  return (
    <Box sx={{left:{lg:'2vw',xs:'25vw'},top:{lg:'0vw',xs:'7vh'},bottom:"3rem"}} component="div" className='userHairCutsContainer'> 
    
      <Box sx={{width:{lg:'27.5vw',xs:"61vw"}}} className='hairCutRow' component="div">

        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}} >Barber</Typography></Box>
        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>Hair cut</Typography></Box>
        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>Date</Typography></Box>

      </Box>
    
      <Box sx={{width:{xs:"57vw",lg:"26vw"},gap:{xs:"",lg:""},padding:"1rem"}} component="div" className='userHairCutsTable'>

      {userHairCuts.map((hairCut)=>
      
        <Box sx={{width:{lg:'100%',xs:'100%'}}} className='userProfileTableRow' component="div">

          <Box component="div" className='userProfileTableCell'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}} >{hairCut.barber.barber_Name}</Typography></Box>
          <Box component="div" className='userProfileTableCell'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>{hairCut.hairCut.product_name}</Typography></Box>
          <Box component="div" className='userProfileTableCell'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>{(hairCut.date).slice(0,10)}</Typography></Box>

        </Box>
      )}


      </Box>

    </Box>
  )
}

export default UserHairCuts;