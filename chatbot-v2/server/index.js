const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const axios =require ('axios')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3001',
        methods:["GET",'POST']
    }
})
let scheduleFollowUp=0
let priceFollowUp=false
let selectedHaircut = null;
let selectedTime = null;
let haircuts
let schedules
const appointments = [];
const currentDate = new Date();
let activeHaircuts=[]
let barbers=[]
   


///AXIOS FUNCTIONS
///GET ALL HAIRCUTS PRICES: Will be used with useEffect when page is loaded
async function getAllHaircutsPrice() {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/product");
        haircuts = response.data.filter(product => product.product_type === "haircuts");
      
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllBarbers() {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/barber");
      barbers=(response.data);
      console.log(barbers)
    } catch (error) {
      console.error(error);
      return error;
    }
  };
async function getUpcomingHairCuts (){
    try {
      const response = await axios.get("http://localhost:4000/api/v1/haircut");
      activeHaircuts=(response.data.filter(hairCut => hairCut.active === true));
      
    } catch (error) {
      console.error(error);
    }
  };
  //function that filter all the haircuts from the next 30 days
let id=0
  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        
        const endHour = (minute + 30 >= 60) ? (hour + 1)  : hour;
        const endMinute = (minute + 30) % 60;
         
        let obj={
          day: date.getDate(),
          date:`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T21:00:00.000Z`,
          time: `${hour}:${minute.toString().padStart(2, "0")}-${endHour}:${endMinute.toString().padStart(2, "0")}`,
          id:id++}
          
        if(!(activeHaircuts.some(item => (item.date)=== obj.date && item.hour === obj.time))){
          
          appointments.push(obj)
          
         }}
    }
  }
  
 
io.on('connection',(socket)=>{
  getAllHaircutsPrice();
  getAllBarbers()
  getUpcomingHairCuts ()
    console.log('client connected on '+ socket.id)

    socket.on('sendMessage',(data)=>{
        console.log(data.message)
        let haircutsCode=haircuts.map(haircut => {
            if (data.message.toLowerCase().includes(haircut.product_name.toLowerCase()) && !priceFollowUp) {
                setTimeout(() => {
                  socket.emit('receiveMessage', { message: `The ${haircut.product_name} price is ${haircut.product_price}` });
                }, 1000);
              }
          });
           

        if (data.message.toLowerCase().includes("hello") || data.message.toLowerCase().includes("hi")) {
            setTimeout(() => {
                socket.emit('receiveMessage', { message: "Hey there! How can I help you today?" })
            }, 1000);
        }
        //schedule appointment question
        else if (data.message.toLowerCase().includes("schedule")) {
            scheduleFollowUp = 1;
            selectedHaircut=null
            setTimeout(() => {
              socket.emit("receiveMessage", { message: "Sure! What type of haircut would you like to schedule?" });
            }, 1000);
          } else if (selectedHaircut === null && scheduleFollowUp==1) {
            
            let matchingHaircut = haircuts.find(haircut =>
              data.message.toLowerCase().includes(haircut.product_name.toLowerCase())
            );
            if (matchingHaircut) {
              
              selectedHaircut = matchingHaircut;
              setTimeout(() => {
                socket.emit(
                  "receiveMessage",
                  {
                    message: `Great! You selected the ${selectedHaircut.product_name}. What time would you like to schedule it for?`
                  }
                );
              }, 1000);
              scheduleFollowUp++
              selectedTime=null
            } else {
              setTimeout(() => {
                socket.emit(
                  "receiveMessage",
                  {
                    message:
                      "Sorry, I didn't understand. Could you please select a haircut from the following list: " +
                      haircuts
                        .map(haircut => haircut.product_name)
                        .join(", ")
                  }
                );
              }, 1000);
            }
          } else if (selectedTime === null && scheduleFollowUp==2) {
            selectedTime = data.message;
            setTimeout(() => {
              socket.emit(
                "receiveMessage",
                {
                  message: `Okay, you selected ${selectedTime} for your ${selectedHaircut.product_name} appointment. Would you like to confirm your booking?`
                }
              );
            }, 1000);
          } else if (
            (data.message.toLowerCase() === "confirm" && scheduleFollowUp) ||
            (data.message.toLowerCase() === "yes" && scheduleFollowUp)
          ) {
            console.log({
              selectedHaircut: selectedHaircut.product_name,
              selectedTime: selectedTime
            });
            setTimeout(() => {
                scheduleFollowUp = 0;
              socket.emit("receiveMessage", { message: "Your booking has been confirmed! We look forward to seeing you soon." });
            }, 1000);
          }
        //end of schedule questions

        //price questions!
        else if (data.message.toLowerCase().includes("price")) {
            priceFollowUp=false
            setTimeout(() => {
                socket.emit('receiveMessage', { message: `Our prices depend on the type of service you're looking for. Can you be more specific?'` });
            }, 1000);
            {haircutsCode}
        } else if (data.message.toLowerCase().includes("no")&&!priceFollowUp) {
            priceFollowUp=true
            setTimeout(() => {
                priceFollowUp=true
                socket.emit('receiveMessage', { message: "Okay, no problem. Let us know if you need anything else." });
            }, 1000);
        }
        //end of price questions

        else if (data.message.toLowerCase().includes("location")) {
            setTimeout(() => {
                socket.emit('receiveMessage', { message: "We're located on 123 Main St. Stop by and see us anytime!" })
            }, 1000);
        }
        else if (data.message.toLowerCase().includes("hours") || data.message.toLowerCase().includes("business hours")|| data.message.toLowerCase().includes("open")) {
          setTimeout(() => {
            socket.emit('receiveMessage', { message: "We're open every day from 9 AM to 9 PM." })
          }, 1000);
        } else if (data.message.toLowerCase().includes("walk-ins")|| data.message.toLowerCase().includes("walk ins")) {
          setTimeout(() => {
            socket.emit('receiveMessage', { message: "Yes, we accept walk-ins. However, we recommend booking an appointment in advance to ensure availability." })
          }, 1000);
        } else if (data.message.toLowerCase().includes("how are you") || data.message.toLowerCase().includes("how's it going")|| data.message.toLowerCase().includes("whats up")) {
          setTimeout(() => {
            socket.emit('receiveMessage', { message: "I'm just a bot, but thank you for asking! How can I assist you today?" })
          }, 1000);
        } else if (data.message.toLowerCase().includes("weather")) {
          setTimeout(() => {
            socket.emit('receiveMessage', { message: "It's always sunny and warm in here! Come in and enjoy a fresh cut or shave." })
          }, 1000);
        } else if (data.message.toLowerCase().includes("joke")) {
          setTimeout(() => {
            socket.emit('receiveMessage', { message: "Why did the barber close his shop? Because he wanted to get a hair cut!" })
          }, 1000);
        }
       
        });
    
    

})


server.listen(3030,()=>console.log('server RUNS'))
