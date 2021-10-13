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
const productController = require("../controller/productController");

router.post("/add", verifyTokenAndAdmin, productController.addProduct);
module.exports = router;

//owner moshakhas kon bad rabeteye beyneshoon ro dorost kon ke har admin mahsoolate khodeh ro betoone edit kone
