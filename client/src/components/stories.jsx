import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Avatar } from '@mui/material';
import { Image } from 'cloudinary-react';
import { useContext } from "react";
import { PhotosContext } from "../context/photos";

function Stories() {

  const { getAllPhotos,photos } = useContext(PhotosContext);

 useEffect(() => {

  const get=async() => {
     await getAllPhotos()
  }
  get();

 }, [])
 
  const items=[1,2,3,4]
  console.log(photos)
  return (
    <Box className="storiesContainer">

        <Box component="p" sx={{fontSize:{lg:'5vw',xs:'12vw'}}} className='storiesHeader'>Our results</Box>

        <Box className='cardsContainer' component="div">

          <AliceCarousel responsive= { { 0: { items: 2, }, 1024: { items: 4, } }} autoPlayInterval="3000" autoPlay='true' disableDotsControls="true" autoPlayStrategy="default" disableButtonsControls='true' infinite='true'  items={photos.map(photo=>
            <>
              <Box sx={{width:{lg:'20vw',xs:'45vw'}}} className='card' component="div">

                <Box component="div">

                  <Image className="storieImage" cloudName="ddwsr6uth" publicId={photo.photo}></Image>

                </Box>
            

              </Box>

              <Avatar sx={{left:{lg:'7.5vw',xs:'14vw'},width:{lg:'5vw',xs:'18vw'},height:{lg:'10vh',xs:'12vh'}}} className='cardAvatar'>

                {console.log(photo.barber["profilePhoto"])}
                <Image cloudName="ddwsr6uth" publicId={photo.barber["profilePhoto"]}></Image>

              </Avatar>

            </>
            )} />

        </Box>

    </Box>
  )
}

export default Stories