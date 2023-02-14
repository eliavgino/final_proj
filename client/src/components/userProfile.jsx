import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Container, Avatar, Icon, AccessAlarm, ThreeDRotation } from "@mui/material";
import { shadows } from "@mui/system";
import UserHairCuts from "./userHaircuts";
import { useContext } from "react";
import { PagenationContext } from "../context/pagenation";
import CloseIcon from '@mui/icons-material/Close';
import { HairCutsContext } from "../context/hairCuts";
import jwtDecode from "jwt-decode";

function UserProfile() {

  const {userHairCuts}=useContext(HairCutsContext);

  
  const {userProfileDis, setUserProfileDis,page}=useContext(PagenationContext);

  useEffect(() => {
    console.log('kk')
  }, [userProfileDis])
  


  return (
    <Box className="profileContainer" sx={{display:userProfileDis}}>

      <Box className={`profileCard`} sx={{width:{lg:'35vw',xs:'80vw'}}}>

        <CloseIcon onClick={()=>{setUserProfileDis('none')}} sx={{position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>

        <Box className='profileHeaderBackground'></Box>           
        <Avatar className='profileAvatar' sx={{height:{lg:'14vh',xs:'15vh'},width:{lg:'7vw',xs:'22vw'},marginLeft:{lg:'4vw',xs:'10vw'}}}>
        </Avatar>
      
        <Typography className='profileUserName' sx={{fontSize:{lg:'2vw',xs:'5vw'} ,left:{lg:'14.5vw',xs:'41vw'} ,top:{lg:'-5vh',xs:'-5vh'},color:"white"}}>{localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')).name:null}</Typography>
      
        <Box className='profileUserDetails' component="div" sx={{left:{lg:'2vw',xs:'3vw'},top:{lg:'2.5vh',xs:'8vh'},display:'flex', height:'12%',minWidth:{lg:'30vw',xs:'75vw'},width:"fit-content"}}>

                <Box sx={{textAlign:'center', width:'30%',borderRight:'0.01vw solid black',height:'35%'}}>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.3vw'}}}>Phone number</Typography>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.5vw'}}}>{localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')).phoneNumber:null}</Typography>
                </Box>

                <Box sx={{textAlign:'center',width:'30%',borderRight:'0.01vw solid black', height:'35%'}}>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.3vw'}}}>Hair cuts count</Typography>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.5vw'}}}>{userHairCuts.length}</Typography>
                </Box>

                <Box sx={{textAlign:'center', width:'39%',height:'35%',ml:"5%"}}>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.3vw'}}}>email</Typography>
                  <Typography sx={{fontSize:{lg:'1vw',xs:'2.5vw'}}}>{localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')).email:null}</Typography>
                </Box>
        </Box>
      
        <Typography component="p" className='profileUserHairCuts' sx={{width:{lg:'fit-content',xs:'30vw'},fontSize:{lg:'2vw',xs:'5vw'} ,left:{lg:'10vw',xs:'26vw'} ,top:{lg:'-0.8vh',xs:'3.5vh'},color:"white"}}>Last HairCuts</Typography>
      
        <Box sx={{top:{xs:'-5vh'}}} component="div" className='profileHairCutsContainer'>
      
          <UserHairCuts/>
      
        </Box>
    
      </Box>  
    </Box>

  );
}

export default UserProfile;
;