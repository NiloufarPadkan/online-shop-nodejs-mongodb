const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verify");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  try {
    let order = new Order({
      products: req.body.products,
      userId: req.user.id,
    });

    order = await order.save();
    res.send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    if (req.params.id) {
      const order = await Order.findById(req.params.id);
      return res.status(200).send(order);
    }
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/pending", verifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.find({ status: "pending" });
    return res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/confirm/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const confirmedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },

      { new: true }
    );
    return res.status(200).send(confirmedOrder);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
