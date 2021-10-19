const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: String,
        },
        message: {
            type: String,
        },
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now,
        },

        adminReceiptStatus: { type: Boolean, default: false },
        userReceiptStatus: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", productSchema);
