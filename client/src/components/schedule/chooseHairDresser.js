import React from "react";
import { useContext, useEffect, useState } from "react";

import { HairCutsContext } from "../../context/hairCuts";
import "./chooseHairDresser.css";
import "./chooseDates.css";

const ChooseHairCut = () => {
  const { setPageState, barbers, chooseBarber, pageState, setChooseBarber,setChooseHairCut } =
    useContext(HairCutsContext);
  const [buttonState, setButtonState] = useState("");
  
  function handleClick(selectedBarber) {
    let randomIndex = Math.floor(Math.random() * barbers.length);
    setChooseBarber(selectedBarber ? selectedBarber : barbers[randomIndex]);
    setButtonState(
      selectedBarber
        ? selectedBarber.barber_Name
        : barbers[randomIndex].barber_Name
    );
  }

  return (
    <div>
      <div className="container2">
        <h2 style={{ marginBottom: "3rem" }}>choose Barber:</h2>
        {barbers.map((barber) => (
          <button
            disabled={buttonState === barber.barber_Name}
            onClick={() => handleClick(barber)}
            value={barber}
            key={barber.barber_Name}
            className={`chooseHairDresser ${
              buttonState === barber.barber_Name ? "clicked-button" : ""
            }`}
          >
            {barber.barber_Name}
          </button>
        ))}
        <div>
          <button
            onClick={() => handleClick()}
            key={barbers[0].barber_Name}
            className={`chooseHairDresser ${
              buttonState === barbers[0].barber_Name ? "clicked-button" : ""
            }`}
          >
            I dont care
          </button>
        </div>

        
          <button
            id="nextBtn"
            className="navigateBtns"
            disabled={chooseBarber._id=="a" ? true : false}
            onClick={() => {
              setPageState("chooseDate");
            }}
          >
            Next
          </button>
          <button style={{marginTop:"-4.6rem"}}
          className="navigateBtns"
            id="nextBtn"
            onClick={() => {
              setPageState("chooseHairCut");setChooseHairCut(null)
            }}
          >
            Back
          </button>
        
      </div>
    </div>
  );
};

export default ChooseHairCut;
