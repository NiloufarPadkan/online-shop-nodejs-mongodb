const Comment = require("../../models/Comment");
const Product = require("../../models/Product");

exports.read = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.update = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(422).send("comment not found");
        }
        if (comment.status === "confirmed") {
            return res.status(422).send("comment already is confirmed");
        }
        const confirmedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { status: "confirmed" },
            { new: true }
        );
        if (confirmedComment.product_id) {
            let product = await Product.findById(
                confirmedComment.product_id
            ).populate("comments");
            product.comments.unshift(confirmedComment);
            product = await product.save();
            res.status(200).send(product);
        }
        return res.status(200).send(confirmedComment);
    } catch (e) {
        res.status(400).send(e);
    }
};
