const CommunityPost = require("../models/CommunityPost");

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts.");
  }
};

// Create a New Post
exports.createPost = async (req, res) => {
  try {
    const { user, content } = req.body;
    const newPost = new CommunityPost({ user, content, comments: [] });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).send("Error creating post.");
  }
};

// Add a Comment
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found.");
    }

    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).send("Error adding comment.");
  }
};

// Delete a Post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await CommunityPost.findByIdAndDelete(postId);
    res.status(200).send("Post deleted successfully.");
  } catch (error) {
    res.status(500).send("Error deleting post.");
  }
};

