const express = require("express");
const { verifyTokenAndAdmin } = require("../../middleware/verify");
const {
    validationForuniqueness,
    validationForExisting,
} = require("../../middleware/categoryValidation");

const router = express.Router();
const categoryController = require("../../controller/admin/categoryController");
router.post(
    "/add",
    verifyTokenAndAdmin,
    validationForuniqueness,
    categoryController.create
);
router.delete(
    "/remove/:id",
    verifyTokenAndAdmin,
    validationForExisting,
    categoryController.delete
);
router.put(
    "/edit/:id",
    verifyTokenAndAdmin,
    validationForExisting,
    validationForuniqueness,
    categoryController.update
);

module.exports = router;
