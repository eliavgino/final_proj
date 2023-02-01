const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  removePhoto,
  addPhoto,
  getPhotoById,
  getPhoto,
} = require("../controllers/photos");

router.route("/").get(getPhoto).post(addPhoto);
router.route("/deletephoto").post(removePhoto);
router.route("/getphotobyid").post(getPhotoById);
module.exports = router;
