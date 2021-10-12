const Category = require("../models/Category");
const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post(
  "/add",
  verifyTokenAndAuthorization,
  categoryController.addCategory
);

router.delete(
  "/remove/:id",
  verifyTokenAndAdmin,
  categoryController.removeCategory
);
router.put("/edit/:id", verifyTokenAndAdmin, categoryController.editCategory);

module.exports = router;
