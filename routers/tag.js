const Tag = require("../models/Tag");
const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const router = express.Router();
const tagController = require("../controller/tagController");

router.post("/add", verifyTokenAndAuthorization, tagController.addTag);

router.delete("/remove/:id", verifyTokenAndAdmin, tagController.removeTag);
router.put("/edit/:id", verifyTokenAndAdmin, tagController.editTag);

module.exports = router;
