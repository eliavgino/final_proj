const { Barber, validateBarber, validateComment } = require("../models/Barber");
const bcrypt = require("bcrypt");

//get all barbers
exports.getAllBarbers = async (req, res) => {
  try {
    const result = await Barber.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//find barber by id
exports.getBarberByID = async (req, res) => {
  try {
  
    const id = req.body.id;
    const result = await Barber.findById(id);
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
//add new barber
exports.addBarber = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validateBarber(body);
    //valide barber password
    if (error) return res.status(400).send(error.details[0].message);

    //check barber dosent exist
    let barber = await Barber.findOne({ email: req.body.email });
    if (barber) return res.status(400).send("barber already exist");

    //create the barber
    barber = new Barber(body);

    //hash the password
    const salt = await bcrypt.genSalt(10);
    barber.password = await bcrypt.hash(barber.password, salt);

    //save the barber and send
    barber = await barber.save();
    res
      .header("x-auth-token", barber.generatebarberJWT())
      .header("access-control-expose-headers", "x-auth-token")
      .send(barber);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//delet barber by id
exports.removeBarber = async (req, res) => {
  try {
    const id = req.body;
    const result = await Barber.findByIdAndDelete(id);
    res.send("done");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//add comment
exports.addCommentToBarber = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const barber = await Barber.findById(req.body.id);
    if (!barber) return res.status(400).send("Barber not found");

    barber.comments.push({ user: req.body.user_id, body: req.body.body });
    await barber.save();

    res.status(201).send(barber);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get all comments by barber id
exports.getCommentByBarberId = async (req, res) => {
  try {
    const barber = await Barber.findById(req.body.id).populate("comments.user");
    if (!barber) return res.status(400).send("Barber not found");

    res.send(barber.comments);
  } catch (err) {
    res.status(400).send(err);
  }
};
