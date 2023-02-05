import React from 'react'
import Box from '@mui/material/Box'
import { Typography,Container, Avatar } from '@mui/material'
import { shadows } from '@mui/system';


function UserProfile() {
  return (
  <Box className='profileContainer slideIn' sx={{width:{lg:'35vw',xs:'60vw'}}}>
             
      <Avatar sx={{height:'14vh',width:'7vw',marginLeft:'4vw'}}>
      </Avatar>

      <Typography sx={{fontSize:'2vw' ,marginLeft:'3vw' ,mt:'2vh'}}>userProfile</Typography>

      <Box component="div" sx={{ml:'-6vw', position:'relative',mt:'8vh',display:'flex', height:'20%',width:'30vw'}}>
              <Box sx={{textAlign:'center', width:'33%',borderRight:'0.01vw solid black',height:'20%'}}><Typography sx={{fontSize:'1.5vw'}}>userPhone</Typography></Box>
              <Box sx={{textAlign:'center',width:'33%',borderRight:'0.01vw solid black', height:'20%'}}><Typography sx={{fontSize:'1.5vw'}}>userEmail</Typography></Box>
              <Box sx={{textAlign:'center', width:'33%',height:'20%'}}><Typography sx={{fontSize:'1.5vw'}}>userHaircuts</Typography></Box>
       </Box>

  </Box>  
  
  )
}

export default UserProfile

