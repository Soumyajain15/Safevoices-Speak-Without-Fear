const express = require("express");
const {
  getAllPosts,
  createPost,
  addComment,
  deletePost,
} = require("../controllers/communityController"); // Check path ✅

const router = express.Router();

// Get All Community Posts
router.get("/posts", getAllPosts);

// Create a New Post
router.post("/create-post", createPost);

// Add Comment to a Post
router.post("/add-comment/:postId", addComment);

// Delete a Post
router.delete("/delete-post/:postId", deletePost);

module.exports = router;
