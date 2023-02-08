import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
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
      const photo = await axios.post(url, photoObj, {});
      console.log(photo);
      //adding the photo into arry of photos
      setphotos([...photos, photo]);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
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
