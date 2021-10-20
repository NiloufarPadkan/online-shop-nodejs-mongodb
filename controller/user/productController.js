const Product = require("../../models/Product");
const dict = require("../../resources/dict");
exports.read = async (req, res) => {
    const tagFilter = req.query.tags
        ? { tag: { $in: req.query.tags.split(",") } }
        : {};
    const categoryFilter = req.query.categories
        ? { category: { $in: req.query.categories.split(",") } }
        : {};
    const nameFilter = req.query.name ? { name: req.query.name } : {};

    console.log(tagFilter);
    const productList = await Product.find({
        ...tagFilter,
        ...categoryFilter,
        ...nameFilter,
    })
        .populate("category")
        .populate("tag")
        .skip(req.body.skip)
        .limit(5);

    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
};
