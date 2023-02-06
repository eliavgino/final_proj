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
import BarberProfile from "./components/barberProfile";
import Login from "./components/logIn";
import SignUp from "./components/signUp";
import CommentProvider from "./context/comments";
import HairCutsProvider from "./context/hairCuts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PhotosProvider>
        <BarberProvider>
          <CommentProvider>
            <HairCutsProvider>
          {/* <AddPhotos /> */}
          <Login/>
          <SignUp/>
          <App />
          {/* <BarberProfile /> */}
          {/* <AddPhotos /> */}
          {/* <OurCreativeTeam /> */}
          </HairCutsProvider>
          </CommentProvider>
        </BarberProvider>
      </PhotosProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
