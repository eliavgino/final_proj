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
import { RoleContext } from '../context/role';
import { BarbersContext } from '../context/barbers';
import jwtDecode from 'jwt-decode';
import { HairCutsContext } from './../context/hairCuts';


export default function NavBar() {
    
    const {page, setPage, setUserProfileDis, setDis}=useContext(PagenationContext);
    const {setPageState,
        setChooseTime,
        setChooseHairCut,
        setChooseBarber}=useContext(HairCutsContext)

    const {logOut,userName}=useContext(UserContext);

    const {role, setRole}=useContext(RoleContext);

    const {setBarberId, cerruntBarberId}=useContext(BarbersContext);

    const barberProfile=()=>{

        setBarberId(jwtDecode(localStorage.getItem('token'))._id);
        navigate('/barberProfile');
        setPage('barberProfile')

    }

    function resetHaircutSchedule(x,y){
        setPageState("chooseHairCut")
        setChooseTime(null)
        setChooseHairCut(null)
        setChooseBarber({_id:"a"})
        navigate(y);
        setPage(x);
        setDis('')
    }
    const UserProfile=()=>{

        setUserProfileDis('')

    }
    const navigate=useNavigate();

    useEffect(() => {
      console.log(page)
    }, [userName,page])
    
  return (
    <Box className='navBarContainer' sx={{color:'black', flexGrow: 1 }} >
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="p" className="navBarName" onClick={()=>{resetHaircutSchedule("home","/")}}>Barber</Box>
        <Box sx={{fontSize:{lg:'2vw',xs:'6vw'}}} component="div" className="navBarButtonsContainer">

            <Box sx={{display:page!=='home'?'none':''}}>
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}} component="button" className='navBarButton'><Link  to="about" spy={true} smooth={true}>About us </Link></Box>
            </Box>

            <Box sx={{display:page!=='home'?'none':''}}>
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}}  component="button" className='navBarButton'><Link  to="team" spy={true} smooth={true} onClick={()=>{}}>Our team</Link></Box>
            </Box>

            <Box sx={{display:page!=='home'?'none':''}}> 
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}}  component="button" className='navBarButton'><Link  to="results" spy={true} smooth={true}>Our results</Link></Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'none':''}} >
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}}  component="button" className='navBarButton'><Link  to="home" spy={true} smooth={true} onClick={()=>{resetHaircutSchedule("logIn",'/logIn')}}>Log in / Sign up</Link></Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'':'none'}}>
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}}  component="button" className='navBarButton' onClick={()=>{role==='barber'?barberProfile():UserProfile()}}>Profile</Box>
            </Box>

            <Box sx={{display:localStorage.getItem('token')?'':'none'}}>
                <Box sx={{height:{lg:"100%",xs:"100%"},fontSize:{lg:'1vw',xs:'2.5vw'}}}  component="button" className='navBarButton' onClick={()=>{logOut();navigate('/');setPage('home')}}><a style={{textDecoration:'none',color:'inherit'}} href='http://localhost:3000'> Log out </a></Box>
            </Box>
            
        </Box>
  
    </Box>
  );
}