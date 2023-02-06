import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const CommentContext = createContext();

function CommentProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/barber";
  const [comments, setComments] = useState([]);
  const [barberComments, setBarberComments] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const addCommentToBarber = async (commentObj) => {
    try {
      const comment = await axios.post(
        "http://localhost:4000/api/v1/barber/addCommentToBarber",
        commentObj,
        {}
      );
      console.log(comment.data);
      setComments([...comments, comment.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentByBarberId = async (barberId) => {
    try {
      let response = await axios.post(
        "http://localhost:4000/api/v1/barber/getCommentByBarberId",
        barberId,
        {}
      );
      setBarberComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CommentContext.Provider
        value={{ getCommentByBarberId, barberComments, addCommentToBarber }}
      >
        {children}
      </CommentContext.Provider>
    </div>
  );
}

export default CommentProvider;
