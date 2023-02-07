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
      <Grid container spacing={4} xs={{ padding: "0 20px" }} justify="center">
        {barberPhotos.map((photo) => (
          <Grid item key={photo._id} xs={12} sm={6} md={4}>
            {" "}
            <Card
              variant="outlined"
              sx={{
                minWidth: 300,
                "--Card-radius": (theme) => theme.vars.radius.xs,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pb: 1.5,
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      m: "-2px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                    },
                  }}
                >
                  <Avatar size="sm" src={photo.photo} />
                </Box>
              </Box>
              <CardOverflow>
                <AspectRatio>
                  <img src={photo.photo} alt="" loading="lazy" />
                </AspectRatio>
              </CardOverflow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: -1,
                  my: 1,
                }}
              >
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <ModeCommentOutlined />
                  </IconButton>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <SendOutlined />
                  </IconButton>
                </Box>
              </Box>

              <Typography fontSize="sm">
                <Link
                  component="button"
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  description
                </Link>{" "}
                {photo.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BarberComments />
    </Box>
  );
}

export default BarberProfile;
