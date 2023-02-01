const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  removeBarber,
  getBarberByID,
  addBarber,
  getAllBarbers,
  addCommentToBarber,
  getCommentByBarberId,
} = require("../controllers/barbers");

router.route("/").get(getAllBarbers).post(addBarber);
router.route("/deleteHairCut").post(removeBarber);
router.route("/barberprofile").post(getBarberByID);
router.route("/addCommentToBarber").post(addCommentToBarber);
router.route("/getCommentByBarberId").post(getCommentByBarberId);
module.exports = router;
