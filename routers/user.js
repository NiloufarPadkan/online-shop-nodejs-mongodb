const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verify");
const User = require("../models/User");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const uploadController = require("../controller/uploadController");

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

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
