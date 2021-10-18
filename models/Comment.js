const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product_id: {
            type: ObjectId,
        },
        image: {
            type: Buffer,
        },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
