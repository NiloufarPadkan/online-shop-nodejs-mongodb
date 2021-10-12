const Tag = require("../models/Tag");

exports.addTag = async (req, res) => {
  const existingTag = await Tag.findOne({ name: req.body.name });

  if (existingTag) {
    return res.status(422).send("This tag already exists");
  }
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

exports.removeTag = async (req, res) => {
  const tag = await Tag.findOne({ id: req.params.id });

  if (!tag) {
    return res.status(422).send("This tag doesnt exist");
  }

  try {
    removedTag = await Tag.deleteOne({ id: req.params.id });

    res.status(200).send("tag removed");
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.editTag = async (req, res) => {
  try {
    const editedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },

      { new: true }
    );
    res.send(editedTag);
  } catch (e) {
    res.status(400).send(e);
  }
};
