import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

function AboutUs() {
  return (
    <Box className="aboutUsContainer">

        <Box component="p" className='aboutUsContent' sx={{top:{lg:"15vh",xs:"15vh"},fontSize:{lg:'2vw',xs:"3.5vw"}}}><Box component="p"  className='aboutUsHeader'>About us</Box>"Experience the finest grooming services at our premium barbershop. Our skilled barbers offer traditional and contemporary haircuts, shaves, and grooming treatments. Visit us and leave feeling refreshed and confident."</Box>

    </Box>
  )
}

export default AboutUs