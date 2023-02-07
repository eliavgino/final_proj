import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { BarbersContext } from "../context/barbers";
import { Typography, Container, Avatar } from "@mui/material";
import { shadows } from "@mui/system";
import UserHairCuts from "./userHaircuts";
import BarberComments from "./BarberComments";
import BarberPhotos from "./barberPhotos";

function BarberProfile() {
  const { getbarberById, barber } = useContext(BarbersContext);

  useEffect(() => {}, []);
  getbarberById({ _id: "63df7ce3dd4a0d2a523b666c" });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        gap: "4vh",
        width: "100vw",
        height: "100vh",
      }}
    >
      {console.log(barber)}
      <Box className="profileHeaderBackgroundB" sx={{ bgcolor: "black" }}></Box>
      <Avatar
        className="profileAvatarB"
        src={barber.profilePhoto}
        sx={{
          height: { lg: "14vh", xs: "15vh" },
          width: { lg: "7vw", xs: "22vw" },
          marginLeft: { lg: "45vw", xs: "10vw" },
        }}
      ></Avatar>

      <Box
        className="profileUserDetailsB"
        component="div"
        sx={{
          minHeight: "20vh",
          left: { lg: "34vw", xs: "13vw" },
          top: { lg: "4vh", xs: "8vh" },
          display: "flex",
          height: "20%",
          width: { lg: "30vw", xs: "75vw" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "33%",
            borderRight: "0.01vw solid black",
            height: "20%",
          }}
        >
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "4vw" } }}>
            {barber.barber_Name}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            width: "33%",
            borderRight: "0.01vw solid black",
            height: "20%",
          }}
        >
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "4vw" } }}>
            {barber.email}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", width: "33%", height: "20%" }}>
          <Typography sx={{ fontSize: { lg: "1.5vw", xs: "4vw" } }}>
            {barber.phoneNumber}
          </Typography>
        </Box>
      </Box>

      <Typography
        component="p"
        className="profileUserHairCutsB"
        sx={{
          width: { lg: "fit-content", xs: "30vw" },
          fontSize: { lg: "2vw", xs: "5vw" },
          left: { lg: "43vw", xs: "35vw" },
        }}
      >
        my haircuts
      </Typography>
      <Box
        component="div"
        className="photos"
        sx={{
          position: "relative",
          minHeight: "80vh",
          width: "80vw",
          height: "20vh",
          left: "18vh",
        }}
      >
        <BarberPhotos />
      </Box>

      <Typography
        component="p"
        className="profileUserHairCutsB"
        sx={{
          width: { lg: "fit-content", xs: "30vw" },
          fontSize: { lg: "2vw", xs: "5vw" },
          marginTop: "5vh",
          left: { lg: "43vw", xs: "35vw" },
        }}
      >
        comeents
      </Typography>

      <Box
        component="div"
        className="comments"
        sx={{
          position: "relative",
          minHeight: "80vh",
          width: "80vw",

          height: "20vh",
          left: "18vh",
        }}
      >
        <BarberComments />
      </Box>
    </Box>
  );
}

export default BarberProfile;
