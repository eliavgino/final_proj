const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { getUsersData, addUser, removeUser } = require("../controllers/users");

router.route("/").get(getUsersData).post(addUser);
router.route("/deleteAccount").post(removeUser);
module.exports = router;
