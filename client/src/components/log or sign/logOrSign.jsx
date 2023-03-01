import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import { useContext } from 'react';
import { PagenationContext } from '../../context/pagenation';
import { Box } from '@mui/system';

function LogOrSign() {

    const {logOrSign}=useContext(PagenationContext);

  return (
    <Box sx={{height:"100vh",width:"100vw"}}  component="div" className="logInPageContainer">
    {logOrSign==='log'?<LogIn/>:<SignUp/>}
    </Box>
  )
}

export default LogOrSign