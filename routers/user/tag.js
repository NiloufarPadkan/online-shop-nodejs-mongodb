const Tag = require("../../models/Tag");
const express = require("express");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");
const {
    validationForuniqueness,
    validationForExisting,
} = require("../../middleware/tagValidation");

const router = express.Router();
const tagController = require("../../controller/user/tagController");

router.get("/get/:id", tagController.read);
router.get("/get", tagController.read);

module.exports = router;
