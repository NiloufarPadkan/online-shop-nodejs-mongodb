const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("Unable to login");
    }

    const pass = req.body.password;
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    const userObject = user.toObject();
    delete userObject.password;
    const accessToken = jwt.sign(
      { id: userObject._id, isAdmin: userObject.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "1w" }
    );
    res.status(200).json({ userObject, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
