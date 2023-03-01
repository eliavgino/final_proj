import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../context/user";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PagenationContext } from "../../context/pagenation";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignUp() {
  
  const navigate = useNavigate();

  const { addNewUser, users } = useContext(UserContext);

  const {setLogOrSign}=useContext(PagenationContext)
  
  const [user, setUser] = useState({
    user_Name: null,
    email: null,
    password: null,
    phoneNumber: null,
  });

  return (
    <>
      <Box sx={{border:'0.1vw solid black',backgroundColor:"white",marginTop:"3%",height:{xs:"80vh",lg:"75vh"}, width:{xs:"90vw",lg:'30vw'}}} className="SignUpContainer">

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.target.reset();
                const response=addNewUser(user);
                if(response){

                  navigate('/')

                }
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      placeholder="user name..."
                      name="user_Name"
                      type="text"
                      required
                      fullWidth
                      autoFocus
                      onChange={(ev) => {
                        setUser({ ...user, user_Name: ev.target.value });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(ev) =>
                        setUser({ ...user, email: ev.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(ev) =>
                        setUser({ ...user, password: ev.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="phoneNumber"
                      label="phoneNumber"
                      type="tel"
                      placeholder="+972..."
                      autoComplete="phoneNumber"
                      onChange={(ev) =>
                        setUser({ ...user, phoneNumber: ev.target.value })
                      }
                    />
                  </Grid>
                  <Grid sx={{display:{xs:"block",lg:"none"}}} item xs={12}>
                        <a style={{color:"blue", textDecoration:"underline"}} onClick={()=>{setLogOrSign('log')}}>Already signed up? Log in!</a>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>

      <Box sx={{display:{xs:"none",lg:'block'}, width:{lg:'30vw',xs:"51vw"},height:{lg:"75vh",xs:"100vh"},marginTop:"3%"}} component="div" className={`logInImageContainer`}>

        <Box component="div" className={`logInParagraph`}>

            <Box sx={{fontSize:{lg:'1.8vw',xs:'7vw'}}} component="p">Already signed up? Log in!</Box>
            <Button className="logSignButton" sx={{color:"white",bgcolor:"black"}}  onClick={()=>{setLogOrSign('log')}}>Log In</Button>

        </Box>

      </Box>
    </>
 
  );
}
export default SignUp;
