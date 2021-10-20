const Product = require("../../models/Product");
const express = require("express");
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");

const productController = require("../../controller/user/productController");

router.get("/", productController.read);

module.exports = router;
