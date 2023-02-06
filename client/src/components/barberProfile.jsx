import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { PhotosContext } from "../context/photos";
import { BarbersContext } from "../context/barbers";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withTheme } from "@emotion/react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function BarberProfileAlbum() {
  const { barberPhotos, getPhotosByBarberId, addNewphoto } =
    useContext(PhotosContext);
  const { barber, getbarberById } = useContext(BarbersContext);
  useEffect(() => {
    getPhotosByBarberId({ barber: "63df7ce3dd4a0d2a523b666c" });
    getbarberById({ _id: "63df7ce3dd4a0d2a523b666c" });
  }, []);
  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            name
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Container>
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
    </>
  );
}
