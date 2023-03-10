import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./context/user";
import AddPhotos from "./components/addPhotos";
import PhotosProvider from "./context/photos";
import BarberProvider from "./context/barbers";
import OurCreativeTeam from "./components/ourCreativeTeam";
import barberPhotos from "./components/barberPhotos";
import CommentProvider from "./context/comments";
import HomePage from "./components/homePage";
import UserHairCuts from "./components/userHaircuts";
import NavBar from "./components/navBar";
import BarberProfile from "./components/barberProfile";
import BarberPhoto from "./components/barberPhotos";
import HairCutsProvider from "./context/hairCuts";
import PagenationProvider from "./context/pagenation";
import BarberApp from "./components/barberApp";
import ScheduleMain from "./components/schedule/scheduleMain";
import { BrowserRouter } from "react-router-dom";
import RoleProvider from "./context/role";
import ChatBox from './components/chatbot/chatBox'
import Login from './components/log or sign/logIn';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <BarberProvider>
          <PagenationProvider>
          <UserProvider>
            <HairCutsProvider>
              <PhotosProvider>
                <CommentProvider>
                  
                      
                        <BarberApp/>
                        <ChatBox/> 
                       
                      
                  
                </CommentProvider>
              </PhotosProvider>
            </HairCutsProvider>
          </UserProvider>
          </PagenationProvider>
        </BarberProvider>
      </RoleProvider> 
    </BrowserRouter>
  </React.StrictMode>
);


