import React, { useEffect } from "react";
import { Box } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Avatar } from "@mui/material";
import { Image } from "cloudinary-react";
import { useContext } from "react";
import { PhotosContext } from "../context/photos";
import { useNavigate } from 'react-router-dom';
import { BarbersContext } from '../context/barbers';
import { PagenationContext } from "../context/pagenation";

function Stories() {
  const { getAllPhotos, photos } = useContext(PhotosContext);

  const { setBarberId }=useContext(BarbersContext);

  const {setPage,setDis}=useContext(PagenationContext);



  const navigate=useNavigate()

 useEffect(() => {

  const get=async() => {
     await getAllPhotos()
  }
  get();

 }, [])

  return (
    <Box className="storiesContainer">
      {console.log("photos")}
      
      <Box
        component="p"
       
        className="storiesHeader"
      >
        Latest works
      </Box>

      <Box className="cardsContainer" component="div">
      
        <AliceCarousel
          responsive={{ 0: { items: 2 }, 1024: { items: 4 } }}
          autoPlayInterval="3000"
          autoPlay="true"
          disableDotsControls="true"
          autoPlayStrategy="default"
          disableButtonsControls="true"
          infinite="true"
          items={photos.map((photo) => (
            <>
              <Box
                sx={{ width: { lg: "20vw", xs: "45vw" } }}
                className="ourResultCard"
                component="div"
              >
                <Box component="div">
                  <Image
                    className="storieImage"
                    cloudName="ddwsr6uth"
                    publicId={photo.photo}
                  ></Image>
                </Box>
              </Box>

              <Avatar onClick={()=>{setPage('barberProfile');setBarberId(photo.barber["_id"]);navigate('/barberProfile');setDis('')}} sx={{left:{lg:'7.5vw',xs:'14vw'},width:{lg:'5vw',xs:'18vw'},height:{lg:'10vh',xs:'12vh'}}} className='cardAvatar'>

                <Image cloudName="ddwsr6uth" publicId={photo.barber["profilePhoto"]}></Image>

              </Avatar>
            </>
          ))}
        />
      </Box>
    </Box>
  );
}

export default Stories;
