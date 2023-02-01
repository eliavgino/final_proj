const mongoose = require("mongoose");

const BarberSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
  },
  photo: {
    type: Buffer,
    required: true,
  },
});

const Photo = new mongoose.model("Photo", BarberSchema);

module.exports = Photo;
