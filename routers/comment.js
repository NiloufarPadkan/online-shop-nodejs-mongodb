const Comment = require("../models/Comment");
const express = require("express");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verify");
const commentController = require("../controller/commentsController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const uploadController = require("../controller/uploadController");

const router = express.Router();

router.post(
    "/:id",
    verifyToken,

    commentController.create
);
router.post(
    "/",
    verifyToken,
    uploadMiddleware.upload.single("image"),
    commentController.create
);
router.get("/", verifyTokenAndAdmin, commentController.read);
router.put(
    "/image",
    uploadMiddleware.upload.single("comment"),
    uploadController.create,
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);
router.put("/:id/confirm", verifyTokenAndAdmin, commentController.update);

module.exports = router;
