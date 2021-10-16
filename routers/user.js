const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");
const User = require("../models/User");
const searchController = require("../controller/searchController");
const Product = require("../models/Product");
const Tag = require("../models/Tag");

const router = require("express").Router();
// const tag = await Tag.findById("6166af5c1f50056d218acb06").populate(
//   "products"
// );
// console.log(tag);

router.get("/search", searchController.search);
//UPDATE
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
