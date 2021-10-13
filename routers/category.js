const Category = require("../models/Category");
const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const {
  validationForuniqueness,
  validationForExisting,
} = require("../middleware/categoryValidation");

const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post(
  "/add",
  verifyTokenAndAuthorization,
  validationForuniqueness,
  categoryController.addCategory
);

router.delete(
  "/remove/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  categoryController.removeCategory
);
router.put(
  "/edit/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  validationForuniqueness,
  categoryController.editCategory
);

module.exports = router;
