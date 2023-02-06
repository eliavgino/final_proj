import React, { useState, useEffect,useRef } from "react";
import socketIoClient from "socket.io-client";
import "./chatbox.css";
import chatImage from './helpers/message.png';
import barberImg from "./helpers/barber.png"
import userImg from "./helpers/user.png"


const socket = socketIoClient("http://localhost:3030");

function ChatBox() {
  
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const autoScroll=useRef(null)

  const scrollToSection = (autoScroll) => {
  console.log("Test")
  const element = autoScroll.current;
  element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  console.log(element)
};
  
  
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setConversation((prevConversation) => [...prevConversation, { message: data.message, type: "response" }]);
      setTimeout(() => {
        scrollToSection(autoScroll);
      }, 10);
    });
    
    return () => {
      socket.off("receiveMessage");
    };
  }, [conversation]);

  const sendMessage = () => {
    
    if (!input) return;
    
    setConversation((prevConversation) => [...prevConversation, { message: input, type: "message" }]);
    socket.emit("sendMessage", { message: input });
    setInput("");
    
   
  };
  const handlSubmit = (autoScroll) => {
    
    sendMessage();
    setTimeout(() => {
      scrollToSection(autoScroll);
    }, 10);
  }

  
  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") handlSubmit(autoScroll);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          
        <div className="chat-header">Chat <img src={chatImage} className="chat-image" /></div>


          
          <div  className="chat-window">
            <ul >
            {conversation.map((item) => (
                  <li ref={autoScroll} className={item.type === "message" ? "selfMes" : "responseMes"}>
                    {item.type === "message" ? <img src={userImg} /> :null  }
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
            <button className="send-button" onClick={() => {handlSubmit(autoScroll)}}></button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default ChatBox;
