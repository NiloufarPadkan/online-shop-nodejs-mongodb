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
tagSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "tag",
});
tagSchema.set("toObject", { virtuals: true });
tagSchema.set("toJSON", { virtuals: true });
tagSchema.index({ name: "text" });
module.exports = mongoose.model("Tag", tagSchema);
