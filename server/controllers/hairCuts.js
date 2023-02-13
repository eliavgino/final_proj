const { HairCut, validateHairCut } = require("../models/HairCut");

//get all users
exports.getHairCuts = async (req, res) => {
  try {
    const result = await HairCut.find()
      .populate("hairCut")
      .populate("user")
      .populate("barber");
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
//get all haircuts by month year and barber name
exports.getHairCutsDistintsByMonthAndYearAndBarber = async (req, res) => {
  try {
    const haircuts = await HairCut.aggregate([
      {
        $lookup: {
          from: "barbers",
          localField: "barber",
          foreignField: "_id",
          as: "barber",
        },
      },
      {
        $unwind: "$barber",
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            barberName: "$barber.barber_Name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).send(haircuts);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};

//get haircut by month and how match are in this moth
exports.getHairCutsDistints = async (req, res) => {
  try {
    const haircuts = await HairCut.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.status(200).send(haircuts);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
//get haircut by month and amouthsum
exports.getHairCutsDistintsAndAmouthSum = async (req, res) => {
  try {
    const hairCuts = await HairCut.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "hairCut",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$product.product_price" },
        },
      },
    ]);

    res.status(200).send(hairCuts);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
//get all hair cuts date
/////////////////////////////////////////////////////////////////////////////////////
exports.getHairCutsDate = async (req, res) => {
  try {
    const result = await HairCut.find().select("date active hour -_id");

    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
/////////////////////////////////////////////////
//get by user id
exports.getHairCutByUser = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await HairCut.find({ user: id })
      .populate("hairCut")
      .populate("user")
      .populate("barber");
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
/////////////////////////////////////////////////
//get by barber id
exports.getHairCutByBarberId = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(req.body)
    const result = await HairCut.find({ barber: id })
      .populate("hairCut")
      .populate("user")
      .populate("barber");
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
/////////////////////////////////////////////////
//get by barber name
exports.getHairCutByBarber = async (req, res) => {
  try {
    const barber = req.body.barber_Name;
    const result = await HairCut.find({ barber_Name: barber })
      .populate("hairCut")
      .populate("user")
      .populate("barber");
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//add new haircut
exports.addHairCuts = async (req, res) => {
  try {
    let body = req.body;
    const { error } = validateHairCut(body);
    //valide hair cuts deatails are ok
    if (error) return res.status(400).send(error.details[0].message);

    //create the user
    let haircut = new HairCut(body);

    //save the haircut and send
    haircut = await haircut.save();
    res.status(201).send(haircut);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//delet HairCut by id
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