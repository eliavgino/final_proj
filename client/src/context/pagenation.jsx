import React, { createContext, useState, useEffect } from "react";

export const PagenationContext = createContext();

function PagenationProvider(props) {

  useEffect(() => {
    if(localStorage.getItem('token'))
      setDis('')
  }, [])
  

    const { children } = props;

    const [page,setPage]=useState('home');
    const [userProfileDis,setUserProfileDis]=useState('none');
    const [mustLogDis,setMustLogIn]=useState('none');
    const [barCantDis,setBarCantDis]=useState('none');
    const [addPhotoDis,setAddPhotoDis]=useState('none');
    const [dis,setDis]=useState('');

  return (
    <>
      <PagenationContext.Provider value={{page,setPage,userProfileDis,setUserProfileDis,mustLogDis,setMustLogIn,barCantDis,setBarCantDis, addPhotoDis,setAddPhotoDis,dis,setDis}}>
        {children}
      </PagenationContext.Provider>
    </>
  );
}

export default PagenationProvider;
