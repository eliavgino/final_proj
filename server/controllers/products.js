const { Product, validateProduct } = require("../models/Product");
const bcrypt = require("bcrypt");

//get all products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
//get all barbers products type salray
exports.getAllProductsofsalary = async (req, res) => {
  try {
    const result = await Product.find({ product_type: "salary" });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//add new product
exports.addProduct = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { error } = validateProduct(body);
    if (error) return res.status(400).send(error.details[0].message);

    //create the product
    let product = new Product(body);

    //save the product and send
    product = await product.save();
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//edit product
exports.editProduct = async (req, res) => {
  try {
    const body = req.body;

    if (body.description.length < 2)
      return res
        .status(400)
        .send("description need to be longer then 1 letters ");

    const result = await Product.findOneAndUpdate(
      { _id: body.id },
      {
        $set: {
          product_description: body.description,
          product_cost: body.cost,
        },
      },
      { new: true }
    );

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

//delete product by id
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const result = await Product.findByIdAndDelete(id);
    res.send("done");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};