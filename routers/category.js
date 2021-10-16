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
  categoryController.create
);

router.get("/get/:id", categoryController.read);
router.get("/get", categoryController.read);

router.delete(
  "/remove/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  categoryController.delete
);
router.put(
  "/edit/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  validationForuniqueness,
  categoryController.update
);

module.exports = router;
