const User = require("../models/User");
const validator = require("validator");
const Category = require("../models/Category");
const dict = require("../resources/dict");

const validationForRegister = async (req, res, next) => {
    console.log(req.body);
    console.log("Dddddddddddddddddddd");
    try {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) return res.status(422).send(dict.emailExistence);
        if (!validator.isEmail(req.body.email)) {
            return res.status(422).send(dict.invalidEmail);
        }
        //validation of username
        const existingUsername = await User.findOne({
            username: req.body.username,
        });
        if (existingUsername) return res.status(422).send(dict.userExistence);

        if (!validator.isAlphanumeric(req.body.username)) {
            return res.status(422).send(dict.AlphanumericError);
        }
        if (req.body.username.length < 6)
            return res.status(422).send(dict.lengthError);

        //strong pass
        if (!validator.isStrongPassword(req.body.password)) {
            return res.status(422).send(dict.weakPass);
        }
    } catch (e) {
        console.log(e);
    }
    next();
};

module.exports = {
    validationForRegister,
};
