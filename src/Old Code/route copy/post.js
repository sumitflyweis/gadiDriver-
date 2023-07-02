const express = require("express");
const router = express.Router();
const postController = require("../controller/post");

// Create a new post
router.post("/", postController.createPost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get a specific post by ID
router.get("/:postId", postController.getPostById);

// Update a post by ID
router.put("/:postId", postController.updatePost);

// Delete a post by ID
router.delete("/:postId", postController.deletePost);

// Like a post
router.post("/post/:postId/like", postController.likePost);

// Comment on a post
router.post("/post/:postId/comment", postController.commentOnPost);

module.exports = router;
