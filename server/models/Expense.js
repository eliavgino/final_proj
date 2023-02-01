const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  date_month: {
    // Date(Date.now()).getmonth() in the sending from the front
    type: Number,
    required: true,
  },
  date_year: {
    // Date(Date.now()).getfullyear() in the sending from the front
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Expenses = new mongoose.model("Expenses", schema);

function validateExpenses(expenses) {
  const schema = {
    product: Joi.string(),
    date_month: Joi.number(),
    date_year: Joi.number(),
    amount: Joi.number().required(),
  };
  return Joi.validate(expenses, schema);
}

module.exports = { Expenses, validateExpenses };
