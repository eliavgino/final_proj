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
  getHairCutsDate,
  getHairCutsDistintsByMonthAndYearAndBarber,
  getHairCutsDistints,
  getHairCutsDistintsAndAmouthSum,
} = require("../controllers/hairCuts");

router.route("/").get(getHairCuts).post(addHairCuts);
router.route("/getHairCutsDate").get(getHairCutsDate);
router.route("/getHairCutsDistints").get(getHairCutsDistints);
router
  .route("/getHairCutsDistintsByMonthAndYearAndBarber")
  .get(getHairCutsDistintsByMonthAndYearAndBarber);
router
  .route("/getHairCutsDistintsAndAmouthSum")
  .get(getHairCutsDistintsAndAmouthSum);
router.route("/deleteHairCut").post(removeHairCut);
router.route("/getHairCutByUser").post(getHairCutByUser);
router.route("/getHairCutByBarber").post(getHairCutByBarber);
router.route("/getHairCutByBarberId").post(getHairCutByBarberId);
module.exports = router;