const Comment = require("../../models/Comment");
const express = require("express");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");
const commentController = require("../../controller/admin/commentController");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const uploadController = require("../../controller/uploadController");

const router = express.Router();

router.get("/", verifyTokenAndAdmin, commentController.read);

router.put("/:id/confirm", verifyTokenAndAdmin, commentController.update);
module.exports = router;
