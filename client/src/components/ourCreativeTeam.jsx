import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { BarbersContext } from "../context/barbers";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import Grid from "@mui/material/Grid";

import CreateNewFolder from "@mui/icons-material/CreateNewFolder";

export default function OurCreativeTeam() {
  const { barbers, getAllBarbers, setBarberId, barberId } =
    useContext(BarbersContext);
  useEffect(() => {
    getAllBarbers();
  }, []);
  return (
    <Grid container spacing={4} xs={{ padding: "0 20px" }} justify="center">
<<<<<<< HEAD
      {/* {console.log("barbers:")}
      {console.log(barbers)} */}
=======
      {console.log("barbers:")}
      {console.log(barbers)}

>>>>>>> 1e40220436103ff963e2585987c874bcae3e25ca
      {barbers.map((val) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => setBarberId(val._id)}
            sx={{
              width: 300,
              bgcolor: "initial",
              boxShadow: "none",
              "--Card-padding": "0px",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <AspectRatio ratio="4/3">
                <figure>
                  <img
                    src={val.profilePhoto}
                    srcSet={val.profilePhoto}
                    loading="lazy"
                    alt="barber"
                  />
                </figure>
              </AspectRatio>
              <CardCover
                className="gradient-cover"
                sx={{
                  "&:hover, &:focus-within": {
                    opacity: 1,
                  },
                  opacity: 0,
                  transition: "0.1s ease-in",
                  background:
                    "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      flexGrow: 1,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                      <Link
                        href="#dribbble-shot"
                        overlay
                        underline="none"
                        sx={{
                          color: "#fff",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          display: "block",
                        }}
                      >
                        {val.barber_Name}
                      </Link>
                    </Typography>
                    <IconButton size="sm" color="neutral" sx={{ ml: "auto" }}>
                      <CreateNewFolder />
                      add comment
                    </IconButton>
                  </Box>
                </Box>
              </CardCover>
            </Box>
            <Box
              sx={{ display: "flex", gap: 1, mt: 1.5, alignItems: "center" }}
            >
              <Avatar
                src={val.profilePhoto}
                size="sm"
                sx={{ "--Avatar-size": "1.5rem" }}
              />
              <Typography sx={{ fontSize: "sm", fontWeight: "md" }}>
                {val.barber_Name}
              </Typography>
              <Chip
                variant="outlined"
                color="neutral"
                size="sm"
                sx={{
                  borderRadius: "sm",
                  py: 0.25,
                  px: 0.5,
                }}
              >
                {val.phoneNumber}
              </Chip>

              <Link
                href="#dribbble-shot"
                level="body3"
                underline="none"
                startDecorator={<Visibility />}
                sx={{
                  fontWeight: "md",
                  color: "text.secondary",
                  "&:hover": { color: "primary.plainColor" },
                }}
              >
                watch me
              </Link>
            </Box>
          </Card>
        </Grid>
      ))}
      {console.log(barberId)}
    </Grid>
  );
}
