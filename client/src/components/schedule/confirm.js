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

const Confirm = () => {
  const { chooseTime, chooseHairCut, chooseBarber, decoded, token } =
    useContext(HairCutsContext);
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
  function handleConfirm() {
    console.log(
      chooseHairCut._id,
      chooseTime.date,
      chooseTime.time,
      chooseBarber._id,
      decoded
    );
    addNewHaircut();
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
      {console.log("chooseTime")}
      {console.log(chooseTime)}
      {console.log("chooseHairCut")}
      {console.log(chooseHairCut)}
      {console.log("chooseBarber")}
      {console.log(chooseBarber)}
      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src="https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTIyOTc1NDU1/ask-history-why-is-barber-pole-red-white-blue-istock_000017032172large-2.jpg"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "lg", mt: 2 }}>
          Date deatailes:
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          date: {chooseTime.day}/{chooseTime.date[5]}
          {chooseTime.date[6]}/{chooseTime.date[0]}
          {chooseTime.date[1]}
          {chooseTime.date[2]}
          {chooseTime.date[3]}
        </Typography>
        <Typography level="body2" sx={{ mb: 2 }}>
          houer: {chooseTime.time}
        </Typography>
        <Typography level="h2" sx={{ fontSize: "lg" }}>
          Barber name:
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          {chooseBarber.barber_Name}
        </Typography>
        <Typography level="h2" sx={{ fontSize: "lg", mt: 2 }}>
          Hair cut type :
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
          <Button onClick={handleConfirm} sx={{ bgcolor: "green" }}>
            confirm
          </Button>

          <Divider orientation="vertical" />
          <Button sx={{ bgcolor: "red" }}>cancle</Button>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default Confirm;
