const { validateExpenses, Expenses } = require("../models/Expense");

exports.getAllExpOrInc = async (req, res) => {
  try {
    const result = await Expenses.find().populate("product");
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

///get the resulte of total expenses per moth
exports.getAll = async (req, res) => {
  try {
    const expenses = await Expenses.aggregate([
      {
        $group: {
          _id: {
            month: "$date_month",
            year: "$date_year",
            productType: "$product.product_type",
          },
          totalPrice: { $sum: "$amountPrice" },
        },
      },
    ]);

    const results = expenses.map((expense) => {
      return {
        productType: expense._id.productType,
        totalPrice: expense.totalPrice,
        month: expense._id.month,
        year: expense._id.year,
      };
    });

    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.getAllbyProductType = async (req, res) => {
  try {
    const expenses = await Expenses.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product_data",
        },
      },
      {
        $unwind: "$product_data",
      },
      {
        $group: {
          _id: "$product_data.product_type",
          totalAmountPrice: { $sum: "$amountPrice" },
          months: { $addToSet: "$date_month" },
          years: { $addToSet: "$date_year" },
        },
      },
    ]);

    res.status(200).send(expenses);
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