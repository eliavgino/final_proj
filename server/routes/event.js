const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { addEvent, getAllEvents } = require("../controllers/events");

router.route("/").get(getAllEvents).post(addEvent);

module.exports = router;
