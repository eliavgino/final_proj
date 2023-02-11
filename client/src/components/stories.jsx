import React, { useEffect } from "react";
import { Box } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Avatar, Container } from "@mui/material";
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
        sx={{fontSize:"320%"}}
      >
        Latest works
      </Box>

      <Box sx={{top: {lg:"-12vh",xs:"-15vh"}}} className="cardsContainer" component="div">
      
        <AliceCarousel
          responsive={{ 0: { items: 1 }, 1024: { items: 4 } }}
          autoPlayInterval="3000"
          autoPlay="true"
          disableDotsControls="true"
          autoPlayStrategy="default"
          disableButtonsControls="true"
          infinite="true"
          items={photos.map((photo) => (
            <>
              <Box
                sx={{ width: { lg: "20vw", xs: "80vw" } }}
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

              <Avatar onClick={()=>{setPage('barberProfile');setBarberId(photo.barber["_id"]);navigate('/barberProfile');setDis('')}} sx={{left:{lg:'7.5vw',xs:'28vw'},width:{lg:'5vw',xs:'23vw'},height:{lg:'10vh',xs:'12vh'}}} className='cardAvatar'>

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
