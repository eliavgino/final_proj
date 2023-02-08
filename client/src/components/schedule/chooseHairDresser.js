import React from "react";
import { useContext, useEffect, useState } from "react";

import { HairCutsContext } from "../../context/hairCuts";
import "./chooseHairDresser.css";
import "./chooseDates.css";

const ChooseHairCut = () => {
  const { setPageState, barbers, chooseBarber, pageState, setChooseBarber } =
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
    <div className="body">
      <div className="dateContainer">
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="container">
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
                {" "}
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
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button
              id="nextBtn"
              onClick={() => {
                setPageState("chooseDate");
              }}
            >
              Back
            </button>
            <button
              id="nextBtn"
              disabled={chooseBarber ? false : true}
              onClick={() => {
                setPageState("confirm");
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseHairCut;
