const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verify");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const uploadController = require("../controller/uploadController");

const productController = require("../controller/productController");
const activityController = require("../controller/activityController");

router.post(
    "/add",
    verifyTokenAndAdmin,
    uploadMiddleware.upload.single("cover"),
    productController.create
);
router.get("/", productController.read);

router.delete("/remove/:id", verifyTokenAndAdmin, productController.delete);
//router.delete("/:id/remove", verifyTokenAndAdmin, productController.remove);

router.put("/:id/edit", verifyTokenAndAdmin, productController.update);
router.put(
    "/:id/activitystatus",
    verifyTokenAndAdmin,
    activityController.activityStatus
);

module.exports = router;
