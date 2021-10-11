const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(500).send("Unable to login");
    }

    const pass = req.body.password;
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(isMatch);
    if (!isMatch) {
      res.send("Unable to login");
    }
    const userObject = user.toObject();
    delete userObject.password;
    const accessToken = jwt.sign(
      { id: userObject._id, isAdmin: userObject.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "1w" }
    );
    res.status(200).send({ userObject, accessToken });
  } catch (e) {
    res.status(500).send(e);
  }
};
