const Product = require("../models/Product");
const dict = require("../resources/dict");

exports.activityStatus = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: req.body.state },

      { new: true }
    );
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};
