import React from "react";
import Box from "@mui/material/Box";
import { Typography, Container, Avatar, Icon, AccessAlarm, ThreeDRotation } from "@mui/material";
import { shadows } from "@mui/system";
import UserHairCuts from "./userHaircuts";
import { useContext } from "react";
import { PagenationContext } from "../context/pagenation";
import CloseIcon from '@mui/icons-material/Close';

function UserProfile() {

  const {animation,setAnimation}=useContext(PagenationContext);

  return (

    <Box className={`profileContainer ${animation}`} sx={{width:{lg:'50vw',xs:'80vw'},left:{lg:'-100vw',xs:'-100vw'},top:{lg:'12vh',xs:'12vh'}}}>

      <CloseIcon onClick={()=>{setAnimation('slideOut')}} sx={{position:'absolute',zIndex:'999',right:0,margin:'0.4vw'}}/>

      <Box className='profileHeaderBackground'></Box>           
      <Avatar className='profileAvatar' sx={{height:{lg:'14vh',xs:'15vh'},width:{lg:'7vw',xs:'22vw'},marginLeft:{lg:'4vw',xs:'10vw'}}}>
      </Avatar>
    
      <Typography className='profileUserName' sx={{fontSize:{lg:'2vw',xs:'5vw'} ,left:{lg:'15vw',xs:'39vw'} ,top:{lg:'-5vh',xs:'-5vh'}}}>userProfile</Typography>
    
      <Box className='profileUserDetails' component="div" sx={{left:{lg:'2vw',xs:'3vw'},top:{lg:'4vh',xs:'8vh'},display:'flex', height:'20%',width:{lg:'30vw',xs:'75vw'}}}>
              <Box sx={{textAlign:'center', width:'33%',borderRight:'0.01vw solid black',height:'20%'}}><Typography sx={{fontSize:{lg:'1.5vw',xs:'4vw'}}}>userPhone</Typography></Box>
              <Box sx={{textAlign:'center',width:'33%',borderRight:'0.01vw solid black', height:'20%'}}><Typography sx={{fontSize:{lg:'1.5vw',xs:'4vw'}}}>userEmail</Typography></Box>
              <Box sx={{textAlign:'center', width:'33%',height:'20%'}}><Typography sx={{fontSize:{lg:'1.5vw',xs:'4vw'}}}>userHaircuts</Typography></Box>
      </Box>
    
      <Typography component="p" className='profileUserHairCuts' sx={{width:{lg:'fit-content',xs:'30vw'},fontSize:{lg:'2vw',xs:'5vw'}, fontFamily:'myThirdFont' ,left:{lg:'11vw',xs:'26vw'} ,top:{lg:'-2.5vh',xs:'3.5vh'}}}>Last HairCuts</Typography>
    
      <Box sx={{top:{xs:'-3vh'}}} component="div" className='profileHairCutsContainer'>
    
        <UserHairCuts/>
    
      </Box>
  
    </Box>  

  );
}

export default UserProfile;
