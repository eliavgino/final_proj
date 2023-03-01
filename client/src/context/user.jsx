import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect, useContext, useLayoutEffect } from "react";
import { RoleContext } from "./role";
import { BarbersContext } from "./barbers";
import { PagenationContext } from "./pagenation";

export const UserContext = createContext(); 

function UserProvider(props) {
  const { children } = props;
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const {role, setRole}=useContext(RoleContext);

  const {setCerruntBarberId}=useContext(BarbersContext);

  const {setPage,setDis}=useContext(PagenationContext);

  const addNewUser = async (userObj) => {
    try {
      const response = await axios.post(process.env.REACT_APP_RENDER_URL+"/user", userObj, {});

      //storge user deatails into token
      let user = response.data;
      localStorage.setItem("token", response.headers["x-auth-token"]);
      const token = localStorage.getItem("token");
      setUsername(jwt_decode(token).name);
      setPage('home');
      setDis('');
      if(jwt_decode(token).role===('barber')||jwt_decode(token).role===('admin')){
      setCerruntBarberId(jwt_decode(token)._id)
      setRole('barber');
      }
      else
      setRole('client');

    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const authUser = async (userObj) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_RENDER_URL+"/auth",
        userObj,
        {}
      );
      localStorage.setItem("token", response.data);
      const token = localStorage.getItem("token");
      setUsername(jwt_decode(token).name);
      setRole(jwt_decode(token).role);
      setPage('home')
      setDis('')
      if(jwt_decode(token).role==='barber')
      setCerruntBarberId(jwt_decode(token)._id)
      
      
      return 'success'
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      
      alert(error.response.data);
    }
  };
  //get
  const getAllUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_RENDER_URL+"/user", {});
    } catch (error) {
      setErrorMsg(error);
      alert(error.message);
    }
  };
  /////log out
  const logOut = async () => {
    localStorage.removeItem('token');
    setUsername('')
    setRole('')
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          addNewUser,
          authUser,
          getAllUsers,
          logOut
          //   resetPassword,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}

export default UserProvider;
