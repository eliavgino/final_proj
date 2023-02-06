import React from "react";
import { useEffect, useState, useContext } from "react";
import { CommentContext } from "../context/comments";
import { BarbersContext } from "../context/barbers";
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
import Face from "@mui/icons-material/Face";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/joy/Input";
import HomePage from "./homePage";

const BarberComments = () => {
  const [body, setbody] = useState();
  const { getCommentByBarberId, barberComments, addCommentToBarber } =
    useContext(CommentContext);
  const { barberId } = useContext(BarbersContext);
  let page;
  useEffect(() => {
    getCommentByBarberId({ id: "63df7ccbdd4a0d2a523b6669" });
    // console.log("barber id :" + barberId);
    console.log("here e e e e e e e => " + barberComments);
  }, []);

  if (barberComments) {
    page = (
      <div>
        {/* {console.log(barberComments)}
      {console.log(barberId)} */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {barberComments.map((val) => (
            <Card
              variant="outlined"
              sx={{
                bgcolor: "white",
                margin: 5,
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
                  <Avatar
                    size="sm"
                    sx={{
                      p: 0.5,
                      border: "2px solid",
                      borderColor: "background.body",
                    }}
                  >
                    {val.user.user_Name[0]}
                  </Avatar>
                </Box>
                <Typography fontWeight="lg"> {val.user.user_Name}</Typography>
              </Box>

              <Typography fontSize="sm">{val.body}</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}
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
            </Card>
          ))}
        </Box>
        <Card
          variant="outlined"
          sx={{
            marginRight: 5,
            marginLeft: 5,
            bgcolor: "white",
            minWidth: 300,
            "--Card-radius": (theme) => theme.vars.radius.xs,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
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
              <Avatar
                size="sm"
                src="/static/logo.png"
                sx={{
                  p: 0.5,
                  border: "2px solid",
                  borderColor: "background.body",
                }}
              />
            </Box>
          </Box>

          <Typography fontSize="sm">
            write a comment about the barber
          </Typography>

          <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: -1 }}
            >
              <Face />
            </IconButton>
            <Input
              onChange={(e) => {
                setbody(e.target.value);
              }}
              variant="plain"
              size="sm"
              placeholder="Add a comment…"
              sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
            />
            <IconButton
              onClick={() => {
                addCommentToBarber({
                  id: "63df7ccbdd4a0d2a523b6669",
                  user_id: "63d7f38260b55e1906dcbb29",
                  body: body,
                });
                getCommentByBarberId({ id: "63df7ccbdd4a0d2a523b6669" });
              }}
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: -1 }}
            >
              <SendIcon />
            </IconButton>
          </CardOverflow>
        </Card>
      </div>
    );
  } else {
    page = <h1>loading</h1>;
  }
  return (
    <div>
      {console.log(page)}
      {page}
    </div>
  );
};

export default BarberComments;
