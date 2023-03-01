import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
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
import { PagenationContext } from '../../context/pagenation';
import SignUp from "./signUp";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

  const { authUser, users } = useContext(UserContext);
  const {setLogOrSign}=useContext(PagenationContext);

  const navigate=useNavigate();

  const [user, setUser] = useState({
    email: null,
    password: null,
  });

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

  return (
    <>
        <a href="https://nimble-sunburst-089ef9.netlify.app/" className="hrefLogIn" style={{position:"absolute",right:"2vw",top:"10vw",color:"grey",textDecoration:"none"}}>Log in as admin</a>

        <Box sx={{border:'0.1vw solid black',backgroundColor:"white",marginTop:"3%",height:{xs:"80vh",lg:"75vh"}, width:{xs:"90vw",lg:'30vw'}}} component="div" className="LogInContainer">
          <Container component="main" maxWidth="xs">
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
                Log in
              </Typography>
              <form
                onSubmit={async(e) => {
                  e.preventDefault();
                  e.target.reset();
                  authUser(user);
                  const response= await authUser(user);
                  if(response){

                    navigate('/')

                  }

                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
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
                    <Grid sx={{display:{xs:"block",lg:"none"}}} item xs={12}>
                        <a style={{color:"blue", textDecoration:"underline"}} onClick={()=>{setLogOrSign('sign')}}>Don't have a user? Sign Up!</a>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 17, mb: 2 }}
                  >
                    Log in
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

        <Box sx={{display:{xs:"none",lg:'block'}, width:{lg:'30vw'},height:{lg:"75vh",},marginTop:"3%"}} component="div" className={`logInImageContainer`}>

          <Box component="div" className={`logInParagraph`}>

              <Box sx={{fontSize:{lg:'1.8vw',xs:'7vw'}}}  component="p">Don't have a user? Sign Up! </Box>
              <Button   sx={{color:"white",bgcolor:"black"}} onClick={()=>{setLogOrSign('sign')}}>Sign up</Button>

          </Box>

        </Box>

    </>
    
  );
};

export default LogIn;