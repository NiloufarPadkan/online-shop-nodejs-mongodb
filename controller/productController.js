const Product = require("../models/Product");
const dict = require("../resources/dict");

exports.create = async (req, res) => {
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
exports.delete = async (req, res) => {
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

exports.update = async (req, res) => {
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
exports.read = async (req, res) => {
  //products?categories=2342342,234234

  const tagFilter = req.query.tags
    ? { tag: { $in: req.query.tags.split(",") } }
    : {};
  const categoryFilter = req.query.categories
    ? { category: { $in: req.query.categories.split(",") } }
    : {}; // more variables that you need and are empty objects if don't exist
  const nameFilter = req.query.name ? { name: req.query.name } : {};

  console.log(tagFilter);
  const productList = await Product.find({
    ...tagFilter,
    ...categoryFilter,
    ...nameFilter,
  }).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
};
