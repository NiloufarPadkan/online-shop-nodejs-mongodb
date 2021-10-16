const Product = require("../models/Product");
const Tag = require("../models/Tag");

const dict = require("../resources/dict");

exports.search = async (req, res) => {
  const searchString = req.query.search;
  try {
    const titleSearchResult = await Product.find({
      name: { $regex: searchString, $options: "i" },
    });
    console.log(titleSearchResult);
    const tagSearchResult = await Tag.find({
      name: { $regex: searchString, $options: "i" },
    }).populate("products");

    res.status(200).send({ tagSearchResult, titleSearchResult });
  } catch (e) {
    res.status(500).json(e);
  }
};
