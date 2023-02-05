import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const PhotosContext = createContext();

function PhotosProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/photo";
  const [photos, setphotos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const addNewphoto = async (photoObj) => {
    try {
      const photo = await axios.post(url, photoObj, {});
      console.log(photo);
      //adding the photo into arry of photos
      setphotos([...photos, photo]);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <PhotosContext.Provider value={{ addNewphoto }}>
        {children}
      </PhotosContext.Provider>
    </div>
  );
}

export default PhotosProvider;
