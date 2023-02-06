import React from 'react';
import { Box } from '@mui/system';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Avatar } from '@mui/material';

function Stories() {
  ///////useeffect that sest items according to div
  const items=[1,2,3,4]
  return (
    <Box className="storiesContainer">

        <Box component="p" sx={{fontSize:{lg:'5vw',xs:'12vw'}}} className='storiesHeader'>Our results</Box>

        <Box className='cardsContainer' component="div">

          <AliceCarousel responsive= { { 0: { items: 2, }, 1024: { items: 4, } }} autoPlayInterval="3000" autoPlay='true' disableDotsControls="true" autoPlayStrategy="default" disableButtonsControls='true' infinite='true'  items={items.map(item=>
            <>
              <Box sx={{width:{lg:'20vw',xs:'45vw'}}} className='card' component="div">

                <Box component="div">

                  {item}

                </Box>
            

              </Box>

              <Avatar sx={{left:{lg:'7.5vw',xs:'14vw'},width:{lg:'5vw',xs:'18vw'},height:{lg:'10vh',xs:'12vh'}}} className='cardAvatar'>


              </Avatar>

            </>
            )} />

        </Box>

    </Box>
  )
}

export default Stories