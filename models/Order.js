const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: ObjectId,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],

        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
