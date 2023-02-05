import React from 'react'
import Box from '@mui/joy/Box';
import { Typography } from '@mui/material';

function UserHairCuts () {
  return (
    <Box sx={{}} component="div" className='userHairCutsContainer'> 
    
      <Box sx={{left:{lg:'3vw',xs:'13vw'},top:{lg:'1vw',xs:'13vw'}}} className='hairCutRow' component="div">

        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}} >Barber</Typography></Box>
        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>HairCutType</Typography></Box>
        <Box component="div" className='hairCutRowP'><Typography sx={{fontSize:{lg:'1.3vw',xs:'4vw'}}}>Date</Typography></Box>

      </Box>
    
    </Box>
  )
}

export default UserHairCuts;