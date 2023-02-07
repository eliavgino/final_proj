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
import Login from "./components/logIn";
import SignUp from "./components/signUp";
import HairCutsProvider from "./context/hairCuts";
import BarberComments from "./components/BarberComments";
import ChooseHairCut from "./components/schedule/chooseHairCut";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <HairCutsProvider>
        <PhotosProvider>
          <BarberProvider>
            <CommentProvider>
              <AddPhotos />
              {/* <App /> */}
              {/* <BarberProfile /> */}
              {/* <AddPhotos /> */}
              {/* <OurCreativeTeam /> */}
              {/* <BarberComments /> */}
              {/* <ChooseHairCut /> */}
            </CommentProvider>
          </BarberProvider>
        </PhotosProvider>
      </HairCutsProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
