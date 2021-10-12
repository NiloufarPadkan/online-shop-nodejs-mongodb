const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  owner: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("Category", categorySchema);
