const mongoose = require("mongoose");
const Joi = require("joi");
const { unique } = require("joi/lib/types/array");
const { ref, string, date, number } = require("joi");

const ExpensesSchema = new mongoose.Schema({
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

const Expenses = new mongoose.model("Expenses", ExpensesSchema);
function validateExpenses(expenses) {
  const schema = {
    amount: Joi.number().required(),
  };
  return Joi.validateExpenses(expenses, schema);
}

module.exports = validateExpenses;
module.exports = Expenses;
