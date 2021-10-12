const Product = require("../models/Product");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
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

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});
module.exports = router;
