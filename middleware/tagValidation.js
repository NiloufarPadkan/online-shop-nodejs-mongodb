const Tag = require("../models/Tag");
const dict = require("../resources/dict");

const validationForuniqueness = async (req, res, next) => {
  const existingTag = await Tag.findOne({ name: req.body.name });

  if (existingTag) {
    return res.status(422).send(dict.tagExistence);
  }
  next();
};
const validationForExisting = async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return res.status(422).send(dict.tagNonExistence);
  }
  next();
};

module.exports = {
  validationForuniqueness,
  validationForExisting,
};
