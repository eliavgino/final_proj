const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");

//get all users
exports.getUsersData = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//add new user
exports.addUser = async (req, res) => {
  try {
    const body = req.body;
    const { error } = validateUser(body);
    //valide user password
    if (error) return res.status(400).send(error.details[0].message);

    //check user dosent exist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exist");

    //create the user
    user = new User(body);

    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //save the user and send
    user = await user.save();
    res
      .header("x-auth-token", user.generateUserJWT())
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//delet user by id
exports.removeUser = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await User.findByIdAndDelete(id);
    res.send("done");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
