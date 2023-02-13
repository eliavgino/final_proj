const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  date_month: {
    type: String,
    required: true,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  date_year: {
    // Date(Date.now()).getfullyear() in the sending from the front
    type: Number,
    required: true,
    // default: Date(Date.now()).getfullyear(),
  },
  amount: {
    type: Number,
    required: true,
  },
  amountPrice: {
    type: Number,
    required: true,
  },
});

const Expenses = new mongoose.model("Expenses", schema);

function validateExpenses(expenses) {
  const schema = {
    product: Joi.string(),
    date_month: Joi.string(),
    date_year: Joi.number(),
    amount: Joi.number().required(),
    amountPrice: Joi.number().required(),
  };
  return Joi.validate(expenses, schema);
}

module.exports = { Expenses, validateExpenses };