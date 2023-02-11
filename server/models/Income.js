const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
 productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  year: {
    type:String,
    default: new Date(Date.now()).getFullYear()
  },
  month:{
    type: String,
    default: new Date(Date.now()).getMonth()+1,
  },
  number:{
    type:Number,
    default:0
  }
});

const Income = new mongoose.model("Income", IncomeSchema);

module.exports = { Income };
