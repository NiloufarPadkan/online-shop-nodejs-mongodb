const User = require("../models/User");
const validator = require("validator");

exports.addUser = async (req, res) => {
  //validation of Email
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail)
    res.status(422).send("Email Address is Already Registered ");
  if (!validator.isEmail(req.body.email)) {
    res.status(422).send("Email not valid");
  }
  //validation of username
  const existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername) res.status(422).send("username is Already Registered ");

  if (!validator.isAlphanumeric(req.body.username)) {
    res.status(422).send("Username not Alphanumeric");
  }
  if (req.body.username.length < 6)
    res.status(422).send("Username length must be betwenn 6 and 30");

  //strong pass
  if (!validator.isStrongPassword(req.body.password)) {
    res.status(422).send("password is  not strong");
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    console.log("saving");
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
