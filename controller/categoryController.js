const Category = require("../models/Category");

exports.addCategory = async (req, res) => {
  const existingCategory = await Category.findOne({ name: req.body.name });

  if (existingCategory) {
    return res.status(422).send("This category already exists");
  }
  const category = new Category({
    name: req.body.name,
    owner: req.user.id,
  });

  try {
    const savedCategory = await category.save();
    console.log(req.user);
    res.status(200).send(savedCategory);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.removeCategory = async (req, res) => {
  const category = await Category.findOne({ id: req.params.id });

  if (!category) {
    return res.status(422).send("This category doesnt exist");
  }

  try {
    removedCategory = await Category.deleteOne({ id: req.params.id });

    res.status(200).send("category removed");
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.editCategory = async (req, res) => {
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
