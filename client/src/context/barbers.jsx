import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const BarbersContext = createContext();

function BarberProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/barber";
  const [barbers, setBarbers] = useState([]);
  const [barber, setBarber] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const getAllBarbers = async () => {
    try {
      let response = await axios.get(url, {});
      const barber = response.data;
      console.log(barber);
      //adding the barber into arry of barbers
      setBarbers(barber);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getbarberById = async (barberId) => {
    try {
      let response = await axios.post(
        "http://localhost:4000/api/v1/barber/barberprofile",
        barberId,
        {}
      );
      setBarber(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <BarbersContext.Provider
        value={{ getAllBarbers, barbers, getbarberById, barber }}
      >
        {children}
      </BarbersContext.Provider>
    </div>
  );
}

export default BarberProvider;
