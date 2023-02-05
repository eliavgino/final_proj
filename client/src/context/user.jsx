import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/user";
  const [users, setusers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const addNewUser = async (userObj) => {
    try {
      const response = await axios.post(url, userObj, {});

      //storge user deatails into token
      let user = response.data;
      console.log(user);
      console.log(response.headers["x-auth-token"]);
      localStorage.setItem("token", response.headers["x-auth-token"]);

      //adding the user into arry of users
      setusers([...users, user]);
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
      console.log("this is what i send" + userObj.password + userObj.email);
      console.log("this is what i get as a respnonse : " + response.data);
      localStorage.setItem("token", response.data);
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      console.log(jwt_decode(token).user_id);
      setUsername(jwt_decode(token).name);
    } catch (error) {
      setErrorMsg(error);
      alert(error.response.data);
    }
  };
  //get
  const getAllUsers = async () => {
    try {
      const response = await axios.get(url, {});
      console.log(response);
      setusers(response.data);
    } catch (error) {
      setErrorMsg(error);
      alert(error.message);
    }
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
          users,
          authUser,
          getAllUsers,
          //   resetPassword,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}

export default UserProvider;
