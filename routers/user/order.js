const Order = require("../../models/Order");
const { verifyToken } = require("../../middleware/verify");

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

module.exports = router;
