import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { convertLength } from "@mui/material/styles/cssUtils";

export const PhotosContext = createContext();

function PhotosProvider(props) {

  const { children } = props;
  const url = "http://localhost:4000/api/v1/photo";
  const [photos, setphotos] = useState([]);
  const [barberPhotos, setbarberPhotos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const getAllPhotos = async () => {
    try {
      const photo = (await axios.get(url)).data;

      //array of all the photos
      setphotos(photo);
      
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const addNewphoto = async (photoObj) => {
    try {
      await axios.post(url, photoObj, {});
      
      //taking all photos include the new photo
      getAllPhotos();
      return 'great photos'
    } catch (error) {
      console.log(error);
      return 'no'
    }
  };
  const getPhotosByBarberId = async (barberIdobj) => {
    try {
      const barber = await axios.post(
        "http://localhost:4000/api/v1/photo/getphotobyid",
        barberIdobj,
        {}
      );
      console.log(barber.data);
      setbarberPhotos(barber.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <PhotosContext.Provider
        value={{
          addNewphoto,
          getPhotosByBarberId,
          getAllPhotos,
          barberPhotos,
          photos,
        }}
      >
        {children}
      </PhotosContext.Provider>
    </div>
  );
}

export default PhotosProvider;
