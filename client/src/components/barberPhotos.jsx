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
import { withTheme } from "@emotion/react";
import BarberComments from "./BarberComments";

export default function BarberPhoto() {

  const { barberPhotos, getPhotosByBarberId, addNewphoto } =
    useContext(PhotosContext);

  const { barber, barberId } = useContext(BarbersContext);

  useEffect(() => {
    getPhotosByBarberId({ barber: barberId  });

    console.log("barber idgdgd" + barberId);
  }, []);
  return (
    <>
      <Grid
        container
        spacing={1}
        xs={{ padding: "0 2%" }}
        justify="center"
        sx={{ marginLeft: "2", marginRight: "2" }}
      >
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
