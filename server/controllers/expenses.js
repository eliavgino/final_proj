const { validateExpenses, Expenses } = require("../models/Expense");

exports.getAllExpOrInc = async (req, res) => {
  try {
    const result = await Expenses.find().populate("product");
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getExpOrIncByProduct = async (req, res) => {
  try {
    const product = req.body.product_name;
    const result = await Expenses.find({ product_name: product }).populate(
      "product"
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addExpOrInc = async (req, res) => {
  const exp = req.body;
  const { error } = validateExpenses(exp);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const expenses = new Expenses(exp);
  try {
    await expenses.save();
    res.send(expenses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeExpOrInc = async (req, res) => {
  const id = req.body.id;

  try {
    const result = await Expenses.findByIdAndDelete(id);
    if (!result) return res.status(404).send("Expense not found");
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
