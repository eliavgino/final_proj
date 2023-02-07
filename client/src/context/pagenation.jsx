import React, { createContext, useState, useEffect } from "react";

export const PagenationContext = createContext();

function PagenationProvider(props) {

    const { children } = props;

    const [page,setPage]=useState('');
    const [logSignDisplay,setLogSignDisplay]=useState('none');
    const [animation,setAnimation]=useState('')

  return (
    <>
      <PagenationContext.Provider value={{page,setPage,logSignDisplay,setLogSignDisplay,animation,setAnimation}}>
        {children}
      </PagenationContext.Provider>
    </>
  );
}

export default PagenationProvider;
