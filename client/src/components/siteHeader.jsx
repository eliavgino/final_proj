import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PagenationContext } from '../context/pagenation';
import { RoleContext } from '../context/role';


function SiteHeader() {

  const { setDis}=useContext(PagenationContext);

  const {role}=useContext(RoleContext);

    const navigate=useNavigate();
  return (
    <div className='siteHeaderContainer'>

        <Box sx={{display:{lg:'block',xs:'none'}}} className='zitataHalf'>
            <div className='zitatatContainer'>
                <p className='zitata' ></p>
            </div>
        </Box>
        <Box sx={{width:{lg:'70vw',xs:'100vw'}}} className='logoHalf'>
            
           <button style={{display:role!=='barber'?'':'none'}} onClick={()=>{navigate('/schedule');setDis('none')}} className='bookBtn' >Book Appointment!</button>
           
        </Box>

    </div>
  )
}

export default SiteHeader