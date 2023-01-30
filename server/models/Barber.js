const mongoose = require("mongoose");
const Joi = require("joi");
const { unique } = require("joi/lib/types/array");
const jwt = require("jsonwebtoken");
const { ref, string, date, number, array } = require("joi");
const { Numbers } = require("@mui/icons-material");

const BarberSchema = new mongoose.Schema({
  barber_Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    match: /^\+972/,
    minlength: 13,
    maxlength: 13,
    required: true,
  },
  role: {
    type: String,
    default: "barber",
  },
  comments: {
    type: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: String,
      },
    ],
  },
  photos: {
    type: [{ photo: { type: Buffer }, id: { type: Number, unique: true } }],
  },
});

BarberSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    "whats app im doing jenerat now for the sign up"
  );
  return token;
};
const Barber = new mongoose.model("Barber", BarberSchema);
function validateClient(barber) {
  const schema = {
    barber_Name: Joi.string().min(2).max(50).required(),
    email: Joi.email().min(4).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(13).max(13).required(),
  };
  return Joi.validate(barber, schema);
}

module.exports = validateClient;
module.exports = Barber;
