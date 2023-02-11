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
import { PagenationContext } from "../context/pagenation";
import jwtDecode from "jwt-decode";
import { RoleContext } from "../context/role";

const BarberComments = () => {

  const [body, setbody] = useState();

  const { getCommentByBarberId, barberComments, addCommentToBarber } =
    useContext(CommentContext);

  const {setMustLogIn, setBarCantDis}=useContext(PagenationContext);

  const { barberId } = useContext(BarbersContext);

  const {role}=useContext(RoleContext)

  let page;

  useEffect(() => {

    getCommentByBarberId({ id: barberId });

  }, []);

  if (barberComments) {
    page = (
      <div>
      
        <Box sx={{ display: "grid", gridTemplateColumns:{lg: "repeat(3,1fr)", xs:"repeat(1,1fr)" }}}>
          {barberComments.map((val) => (
            <Card
              variant="outlined"
              sx={{
                bgcolor: "#8d8b80;",
                margin:1,
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
            m:1,
            
            bgcolor: " #8d8b80",
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
            <form onSubmit={async(e)=>{
              e.preventDefault()
              e.target.reset()
              if(!localStorage.getItem('token'))
              setMustLogIn('')
              else if(role==='barber'){
                setBarCantDis('')
              }
              else{
             await addCommentToBarber({
              id: barberId,
              user_id:jwtDecode(localStorage.getItem("token"))._id ,
              body: body,
            })
            await getCommentByBarberId({ id: barberId });
          }
          }}>
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
              type="submit"
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: -1 }}
            >
              <SendIcon />
            </IconButton>
            </form>
          </CardOverflow>
        </Card>
      </div>
    );
  } else {
    page = (
      <>
        <h1>loading</h1>
        <Card
          variant="outlined"
          sx={{
            marginRight: 5,
            marginLeft: 5,
            bgcolor: "black",
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
            <form onSubmit={(e)=>{

              
              
              console.log(!localStorage.getItem('token'))
              if(!localStorage.getItem('token'))
              setMustLogIn('');
              else{
              addCommentToBarber({
                id: barberId,
                user_id: jwtDecode(localStorage.getItem("token"))._id,
                body: body,
              });
              getCommentByBarberId({ id: barberId });
            }
              }}>
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
              type="submit"
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: -1 }}
            >
              <SendIcon />
            </IconButton>
            </form>
          </CardOverflow>
        </Card>
      </>
    );
  }
  return (
    <div>
      {page}
    </div>
  );
};

export default BarberComments;