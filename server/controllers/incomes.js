const {Income}=require('../models/Income');

////////get by month and year
exports.getIncomeByMonthAndYear= async (req, res) => {
  try {
    const body = req.body;
    const result = await Income.find({ month:body.month, year:body.year })
      .populate("productId")
    res.status(200).send(result);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

////////get by product month and year
exports.getIncomeByProductMonthAndYear= async (req, res) => {
  try {
    const body = req.body;
    const result = await Income.find({ productId: body._id, month:body.month, year:body.year })
      .populate("productId")
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

/////////add or modify Income
exports.addIncome = async (req, res) => {
  try {
    let body = req.body;

    let result=await Income.updateOne({ productId: body._id, month:body.month, year:body.year },{$inc:{number:1}},{upsert:true})
    res.status(201).send(result);

  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//delete HairCut by id
exports.removeHairCut = async (req, res) => {
  try {
    const id = req.body;
    const result = await HairCut.findByIdAndDelete(id);
    res.send("hair cut removed succesfuly");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
