const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");
const User = require("../../models/User");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const uploadController = require("../../controller/uploadController");

const router = require("express").Router();

router.post(
    "/me/avatar",
    verifyToken,
    uploadMiddleware.upload.single("avatar"),
    uploadController.create,
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);
router.delete(
    "/me/avatar",
    verifyToken,
    uploadController.delete,

    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

module.exports = router;
