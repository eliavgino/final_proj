import React from "react";
import { useContext, useState } from "react";
import { PhotosContext } from "../context/photos";
import axios from "axios";
import { Image } from "cloudinary-react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
const AddPhotos = () => {
  const { addNewphoto } = useContext(PhotosContext);
  const [imagurl, setimagurl] = useState();
  const [imageToUploade, setimageToUploade] = useState();
  const [description, setdescription] = useState({});
  const uploadImage = () => {
    console.log(imageToUploade);
    const formData = new FormData();
    formData.append("file", imageToUploade);
    formData.append("upload_preset", "barbers");
    console.log();

    axios
      .post("https://api.cloudinary.com/v1_1/ddwsr6uth/image/upload", formData)
      .then((res) => {
        console.log(res.data.secure_url);
        setimagurl(res.data.secure_url);
      });
    addNewphoto({
      barber: "63df7ce3dd4a0d2a523b666c",
      photo: imagurl,
      description: description,
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setimageToUploade(e.target.files[0]);
        }}
      />
      <input onChange={(e) => setdescription(e.target.value)} />

      <AddToPhotosIcon onClick={uploadImage}>add photo</AddToPhotosIcon>
      {/* <Image cloudName="ddwsr6uth" publicId={imagurl} /> */}
    </div>
  );
};

export default AddPhotos;
