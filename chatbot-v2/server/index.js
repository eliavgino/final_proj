const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
let scheduleFollowUp = 0;
let priceFollowUp = false;
let selectedHaircut = null;
let selectedTime = null;
let matchingday = null;
let selectedday = null;
let haircuts;
let barbers;
let schedules;

///AXIOS FUNCTIONS
///GET ALL HAIRCUTS PRICES: Will be used with useEffect when page is loaded
async function getAllHaircutsPrice() {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/product");
    haircuts = response.data.filter(
      (product) => product.product_type === "haircuts"
    );
  } catch (error) {
    console.error(error);
  }
}

async function getAllBarbers() {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/barber");
    barbers = response.data;
  } catch (err) {
    console.error(err);
  }
}

/////////////////////////////////get number of the day
function matchDay(dayName) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = days.indexOf(dayName);
  if (dayIndex === -1) {
    return false;
  }
  return dayIndex;
}

async function getAllhaircutsScedual() {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/haircut/getHairCutsDate"
    );
    schedules = response.data;
  } catch (err) {
    console.error(err);
  }
}
io.on("connection", (socket) => {
  getAllHaircutsPrice();
  getAllBarbers();
  getAllhaircutsScedual();
  console.log("client connected on " + socket.id);

  socket.on("sendMessage", (data) => {
    console.log(data.message);
    let haircutsCode = haircuts.map((haircut) => {
      if (
        data.message
          .toLowerCase()
          .includes(haircut.product_name.toLowerCase()) &&
        !priceFollowUp
      ) {
        setTimeout(() => {
          socket.emit("receiveMessage", {
            message: `The ${haircut.product_name} price is ${haircut.product_price}`,
          });
        }, 1000);
      }
    });

    if (
      data.message.toLowerCase().includes("hello") ||
      data.message.toLowerCase().includes("hi")
    ) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message: "Hey there! How can I help you today?",
        });
      }, 1000);
    }
    //schedule appointment question
    else if (data.message.toLowerCase().includes("schedule")) {
      scheduleFollowUp = 1;
      selectedHaircut = null;
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message: "Sure! What type of haircut would you like to schedule?",
        });
      }, 1000);
    } else if (selectedHaircut === null && scheduleFollowUp == 1) {
      let matchingHaircut = haircuts.find((haircut) =>
        data.message.toLowerCase().includes(haircut.product_name.toLowerCase())
      );
      if (matchingHaircut) {
        selectedHaircut = matchingHaircut;
        setTimeout(() => {
          socket.emit("receiveMessage", {
            message: `Great! You selected the ${selectedHaircut.product_name}. What day would you like to schedule it for?`,
          });
        }, 1000);
        scheduleFollowUp++;
        selectedTime = null;
      } else {
        setTimeout(() => {
          socket.emit("receiveMessage", {
            message:
              "Sorry, I didn't understand. Could you please select a haircut from the following list: " +
              haircuts.map((haircut) => haircut.product_name).join(", "),
          });
        }, 1000);
      }
      ///////////////////////////////////select date
    }
    if (selectedTime === null && scheduleFollowUp == 2) {
      let matchingday = schedules.find((schedule) =>
        data.message.toLowerCase().includes(schedule.date.toLowerCase())
      );
      if (matchingday) {
        selectedday = matchingday;
        setTimeout(() => {
          socket.emit("receiveMessage", {
            message: `Great! You selected the ${selectedHaircut.product_name}. What time would you like to schedule it for?`,
          });
        }, 1000);
        scheduleFollowUp++;
        selectedTime = null;
      } else {
        setTimeout(() => {
          socket.emit("receiveMessage", {
            message:
              "Sorry, I didn't understand. Could you please select a haircut from the following list: " +
              haircuts.map((haircut) => haircut.product_name).join(", "),
          });
        }, 1000);
      }
      //  if (selectedTime === null && scheduleFollowUp == 3) {
      //   let matchinghour = schedules.find((schedule) =>
      //     data.message.toLowerCase().includes(schedule.date)
      //   );
      //   if (matchinghour) {
      //     selectedhour= matchinghour;
      //     setTimeout(() => {
      //       socket.emit("receiveMessage", {
      //         message: `Great! You selected the ${selectedhour}. at ${selectedday}?`,
      //       });
      //     }, 1000);
      //     scheduleFollowUp++;
      //     selectedTime = null;
      //   } else {
      //     setTimeout(() => {
      //       socket.emit("receiveMessage", {
      //         message:
      //           "Sorry, I didn't understand. Could you please select a haircut from the following list: " +
      //           haircuts.map((haircut) => haircut.product_name).join(", "),
      //       });
      //     }, 1000);
      //   }
      /////////////////////////////////////////////////////////////////////////////////////////////
    } else if (
      (data.message.toLowerCase() === "confirm" && scheduleFollowUp) ||
      (data.message.toLowerCase() === "yes" && scheduleFollowUp)
    ) {
      console.log({
        selectedHaircut: selectedHaircut.product_name,
        selectedTime: selectedTime,
      });
      setTimeout(() => {
        scheduleFollowUp = 0;
        socket.emit("receiveMessage", {
          message:
            "Your booking has been confirmed! We look forward to seeing you soon.",
        });
      }, 1000);
    }
    //end of schedule questions

    //price questions!
    else if (data.message.toLowerCase().includes("price")) {
      priceFollowUp = false;
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message: `Our prices depend on the type of service you're looking for. Can you be more specific?'`,
        });
      }, 1000);
      {
        haircutsCode;
      }
    } else if (data.message.toLowerCase().includes("no") && !priceFollowUp) {
      priceFollowUp = true;
      setTimeout(() => {
        priceFollowUp = true;
        socket.emit("receiveMessage", {
          message: "Okay, no problem. Let us know if you need anything else.",
        });
      }, 1000);
    }
    //end of price questions
    else if (data.message.toLowerCase().includes("location")) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message: "We're located on 123 Main St. Stop by and see us anytime!",
        });
      }, 1000);
    } else if (
      data.message.toLowerCase().includes("hours") ||
      data.message.toLowerCase().includes("business hours") ||
      data.message.toLowerCase().includes("open")
    ) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message: "We're open every day from 9 AM to 9 PM.",
        });
      }, 1000);
    } else if (
      data.message.toLowerCase().includes("walk-ins") ||
      data.message.toLowerCase().includes("walk ins")
    ) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message:
            "Yes, we accept walk-ins. However, we recommend booking an appointment in advance to ensure availability.",
        });
      }, 1000);
    } else if (
      data.message.toLowerCase().includes("how are you") ||
      data.message.toLowerCase().includes("how's it going") ||
      data.message.toLowerCase().includes("whats up")
    ) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message:
            "I'm just a bot, but thank you for asking! How can I assist you today?",
        });
      }, 1000);
    } else if (data.message.toLowerCase().includes("weather")) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message:
            "It's always sunny and warm in here! Come in and enjoy a fresh cut or shave.",
        });
      }, 1000);
    } else if (data.message.toLowerCase().includes("joke")) {
      setTimeout(() => {
        socket.emit("receiveMessage", {
          message:
            "Why did the barber close his shop? Because he wanted to get a hair cut!",
        });
      }, 1000);
    }
  });
});

server.listen(3030, () => console.log("server RUNS"));
