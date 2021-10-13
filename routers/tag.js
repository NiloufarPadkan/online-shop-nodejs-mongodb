const Tag = require("../models/Tag");
const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const {
  validationForuniqueness,
  validationForExisting,
} = require("../middleware/tagValidation");

const router = express.Router();
const tagController = require("../controller/tagController");

router.post(
  "/add",
  verifyTokenAndAuthorization,
  validationForuniqueness,
  tagController.addTag
);

router.delete(
  "/remove/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  tagController.removeTag
);
router.put(
  "/edit/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  validationForuniqueness,
  tagController.editTag
);

module.exports = router;
