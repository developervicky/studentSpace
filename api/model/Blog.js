const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    ownerID: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: String,
    summary: String,
    cover: String,
    content: String,
    author: String,
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
