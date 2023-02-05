const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
  },
  photo: {
    type: String,
    required: true,
  },
});

const Photo = new mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
