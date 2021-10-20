const Product = require("../../models/Product");
const dict = require("../../resources/dict");
const multer = require("multer");
exports.create = async (req, res) => {
    try {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            tag: req.body.tag,
            countInStock: req.body.countInStock,
            active: req.body.active,
        });
        try {
            if (req.file.buffer) product.cover = req.file.buffer;
        } catch (e) {
            console.log(e);
        }
        product = await product.save();

        res.send(product);
    } catch (e) {
        return res.status(422).send(e);
    }
};
exports.delete = async (req, res) => {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(422).send(dict.productNonExistence);
    }
    console.log(product.id);
    try {
        removedProduct = await Product.findByIdAndDelete(req.params.id);
        console.log(removedProduct.id);
        res.status(200).send(dict.sucessfulRemove);
    } catch (e) {
        console.log("yes");

        res.status(400).send(e);
    }
};

exports.update = async (req, res) => {
    try {
        const editedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                cover: req.body.cover,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                tag: req.body.tag,
                countInStock: req.body.countInStock,
                active: req.body.active,
            },

            { new: true }
        );

        res.send(editedProduct);
    } catch (e) {
        console.log("bad request");
        res.status(400).send(e);
    }
};
