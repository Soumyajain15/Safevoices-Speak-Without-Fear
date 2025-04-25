const mongoose = require("mongoose");

const communityPostSchema = mongoose.Schema(
  {
    user: { type: String, required: true }, // Anonymous or user name
    content: { type: String, required: true }, // Post content
    comments: { type: [String], default: [] }, // Array of comments
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunityPost", communityPostSchema);
