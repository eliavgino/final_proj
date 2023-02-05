import React from 'react';
import {Context} from "../../context/scheduleContext"
import { useContext } from 'react';
import "./chooseDates.css"
import { useState } from 'react';

const ChooseDate = () => {
    const {pageState,setPageState,appointments,chooseTime,setChooseTime}=useContext(Context)
    const days = ["Monday", "Tuesday", "Wednesday"];
    const [buttonState,setButtonState]=useState("")
   

    function handleClick(appointment) {
      setChooseTime(appointment);
      setButtonState(appointment.id);
      
    }


    return (
      <div className="appointment-list">
      {days.map(day => (
         <div key={day} className="day">
            <h2>{day}</h2>
            {appointments
               .filter(appointment => appointment.day === day)
               .map(appointment => (
                  <button
                    disabled={buttonState === appointment.time}
                    onClick={() => handleClick(appointment)}
                    value={appointment}
                    key={appointment.time}
                    className={`appointment-btn ${buttonState === appointment.id ? 'clicked-button' : ''}`}
                  >
                     {appointment.time}
                     {console.log(chooseTime)}
                  </button>
               ))}
         </div>
      ))}
      <button disabled={chooseTime ? false : true} onClick={() => setPageState("confirm")}>Next</button>
   </div>
    );
}

export default ChooseDate;
