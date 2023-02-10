import React from 'react';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { PagenationContext } from '../context/pagenation';

function ScissorsLoading() {

    const {scissorsLoadingDis}=useContext(PagenationContext)

  return (
    <Box sx={{display:scissorsLoadingDis}} className="scissorsLoadingContainer">
    <ContentCutIcon sx={{
    animation: "spin 0.8s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },fontSize:{lg:"2.5vw",xs:"10vw"}
  }}
 className='scissorsLoading'/>
    </Box>
  )
}

export default ScissorsLoading