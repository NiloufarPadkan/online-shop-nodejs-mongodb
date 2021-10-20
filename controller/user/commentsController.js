const Comment = require("../../models/Comment");
const Product = require("../../models/Product");

exports.create = async (req, res) => {
    try {
        let comment = new Comment({
            content: req.body.content,
            product_id: req.params.id,
            owner: req.user.id,
        });
        try {
            if (req.file.buffer) comment.image = req.file.buffer;
        } catch (e) {}
        comment = await comment.save();

        res.send(comment);
    } catch (e) {
        res.status(400).send(e);
    }
};
