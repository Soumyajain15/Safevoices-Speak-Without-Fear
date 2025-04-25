import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "../styles/app.css";

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Anonymous",
      content: "How can I file an anonymous complaint?",
      comments: ["You can use the SafeVoice report section."],
    },
    {
      id: 2,
      user: "User123",
      content: "Does anyone know about counseling session timings?",
      comments: ["Counseling sessions are available from 9 AM to 6 PM."],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});

  // Add a new post
  const addPost = () => {
    if (newPost.trim() === "") return;
    const newEntry = {
      id: posts.length + 1,
      user: "Anonymous",
      content: newPost,
      comments: [],
    };
    setPosts([...posts, newEntry]);
    setNewPost("");
  };

  // Add a comment to a post
  const addComment = (postId) => {
    if (!newComment[postId] || newComment[postId].trim() === "") return;
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment[postId]],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment({ ...newComment, [postId]: "" });
  };

  // Delete a post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center community-title">Community Forum</h2>

      {/* Create New Post */}
      <Form className="my-3">
        <Form.Group controlId="newPost">
          <Form.Control
            type="text"
            placeholder="Share your thoughts or ask questions..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" onClick={addPost} className="mt-2">
          Post
        </Button>
      </Form>

      {/* List of Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="mb-3 forum-card">
          <Card.Body>
            <Card.Title>{post.user}</Card.Title>
            <Card.Text>{post.content}</Card.Text>

            {/* Comment Section */}
            <h6>Comments:</h6>
            {post.comments.length === 0 ? (
              <p className="text-muted">No comments yet.</p>
            ) : (
              post.comments.map((comment, index) => (
                <p key={index} className="comment-text">
                  🗨️ {comment}
                </p>
              ))
            )}

            {/* Add Comment */}
            <Form className="mt-2">
              <Form.Control
                type="text"
                placeholder="Add a comment..."
                value={newComment[post.id] || ""}
                onChange={(e) =>
                  setNewComment({ ...newComment, [post.id]: e.target.value })
                }
              />
              <Button
                variant="outline-secondary"
                size="sm"
                className="mt-2"
                onClick={() => addComment(post.id)}
              >
                Add Comment
              </Button>
            </Form>

            {/* Post Actions */}
            <div className="mt-3">
              <Button
                variant="danger"
                size="sm"
                className="me-2"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </Button>
              <Button variant="outline-primary" size="sm">
                Reply
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CommunityForum;
