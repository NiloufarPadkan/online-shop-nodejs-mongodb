const Tag = require("../../models/Tag");
const dict = require("../../resources/dict");

exports.create = async (req, res) => {
    const tag = new Tag({
        name: req.body.name,
        owner: req.user.id,
    });

    try {
        const savedTag = await tag.save();
        console.log(req.user);
        res.status(200).send(savedTag);
    } catch (e) {
        res.status(400).send(e);
    }
};
exports.read = async (req, res) => {
    if (req.params.id) {
        const tag = await Tag.findById(req.params.id);
        return res.status(200).send(tag);
    }
    const tags = await Tag.find();
    return res.status(200).send(tags);
};
