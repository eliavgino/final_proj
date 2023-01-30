const mongoose = require("mongoose");
const Joi = require("joi");
const { unique } = require("joi/lib/types/array");
const { ref, string, date, number } = require("joi");

const HairCutschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Baraber",
  },
  date: {
    type: Date,
    required: true,
  },
  hairCut: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const HairCut = new mongoose.model("HairCut", HairCutschema);
function validateHairCut(haircut) {
  const schema = {
    client_Name: Joi.string().required(),
    barber_name: Joi.string().required(),
    date: Joi.date().required(),
  };
  return Joi.validateHairCut(haircut, schema);
}

module.exports = validateHairCut;
module.exports = HairCut;
