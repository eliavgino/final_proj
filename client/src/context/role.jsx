import React, { createContext, useState, useEffect } from "react";

export const RoleContext = createContext();

function RoleProvider(props) {

    const { children } = props;

    const [ role, setRole ]=useState('');

  return (
    <>
      <RoleContext.Provider value={{ role, setRole }}>
        {children}
      </RoleContext.Provider>
    </>
  );
}

export default RoleProvider;