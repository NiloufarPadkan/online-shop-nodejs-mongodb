const Product = require("../models/Product");
const dict = require("../resources/dict");

exports.addProduct = async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      cover: req.body.cover,
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
exports.remove = async (req, res) => {
  console.log("sakhdjhdkhk");
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(422).send(dict.productNonExistence);
    }
    removedProduct = await Product.deleteOne({ id: req.params.id });

    res.status(200).send(dict.sucessfulRemove);
  } catch (e) {
    console.log("yes");

    res.status(400).send(e);
  }
};

exports.editProduct = async (req, res) => {
  try {
    console.log("edit");
    console.log(req.params.id);
    const editedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        cover: req.body.cover,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        tag: req.body.tag,
        countInStock: req.body.countInStock,
        active: req.body.active,
      },

      { new: true }
    );
    res.send(editedProduct);
  } catch (e) {
    console.log("bad request");
    res.status(400).send(e);
  }
};
exports.activityStatus = async (req, res) => {
  try {
    console.log("hi im me");
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: req.body.state },

      { new: true }
    );
    res.send(product);
  } catch (e) {
    console.log("hi im me");

    res.status(400).send(e);
  }
};
//exports.edit=async (req,res)
