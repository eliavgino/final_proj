const { User } = require("../models/User");
const bcrypt = require("bcrypt");

//get all barbers
exports.auth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid email or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    let tokenUserId = null;

    if (validPassword) {
      tokenUserId = user.generateUserJWT();
    }
    console.log(tokenUserId);
    tokenUserId
      ? res.status(200).send(tokenUserId)
      : res.status(403).send("invalid email or password");
  } catch (err) {
    res.status(400).send(err);
  }
};
