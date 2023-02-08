import React, { createContext, useState, useEffect } from "react";

export const PagenationContext = createContext();

function PagenationProvider(props) {

    const { children } = props;

    const [page,setPage]=useState('home');
    const [animation,setAnimation]=useState('')
    const [mustLogDis,setMustLogIn]=useState('none')

  return (
    <>
      <PagenationContext.Provider value={{page,setPage,animation,setAnimation,mustLogDis,setMustLogIn}}>
        {children}
      </PagenationContext.Provider>
    </>
  );
}

export default PagenationProvider;
