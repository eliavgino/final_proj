const mongoose = require("mongoose");
const Joi = require("joi");



const HairCutschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
  },
  date: {
    type: Date,
    default: Date(Date.now()),
  },
  hairCut: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const HairCut = new mongoose.model("HairCut", HairCutschema);
function validateHairCut(haircut) {
  const schema = {
    user: Joi.required(),
    barber: Joi.required(),
    hairCut: Joi.required(),
  };
  return Joi.validate(haircut, schema);
}

module.exports = { HairCut, validateHairCut };
