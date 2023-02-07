import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-scroll'
import { useContext,useEffect } from 'react';
import { PagenationContext } from '../context/pagenation';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    
    const {page, setPage, setAnimation}=useContext(PagenationContext);
    const {logOut,userName}=useContext(UserContext);

    const navigate=useNavigate();

    useEffect(() => {
      
    }, [userName])
    
  return (
    <Box className='navBarContainer' sx={{color:'black', flexGrow: 1 }} >
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="p" className="navBarName" onClick={()=>{navigate('/');setPage('home')}}>Barber</Box>
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="div" className="navBarButtonsContainer">

            <Box sx={{display:page!=='home'?'none':''}}>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="about" spy={true} smooth={true} onClick={()=>{}} >About us </Link></Box>
            </Box>

            <Box sx={{display:page!=='home'?'none':''}}>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="team" spy={true} smooth={true} onClick={()=>{}} >Our team</Link></Box>
            </Box>

            <Box sx={{display:page!=='home'?'none':''}}> 
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="results" spy={true} smooth={true} onClick={()=>{}}>Our results</Link></Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'none':''}} >
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton'><Link  to="home" spy={true} smooth={true} onClick={()=>{navigate('/logIn');setPage('logIn')}}>Log in / Sign up</Link></Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'':'none'}}>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton' onClick={()=>{setAnimation('slideIn')}}>Profile</Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'':'none'}}>
                <Box sx={{fontSize:{lg:'1vw',xs:'2.7vw'}}} component="button" className='navBarButton' onClick={()=>{logOut();navigate('/');setPage('home')}}><a style={{textDecoration:'none',color:'inherit'}} href='http://localhost:3000'> Log out</a></Box>
            </Box>
            
        </Box>
  
    </Box>
  );
}