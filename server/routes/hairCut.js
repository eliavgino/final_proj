const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  addHairCuts,
  removeHairCut,
  getHairCuts,
  getHairCutByBarber,
  getHairCutByUser,
  getHairCutByBarberId,
} = require("../controllers/hairCuts");

router.route("/").get(getHairCuts).post(addHairCuts);
router.route("/deleteHairCut").post(removeHairCut);
router.route("/getHairCutByUser").post(getHairCutByUser);
router.route("/getHairCutByBarber").post(getHairCutByBarber);
router.route("/getHairCutByBarberId").post(getHairCutByBarberId);
module.exports = router;
