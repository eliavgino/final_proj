const mongoose = require("mongoose");

function connectDb() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log("couldnt connect to the database", err.message);
  }
}
module.exports = connectDb;
