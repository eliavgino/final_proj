import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
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
import { PagenationContext } from '../context/pagenation';
import SignUp from "./signUp";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { authUser, users } = useContext(UserContext);
  const {setLogSignDisplay}=useContext(PagenationContext);

  const navigate=useNavigate();

  const [user, setUser] = useState({
    email: null,
    password: null,
  });

  const [imageAni,setImageAni]=useState('imageLogAni')
  const [parAni,setParAni]=useState('parLogAni')


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
      <Box  component="div" className="logSignPageContainer">

        <a href="https://nimble-sunburst-089ef9.netlify.app/" style={{position:"absolute",right:"2vw",top:"1vw",color:"grey",textDecoration:"none"}}>Log in as admin</a>

        <SignUp/>

        <Box sx={{border:'0.1vw solid black',backgroundColor:"white",marginTop:"3%"}} component="div" className="LogInContainer">
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
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
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

        <Box sx={{backgroundPosition:{xs:"-7.3vw"}, width:{lg:'33vw',xs:"51vw"},left:{lg:'24.4vw',xs:'0vw'},height:{lg:"100%",xs:"100vh"},marginTop:"3%"}} component="div" className={`logInImageContainer ${imageAni}`}>

          <Box component="div" className={`logInParagraph ${parAni}`}>

              {imageAni==='imageSignAni'?<Box sx={{fontSize:{lg:'1.8vw',xs:'7vw'}}}  component="p">Don't have a user? Sign Up! </Box>:<Box sx={{fontSize:{lg:'1.8vw',xs:'7vw'}}} component="p">Already signed up? Log in!</Box>}
              {imageAni==='imageSignAni'?<Button className="logSignButton" sx={{color:"white",bgcolor:"black"}}  onClick={()=>{setImageAni('imageLogAni');setParAni('parLogAni')}}>Log In</Button>:<Button   sx={{color:"white",bgcolor:"black"}} onClick={()=>{setImageAni('imageSignAni');setParAni('parSignAni');}}>Sign up</Button>}

          </Box>

        </Box>
      </Box>  
  );
};

export default Login;