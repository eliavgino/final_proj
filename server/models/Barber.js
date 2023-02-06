const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
  profilePhoto: {
    type: String,
  },
  comments: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: String,
      },
    ],
  },
});

BarberSchema.methods.generatebarberJWT = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, name: this.barber_Name },
    process.env.USER_TOKEN
  );
  return token;
};
const Barber = new mongoose.model("Barber", BarberSchema);
function validateBarber(barber) {
  const schema = {
    barber_Name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(4).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(13).max(13).required(),
    profilePhoto: Joi.string(),
  };
  return Joi.validate(barber, schema);
}
function validateComment(comment) {
  const schema = {
    id: Joi.required(),
    user_id: Joi.required(),
    body: Joi.string().min(1).required(),
  };
  return Joi.validate(comment, schema);
}

module.exports = { validateBarber, Barber, validateComment };
