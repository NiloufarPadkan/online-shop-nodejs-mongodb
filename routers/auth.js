const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const registerController = require("../controller/registerController");
const loginController = require("../controller/loginController");
const { validationForRegister } = require("../middleware/validation");

router.post("/register", validationForRegister, registerController.addUser);

router.post("/login", loginController.loginUser);
module.exports = router;
