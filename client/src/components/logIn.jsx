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

const Login = () => {

  const { authUser, users } = useContext(UserContext);
  const {setLogSignDisplay}=useContext(PagenationContext);

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
      <Box className="logInPageContainer">
        <Box component="div" className="logInContainer">
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
                Sign in
              </Typography>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  authUser(user);
                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
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
                        id="password"
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
                    onClick={async(e) => {
                      e.preventDefault();
                      const response= await authUser(user);
                      if(response){

                        setLogSignDisplay('none')

                      }

                    }}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    log in
                  </Button>

                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="http://localhost:3000/signup" variant="body2">
                        Does'nt have an account? Sign up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

        </Box>
        <Box component="div" className="logInImageContainer">
            <img src="/images/login background.jpeg"></img>
        </Box>
      </Box>  
  );
};

export default Login;
