import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-scroll'

export default function NavBar() {
  return (
    <Box className='navBarContainer' sx={{color:'black', flexGrow: 1 }} >
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="p" className="navBarName">Barber</Box>
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="div" className="navBarButtonsContainer">

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="about" spy={true} smooth={true}>About us </Link></Box>
            </Box>

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="team" spy={true} smooth={true}>Our team</Link></Box>
            </Box>

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="results" spy={true} smooth={true}>Our results</Link></Box>
            </Box>

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="about" spy={true} smooth={true}>Sign up</Link></Box>
            </Box>

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="about" spy={true} smooth={true}>Log In</Link></Box>
            </Box>

            <Box>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'>Profile</Box>
            </Box>

        </Box>
    </Box>
  );
}