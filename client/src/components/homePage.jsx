import React from "react";
import AboutUs from "./aboutUs";
import NavBar from "./navBar";
import OurCreativeTeam from "./ourCreativeTeam";
import SiteHeader from "./siteHeader";
import { Box } from "@mui/system";
import Stories from "./stories";
import Details from "./details";
import UserProfile from "./userProfile";
import { useContext } from 'react';
import { PagenationContext } from '../context/pagenation';

function HomePage() {


  
  return (
    <>
      <div className="mainBodyHome">
      <Box id="home"/>
        <SiteHeader />
        <Box id="about"/>
        <AboutUs />
        <Box id="results"/>
        <Stories />
        <Box id="team"/>
        <OurCreativeTeam/>
        <Details />
      </div>
      <UserProfile />
    </>
  );
}

export default HomePage;
