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
import CommentProvider from "./context/comments";
import BarberComments from "./components/BarberComments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PhotosProvider>
        <BarberProvider>
          <CommentProvider>
            {/* <AddPhotos /> */}
            {/* <App /> */}
            {/* <OurCreativeTeam /> */}
            <BarberProfile />
            {/* <AddPhotos /> */}
            {/* <BarberComments /> */}
          </CommentProvider>
        </BarberProvider>
      </PhotosProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
