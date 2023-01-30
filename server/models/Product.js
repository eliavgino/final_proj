const mongoose = require("mongoose");
const Joi = require("joi");
const { ref, string, date, number } = require("joi");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  product_price: {
    type: Number,
    required: true,
    min: 0,
  },
  product_cost: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  product_description: {
    type: String,
    minlength: 2,
    maxlength: 1024,
  },
  product_type: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    enum: ["haircuts", "cosmetics", "logistics", "other"],
  },
});

const Product = new mongoose.model("Product", ProductSchema);
function validateProduct(product) {
  const schema = {
    product_name: Joi.string().min(2).max(50).required(),
    product_cost: Joi.number().min(0).required(),
    product_price: Joi.number().min(0).required(),
    product_description: Joi.string().min(2).max(1024),
    product_type: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

module.exports = validateProduct;
module.exports = Product;
