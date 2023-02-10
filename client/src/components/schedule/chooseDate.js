
import "./chooseDates.css"
import { useContext } from 'react';
import { HairCutsContext } from '../../context/hairCuts';
import React, { useEffect,useState } from "react";


function CalendarCard() {
  useEffect(() => {
    startTime();
  }, []);
  const [dateData, setDateData] = useState();
  const [buttonState, setButtonState] = useState("")

  const flip = () => {
    cardElement.current.classList.toggle("flipped");
  };
  const {
    pageState,
    setPageState,
    appointments,
    chooseTime,
    setChooseTime,
    setChooseBarber
  } = useContext(HairCutsContext)
  const startTime = () => {
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = new Date();
    let d = today.getDate();
    let wd = weekday[today.getDay()];
    let mt = month[today.getMonth()];
    let y = today.getFullYear();

    document.getElementById("date").innerHTML = d;
    document.getElementById("day").innerHTML = wd;
    document.getElementById("month").innerHTML = `${mt}/${y}`;

    setTimeout(startTime, 500);
  };

  

  const cardElement = React.createRef();

  const handleClick = (e) => {
    const currentDate = new Date();
    let today= currentDate.getDate()
    let day= e.target.textContent
    console.log(day)
    if(day<today)
        setDateData( undefined );
        
    else
    setDateData( e.target.textContent );
    
  };
  
  function handleClickA(appointment) {
    setChooseTime(appointment);
    setButtonState(appointment.id);
    console.log(chooseTime)
  }

function handleBack(){
  setPageState("chooseHairDresser")
  setChooseBarber({_id:"a"})
}

  return (
    <div onLoad={startTime}>
      <div className="dateContainer">
        <div className="datecard" ref={cardElement} onClick={flip}>
          <div className="datefront">
            <div className="datecontentfront">
              <div className="datemonth">
                <table>
                  <tr className="orangeTr">
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                    <th>S</th>
                  </tr>
                  <tr className="whiteTr">
                    <th></th>
                    <th onClick={handleClick}>1</th>
                    <th onClick={handleClick}>2</th>
                    <th onClick={handleClick}>3</th>
                    <th onClick={handleClick}>4</th>
                    <th onClick={handleClick}>5</th>
                    <th onClick={handleClick}>6</th>
                  </tr>
                  <tr className="whiteTr">
                    <th onClick={handleClick}>7</th>
                    <th onClick={handleClick}>8</th>
                    <th onClick={handleClick}>9</th>
                    <th onClick={handleClick}>10</th>
                    <th onClick={handleClick}>11</th>
                    <th onClick={handleClick}>12</th>
                    <th onClick={handleClick}>13</th>
                  </tr>
                  <tr className="whiteTr">
                    <th onClick={handleClick}>14</th>
                    <th onClick={handleClick}>15</th>
                    <th onClick={handleClick}>16</th>
                    <th onClick={handleClick}>17</th>
                    <th onClick={handleClick}>18</th>
                    <th onClick={handleClick}>19</th>
                    <th onClick={handleClick}>20</th>
                  </tr>
              <tr class="whiteTr">
                <th onClick={handleClick}>21</th>
                <th onClick={handleClick}>22</th>
                <th onClick={handleClick}>23</th>
                <th onClick={handleClick}>24</th>
                <th onClick={handleClick}>25</th>
                <th onClick={handleClick}>26</th>
                <th onClick={handleClick}>27</th>
              </tr>
              <tr class="whiteTr">
                <th onClick={handleClick}>28</th>
                <th onClick={handleClick}>29</th>
                <th onClick={handleClick}>30</th>
                <th onClick={handleClick}>31</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </table>
          </div>
          <div class="date">
            <div class="datecont">
              <div id="date"></div>
              <div id="day"></div>
              <div id="month"></div>
              <h2 id="selected" hidden={chooseTime?false:true}>Date Selected</h2>
              <div style={{marginTop:"10%",marginRight:"10%"}} >
              <button  className="navigateBtns" onClick={() => handleBack()} >Back</button>
              <button  className="navigateBtns" onClick={() => setPageState("confirm")}  hidden={chooseTime?false:true}>Next</button>
              
              <i class="fa fa-pencil edit" aria-hidden="true"></i>
            </div></div>
          </div>
        </div>
      </div>
      <div class="back">
        <div class="contentback">
          <div class="backcontainer">
           { console.log(appointments[0].day)}
          {appointments
            .filter(appointment => appointment.day == dateData)
            .map(appointment => (
              <button
                disabled={buttonState === appointment.id}
                onClick={() => handleClickA(appointment)}
                value={appointment}
                key={appointment.time}
                className={`appointment-btn ${buttonState === appointment.id ? 'clicked-button' : ''}`}
              >
                {appointment.time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        
    );
}

export default CalendarCard;
