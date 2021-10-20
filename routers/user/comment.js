const express = require("express");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");
const commentController = require("../../controller/user/commentsController");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const uploadController = require("../../controller/uploadController");

const router = express.Router();
router.post(
    "/:id",
    verifyToken,
    uploadMiddleware.upload.single("image"),
    commentController.create
);
router.post(
    "/",
    verifyToken,
    uploadMiddleware.upload.single("image"),
    commentController.create
);
module.exports = router;
