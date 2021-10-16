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
  tagController.create
);

router.get("/get/:id", tagController.read);
router.get("/get", tagController.read);

router.delete(
  "/remove/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  tagController.delete
);
router.put(
  "/edit/:id",
  verifyTokenAndAdmin,
  validationForExisting,
  validationForuniqueness,
  tagController.update
);

module.exports = router;
