const express = require("express");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verify");
const {
    validationForuniqueness,
    validationForExisting,
} = require("../../middleware/categoryValidation");

const router = express.Router();
const categoryController = require("../../controller/user/categoryController");

router.get("/get/:id", categoryController.read);
router.get("/get", categoryController.read);

module.exports = router;
