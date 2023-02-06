import React from 'react';
import { useContext } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import "./chooseDates.css"
import { useState } from 'react';

const ChooseDate = () => {
    const {pageState,setPageState,appointments,chooseTime,setChooseTime,activeHaircuts}=useContext(HairCutsContext)
    const [buttonState,setButtonState]=useState("")
    //filter the optional days from the appointments array
    const days = [];
      for (const appointment of appointments) {
      if (!days.includes(appointment.day)) {
         days.push(appointment.day);
      }
      }
      
    function handleClick(appointment) {
      setChooseTime(appointment);
      setButtonState(appointment.id);
      console.log(chooseTime)
    }
    console.log(activeHaircuts)

   
    return (
      <div className="appointment-list">
      {days.map(day => (
         <div key={day} className="day">
            <h2>{day}</h2>
            {appointments
               .filter(appointment => appointment.day === day)
               .map(appointment => (
                  <button
                    disabled={buttonState === appointment.id }
                    onClick={() => handleClick(appointment)}
                    value={appointment}
                    key={appointment.time}
                    className={`appointment-btn ${buttonState === appointment.id ? 'clicked-button' : ''}`}
                  >
                     {appointment.time}
                     
                  </button>
               ))}
         </div>
      ))}
      <button disabled={chooseTime ? false : true} onClick={() => setPageState("chooseHairDresser")}>Next</button>
   </div>
    );
}

export default ChooseDate;
