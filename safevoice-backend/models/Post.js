const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: String, default: "Anonymous" },
    content: { type: String, required: true },
    comments: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
