const Category = require("../models/Category");
const dict = require("../resources/dict");

const validationForuniqueness = async (req, res, next) => {
  const existingCategory = await Category.findOne({ name: req.body.name });

  if (existingCategory) {
    return res.status(422).send(dict.categoryExistence);
  }
  next();
};
const validationForExisting = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(422).send(dict.categoryNonExistence);
    }
    console.log("bye");

    next();
  } catch (e) {
    return res.status(422).send(dict.categoryNonExistence);
  }
};

module.exports = {
  validationForuniqueness,
  validationForExisting,
};
