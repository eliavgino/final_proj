const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
  user_Name: {
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
    default: "client",
  },
});

UserSchema.methods.generateUserJWT = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, name: this.user_Name },
    process.env.USER_TOKEN
  );
  return token;
};
const User = new mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = {
    user_Name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(4).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(13).max(13).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
