const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
