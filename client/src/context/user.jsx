import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/user";
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const addNewUser = async (userObj) => {
    try {
      const response = await axios.post(url, userObj, {});

      //storge user deatails into token
      let user = response.data;
      console.log(response.headers["x-auth-token"]);
      localStorage.setItem("token", response.headers["x-auth-token"]);
   
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const authUser = async (userObj) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth",
        userObj,
        {}
      );
     
      localStorage.setItem("token", response.data);
      const token = localStorage.getItem("token");
      setUsername(jwt_decode(token).name);
      return 'success'
    } catch (error) {
      setErrorMsg(error);
      alert(error.response.data);
    }
  };
  //get
  const getAllUsers = async () => {
    try {
      const response = await axios.get(url, {});
    } catch (error) {
      setErrorMsg(error);
      alert(error.message);
    }
  };
  /////log out
  const logOut = async () => {
    localStorage.removeItem('token');
    setUsername('')
  };
  //   const resetPassword = async (userObj) => {
  //     try {
  //       if (userObj.password == userObj.newPassword) {
  //         const userToSend = { password: userObj.password, email: userObj.email };
  //         const response = await axios.post(
  //           "http://localhost:4000/api/v1/user/resetPassword",
  //           userToSend,
  //           {}
  //         );
  //         console.log("update password");
  //         alert("password update succesfuly");
  //       } else {
  //         alert("check your passwords");
  //       }
  //     } catch (error) {
  //       setErrorMsg(error);
  //     }
  //   };

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
