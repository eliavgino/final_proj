const mongoose = require("mongoose");
const Joi = require("joi");

const EventSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date(Date.now()),
  },
  hours:{
    type:String,
    require:true
  },
  reason:{
    type:String,
    require:true
  }
});

const Event = new mongoose.model("Event", EventSchema);
function validateEvent(event) {
  const schema = {
    date: Joi.required(),
    hours: Joi.required(),
    reason: Joi.string().min(2).required()
  };
  return Joi.validate( event, schema);
}

module.exports = { Event, validateEvent };
