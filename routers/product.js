const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const productController = require("../controller/productController");

router.post("/add", verifyTokenAndAdmin, productController.addProduct);

router.delete("/remove/:id", verifyTokenAndAdmin, productController.remove);
//router.delete("/:id/remove", verifyTokenAndAdmin, productController.remove);

router.put("/:id/edit", verifyTokenAndAdmin, productController.editProduct);
router.put(
  "/:id/activitystatus",
  verifyTokenAndAdmin,
  productController.activityStatus
);

module.exports = router;
