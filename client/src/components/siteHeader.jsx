import { Box } from '@mui/material'
import React from 'react'

function SiteHeader() {
  return (
    <div className='siteHeaderContainer'>

        <Box sx={{display:{lg:'block',xs:'none'}}} className='zitataHalf'>
            <div className='zitatatContainer'>
                <p className='zitata' >"Barbeing is the best thing a barber can do"</p>
            </div>
        </Box>
        <Box sx={{width:{lg:'70vw',xs:'100vw'}}} className='logoHalf'>
            {/* <Box className='logoContainer'>
                <Box component={'img'} sx={{right:{lg:'10vw'},width:{lg:'150%',sm:'100%'}}} className='logo' src="/images/logo.png" alt="error" />
            </Box> */}
        </Box>

    </div>
  )
}

export default SiteHeader