const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { getAllProducts, addProduct, removeProduct, editProduct } = require("../controllers/products");

router.route("/").get(getAllProducts).post(addProduct).put(editProduct);
router.route("/deleteProduct").post(removeProduct);
module.exports = router;