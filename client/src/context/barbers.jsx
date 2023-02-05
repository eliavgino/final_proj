import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const BarbersContext = createContext();

function BarberProvider(props) {
  const { children } = props;
  const url = "http://localhost:4000/api/v1/barbers";
  const [barbers, setBarbers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUsername] = useState("");

  const getAllBarbers = async () => {
    try {
      const barber = await axios.get(url, {});
      console.log(barber);
      //adding the barber into arry of barbers
      setBarbers([...barbers, barber]);
      console.log(barbers);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <BarbersContext.Provider value={{ getAllBarbers }}>
        {children}
      </BarbersContext.Provider>
    </div>
  );
}

export default BarberProvider;
