//name discriotion price count image images brand category,Tag createdAt/updatedAt owner
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    cover: {
        type: Buffer,
    },
    images: [
        {
            type: String,
        },
    ],
    brand: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
            required: true,
        },
    ],
    countInStock: {
        type: Number,
        required: true,
        min: 1,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        deafult: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Product", productSchema);
