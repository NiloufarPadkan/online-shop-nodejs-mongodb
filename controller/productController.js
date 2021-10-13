const Product = require("../models/Product");
const dict = require("../resources/dict");

exports.addProduct = async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      tag: req.body.tag,
      countInStock: req.body.countInStock,
      active: req.body.active,
    });

    product = await product.save();

    res.send(product);
  } catch (e) {
    return res.status(422).send(e);
  }
};
exports.removeProduct = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });

  if (!product) {
    return res.status(422).send(dict.productExistence);
  }

  try {
    removedProduct = await Product.deleteOne({ id: req.params.id });

    res.status(200).send(dict.sucessfulRemove);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.active = async (req, res) => {
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
//exports.edit=async (req,res)
