const Comment = require("../models/Comment");
const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const commentController = require("../controller/commentsController");

const router = express.Router();

router.post("/:id", verifyToken, commentController.create);
router.post("/", verifyToken, commentController.create);
router.get("/", verifyTokenAndAdmin, commentController.read);

router.put("/:id/confirm", verifyTokenAndAdmin, commentController.update);

module.exports = router;
