import React from "react";
import { useContext, useEffect, useState } from "react";
import { HairCutsContext } from "../../context/hairCuts";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";


const Confirm = () => {
  const navigate=useNavigate()
  const { chooseTime, chooseHairCut, chooseBarber, decoded, token ,setPageState} =
    useContext(HairCutsContext);
    const [message,setMessage]=useState("")
  async function addNewHaircut() {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/haircut", {
        user: decoded._id,
        barber: chooseBarber,
        hour: chooseTime.time,
        date: chooseTime.date,
        hairCut: chooseHairCut,
      });
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function handleConfirm() {
    if (token) {
        try {
            await addNewHaircut();
            setMessage("Your Booking has been confirmed!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
   
    } 
    else if(message=="You need to login first!"){
      alert("You must login first!")
    }else  {
        setMessage("You need to login first!");
    }
}
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
     
      <Card variant="outlined" sx={{ width: 320 ,backgroundColor:"lightGrey"}}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src="https://nationalbarbers.org/wp-content/uploads/2020/01/BARBER-STAND-OUT-768x432.png"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "lg", mt: 2 }}>
          Booking details:
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          Date: {chooseTime.day}/{chooseTime.date[5]}
          {chooseTime.date[6]}/{chooseTime.date[0]}
          {chooseTime.date[1]}
          {chooseTime.date[2]}
          {chooseTime.date[3]}
        </Typography>
        <Typography level="body2" sx={{ mb: 2 }}>
          Time: {chooseTime.time}
        </Typography>
        <Typography level="h2" sx={{ fontSize: "lg" }}>
          Barber name:
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          {chooseBarber.barber_Name}
        </Typography>
        <Typography level="h2" sx={{ fontSize: "lg", mt: 2 }}>
          Haircut type :
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          {chooseHairCut.product_name}
        </Typography>

        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            bgcolor: "background.level1",
          }}
        >
          <Button onClick={()=>{navigate('/');setPageState("chooseHairCut")}} sx={{ bgcolor: "grey" }}>Cancel</Button>
          <Divider orientation="vertical" />
          <Button onClick={handleConfirm} sx={{ bgcolor: "white" ,color:"black"}}>Confirm </Button>
        </CardOverflow>
        {message}
      </Card>
    </div>
  );
};

export default Confirm;
