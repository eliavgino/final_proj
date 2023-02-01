const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  addExpOrInc,
  removeExpOrInc,
  getAllExpOrInc,
  getExpOrIncByProduct,
} = require("../controllers/expenses");

router.route("/").get(getAllExpOrInc).post(addExpOrInc);
router.route("/getByProduct").post(getExpOrIncByProduct);
router.route("/delete").delete(removeExpOrInc);

module.exports = router;
