const Category = require("../models/Category");
const dict = require("../resources/dict");

exports.create = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    owner: req.user.id,
  });

  try {
    const savedCategory = await category.save();
    res.status(200).send(savedCategory);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    removedCategory = await Category.findOneAndDelete({ id: req.params.id });
    console.log(req.params.id);
    console.log(removedCategory.id);
    res.status(200).send(dict.sucessfulRemove);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.update = async (req, res) => {
  try {
    const editedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },

      { new: true }
    );
    res.send(editedCategory);
  } catch (e) {
    res.status(400).send(e);
  }
};
