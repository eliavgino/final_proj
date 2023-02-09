import React, { useState, useEffect, useRef, useContext } from "react";
import socketIoClient from "socket.io-client";
import "./chatbox.css";
import { HairCutsContext } from "../../context/hairCuts";
import chatImage from "./helpers/message.png";
import barberImg from "./helpers/barber.png";
import userImg from "./helpers/user.png";
import minimize from "./helpers/minimize-icon.png";
import chatIcom from "./helpers/chatIcom.png"



let socket = socketIoClient("http://");

function ChatBox() {
  const [dateData, setDateData] = useState(10);
  const [input, setInput] = useState("");
  const[boxVisable,setBoxVisable]=useState("none")
  const[iconVisable,setIconVisable]=useState("")
  const [conversation, setConversation] = useState([]);
  const autoScroll = useRef(null);
  const { decoded, token, appointments, activeHaircuts } =
    useContext(HairCutsContext);
  let chosenBarber;

  //part of the scroll function
  const scrollToSection = (autoScroll) => {
    const element = autoScroll.current;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  function handleDivVisability(){
    if (boxVisable=="none"){
      setBoxVisable("block")
      setIconVisable("none")
      setConversation([])
      connectSocket()
    }

    else{
      setBoxVisable("none")
      setIconVisable("block")
      
    }
    
  }
  //date format change function
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.toLocaleString("default", { weekday: "long" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const dayOfMonth = date.toLocaleString("default", { day: "2-digit" });
    const year = date.toLocaleString("default", { year: "numeric" });

    return `${dayOfMonth}/${month}/${year} ${day}`;
  }
  function connectSocket(){
    socket = socketIoClient("http://localhost:3030")
      //sending the decoded variable to the socket server
    socket.emit("sendMessage", { message: { decoded: decoded } });
    socket.on("receiveMessage", (data) => {
      setConversation((prevConversation) => [
        ...prevConversation,
        { message: data.message, type: "response" },
      ]);
      setTimeout(() => {
        scrollToSection(autoScroll);
      }, 10);

      //choosing date
      if (data.message.includes(". now you need to choose the Date:")) {
        setTimeout(() => {
          const uniqueDates = new Set();
          appointments
            .filter((appointment) => appointment.date)
            .forEach((appointment) => uniqueDates.add(appointment.date));
          setConversation((prevConversation) => [
            ...prevConversation,
            {
              message: [...uniqueDates].map((date) => (
                <button onClick={() => chooseHourClick(formatDate(date))}>
                  {formatDate(date)}
                </button>
              )),
              type: "response",
            },
          ]);
          setTimeout(() => {
            scrollToSection(autoScroll);
          }, 10);
        }, 1000);
      }

      if (data.message.includes(". Now choose the hour:")) {
        chosenBarber = data.barber;
        //changing the message date format to make it fit
        let dateStartIndex = data.message.indexOf(":") + 2;
        let dateEndIndex = data.message.indexOf(".");
        let a = data.message.slice(dateStartIndex, dateEndIndex);
        // filtering all the barber appointments for the chosen date.
        let filteredHaircuts = activeHaircuts.filter(
          (hairCut) => hairCut.barber._id === chosenBarber._id
        );
        filteredHaircuts = filteredHaircuts.filter((hairCut) => {
          const hairCutDate = new Date(hairCut.date);
          let dateArray = a.split("/");
          let day = dateArray[0];
          let month = dateArray[1];
          let year = dateArray[2];
          let aDate = `${month}/${day}/${year}`;
          aDate = new Date(aDate);

          return (
            hairCutDate.toLocaleDateString() === aDate.toLocaleDateString()
          );
        });

        setConversation((prevConversation) => [
          ...prevConversation,
          {
            message: appointments
              .filter((appointment) => appointment.day == dateData)
              .filter((appointment) =>
                filteredHaircuts.every((cut) => cut.hour !== appointment.time)
              )
              .map((appointment) => (
                <button
                  onClick={() => {
                    chooseHourClick(appointment.time);
                  }}
                >
                  {appointment.time}
                </button>
              )),
            type: "response",
          },
        ]);
        setTimeout(() => {
          scrollToSection(autoScroll);
        }, 10);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  };

  const sendMessage = () => {
    if (!input) return;
    setConversation((prevConversation) => [
      ...prevConversation,
      { message: input, type: "message" },
    ]);
    socket.emit("sendMessage", { message: input });
    setInput("");
  };
  function chooseHourClick(time) {
    setInput(time);
    sendMessage();
  }

  const handlSubmit = (autoScroll) => {
    sendMessage();
    setTimeout(() => {
      scrollToSection(autoScroll);
    }, 10);
  };

  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") handlSubmit(autoScroll);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div  style={{
  display: boxVisable,
  opacity: boxVisable === "block" ? 1 : 0,
  transition: 'opacity 1500ms ease-in-out'}}
  
 className="card">
          <div className="chat-header">
           <div> Chat <img src={chatImage} className="chat-image" /></div>
           <div id="minimizebtn"><img style ={{height:"25px",width:"25px"}}src={minimize} onClick={()=>{handleDivVisability()}} /></div>
          </div>

          <div className="chat-window">
            <ul>
              {conversation.map((item) => (
                <li
                  ref={autoScroll}
                  className={
                    item.type === "message" ? "selfMes" : "responseMes"
                  }
                >
                  {item.type === "message" ? <img src={userImg} /> : null}
                  {item.message}
                  {item.type === "response" ? <img src={barberImg} /> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-input">
            <input
              onChange={(ev) => setInput(ev.target.value)}
              type="text"
              name="text"
              className="input"
              placeholder="Type here..."
              value={input}
              onKeyPress={handleKeyPress}
            />
            <button
              className="buttonChat"
              onClick={() => {
                handlSubmit(autoScroll);
              }}
            ></button>
          </div>
        </div>
        <div onClick={()=>{handleDivVisability()}} id="chatbtn" style={{display: iconVisable, position: "fixed", bottom: "3rem", right: "3rem" ,zIndex:9999}}><img stlye={{height:"30px",width:"30px"}}src={chatIcom} /></div>
      </header>
      
    </div>
  );
}

export default ChatBox;
