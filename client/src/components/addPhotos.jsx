import React from "react";
import { useContext, useState } from "react";
import { PhotosContext } from "../context/photos";
import axios from "axios";
import { Image } from "cloudinary-react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import { PagenationContext } from "../context/pagenation";
import { BarbersContext } from "../context/barbers";

const AddPhotos = () => {

  const { addNewphoto } = useContext(PhotosContext);

  const {addPhotoDis,setAddPhotoDis,setScissorsLoadingDis,setAddDescDis,setPickPhotoDis}=useContext(PagenationContext);
  
  const {cerruntBarberId}=useContext(BarbersContext);

  const [imagurl, setimagurl] = useState();
  const [imageToUploade, setimageToUploade] = useState();
  const [description, setdescription] = useState({});

  const handleSubmit=(e)=>{

    e.preventDefault();
    uploadImage()
    setdescription('')
    e.target.reset();

  }

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageToUploade);
    formData.append("upload_preset", "barbers");
    setAddPhotoDis('none')
    setScissorsLoadingDis('')
    setTimeout(() => {
      setScissorsLoadingDis('none')
    }, 1100);

    axios
      .post("https://api.cloudinary.com/v1_1/ddwsr6uth/image/upload", formData)
      .then((res) => {
        console.log(res.data.secure_url);
        console.log(cerruntBarberId);
        let result=addNewphoto({
          barber: cerruntBarberId,
          photo: res.data.secure_url,
          description: description,
        });
        result.then(result=>{
            if(result==='no')
              setAddDescDis('')
          })
      
      })
      .catch((err) => {
        console.log(err);
        setPickPhotoDis('')
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* <input
        type="file"
        onChange={(e) => {
          setimageToUploade(e.target.files[0]);
        }}
      />
      <input onChange={(e) => setdescription(e.target.value)} />
      <AddToPhotosIcon onClick={uploadImage}>add photo</AddToPhotosIcon>
      <Image cloudName="ddwsr6uth" publicId={imagurl} /> */}
      <Card
      className={`addPhotoCard `}
        variant="outlined"
        sx={{
          bgcolor:"white",
          position: "fixed",
          top:"8vh",
          right:"6vw",
          minWidth: 300,
          width: "30%",
          height: "30vh%",
          display:addPhotoDis,
          "--Card-radius": (theme) => theme.vars.radius.xs,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 1.5,
            gap: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar
              size="sm"
              src="/static/logo.png"
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Typography fontWeight="lg">Add a photo</Typography>
        </Box>

        <Typography fontSize="lg">
          Add a photo and description about the type of your haircut
        </Typography>
        <form onSubmit={handleSubmit}>
        <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
          <label
            htmlFor="upload-photo"
            style={{ marginRight: "1%", marginLeft: "1%" }}
          >
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={(e) => {
                setimageToUploade(e.target.files[0]);
              }}
            />

            <Fab color="primary" size="small" component="span" aria-label="add">
              <AddToPhotosIcon />
            </Fab>
          </label>
          <Input
            variant="plain"
            size="sm"
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Add a description"
            sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
          />

          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ ml: -1 }}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </CardOverflow>
          </form>
      </Card>
    </div>
  );
};

export default AddPhotos;
