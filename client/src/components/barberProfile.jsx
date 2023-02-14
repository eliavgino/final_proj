import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { BarbersContext } from "../context/barbers";
import { Typography, Container, Avatar } from "@mui/material";
import { shadows } from "@mui/system";
import UserHairCuts from "./userHaircuts";
import BarberComments from "./BarberComments";
import BarberPhotos from "./barberPhotos";
import { convertLength } from "@mui/material/styles/cssUtils";
import { RoleContext } from "../context/role";
import BarberHairCuts from "./barberHairCuts";
import jwtDecode from "jwt-decode";

function BarberProfile() {

  const { getbarberById, barberId, barber, cerruntBarberId } = useContext(BarbersContext);

  const {role,setRole}=useContext(RoleContext)

  useEffect(() => {

    const get=async()=>{
     await getbarberById({ _id: barberId });
    }
    get()
  }, [barberId]);

  return (
    <Box
      sx={{gap:{lg:"15vh",xs:"30vh"}}}
      className="barberProfileContainer"
      component="div"
    >
      <Box className="barberProfileHeaderBackground" sx={{ bgcolor: "black" }}></Box>

      <Avatar

        className="barberProfileAvatar"
        src={barber["profilePhoto"]}
        sx={{height:{lg:"8vw",xs:"27vw"}, width:{lg:"8vw",xs:"27vw"}}}
      ></Avatar>

      <Box
        className="barberProfileDetailsContainer"
        component="div"
        sx={{flexDirection:{xs:'column',lg:'row'},gap:{xs:"4vh"}}}
      >

        <Box sx={{width:{lg:"20vw",xs:"50vw"}, borderRight:{xs:0,lg:"0.1vw solid black"}}} className="barberProfileDetails">
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "6vw" } }}>
            {console.log(barber)}
            {barber.barber_Name}
          </Typography>
        </Box>

        <Box  sx={{width:{lg:"30vw",xs:"50vw"}, borderRight:{xs:0,lg:"0.1vw solid black"}}} className="barberProfileDetails">
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "6vw" } }}>
            {barber.email}
          </Typography>
        </Box>

        <Box  sx={{width:{lg:"20vw",xs:"50vw"}}} className="barberProfileDetails">
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "6vw" } }}>
            {barber.phoneNumber}
          </Typography>
        </Box>
      </Box>

      {cerruntBarberId===barberId?
      <Box sx={{}} component="div" className="barberProfileHairCutsContainer">

        <Box className="barberProfileHairCutsHeader">
          <Typography
            component="p"
            sx={{
              fontSize:{lg:"2vw",xs:"6vw"}
            }}
          >
            Last haircuts
          </Typography>
        </Box>
        <Box
          component="div"
          className="barberProfileHairCuts"
          sx={{
            backgroundColor:"transparent",
            position: "relative",
            width: "80vw",
          }}
        >
          <BarberHairCuts />
        </Box>

      </Box>
      :
      null}

      <Box className="barberProfilePhotosContainer">

        <Box component="div" className="barberProfilePhotosHeader">
          
          <Typography
            component="p"
            sx={{
              
             fontSize:{lg:"2vw",xs:"6vw"}
              
            }}
          >
            My haircuts
          </Typography>
        </Box>
        <Box
          component="div"
          className="barberProfilePhotos"
          sx={{
            
            left:{lg:"6vh",xs:"12vw"},
            width:{lg:"80vw",xs:"100vw"},
            height: "20vh",
            
          }}
        >
          <BarberPhotos />
        </Box>

      </Box>

      <Box className="barberProfileCommentsContainer">

        <Box className="barberProfileCommentsHeader">
          <Typography
            component="p"
            sx={{
              fontSize: { lg: "2vw", xs: "6vw" },
            }}
          >
            Comments
        </Typography>
        </Box>
        <Box
          component="div"
          className="barberProfileComments"
          sx={{
            position: "relative",
           
            width: "80vw",

            
            
          }}
        >
          <BarberComments />
        </Box>

      </Box>

    </Box>
  );
}

export default BarberProfile;
