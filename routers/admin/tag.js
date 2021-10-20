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
const tagController = require("../../controller/admin/tagController");
router.post(
    "/add",
    verifyTokenAndAdmin,
    validationForuniqueness,
    tagController.create
);

router.delete(
    "/remove/:id",
    verifyTokenAndAdmin,
    validationForExisting,
    tagController.delete
);
router.put(
    "/edit/:id",
    verifyTokenAndAdmin,
    validationForExisting,
    validationForuniqueness,
    tagController.update
);

module.exports = router;
