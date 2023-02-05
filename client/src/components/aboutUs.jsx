import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

function AboutUs() {
  return (
    <Box className="aboutUsContainer">

        <Box component="p" sx={{fontSize:{lg:'5vw',xs:'12vw'}}} className='aboutUsHeader'>About us</Box>
        <Box component="p" sx={{fontSize:{lg:'3vw',xs:'6vw'}}} className='aboutUsContent'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, reiciendis itaque ab saepe ullam doloribus consequatur in nesciunt sequi quasi soluta magni omnis nihil mollitia at. Dolor, magni? A illum doloribus consequatur omnis porro nulla veritatis pariatur optio eligendi recusandae commodi eius nobis ullam perferendis eum, excepturi enim totam laudantium!</Box>

    </Box>
  )
}

export default AboutUs