const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  getIncomeByProductMonthAndYear,
  getIncomeByMonthAndYear,
  addIncome
} = require("../controllers/incomes");

router.route("/").post(addIncome);
router.route("/getIncomeByMonthAndYear").post(getIncomeByMonthAndYear);
router.route("/getIncomeByProductMonthAndYear").post(getIncomeByProductMonthAndYear);

module.exports = router;
