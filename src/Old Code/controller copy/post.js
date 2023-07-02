const express = require("express");
const router = express.Router();
const Post = require("../model/post");


exports.createPost = async (req, res) => {
  try {
    const { category, image_vedio, topic, desc } = req.body;
    const newPost = new Post({category,image_vedio,topic,desc,});
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category")
    res.json({msg:posts});
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts" });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("category")
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({msg:post});
  } catch (error) {
    res.status(500).json({ error: "Failed to get post" });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { category, image_vedio, topic, desc } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { category, image_vedio, topic, desc },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.like.count += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};
exports.commentOnPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.comment.count += 1;
    post.comment.driver = comment
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};





// exports.likePost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const user = req.params.user
   
//     const userId = await userSchema.findById({_id:user})
//     if (!userId) {
//       return res.status(404).json({ error: "user not found" })
//     }
//     //const userId = req.user.id; // Assuming the user ID is available in req.user.id
//     const post = await communityModel.findById(postId)
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" })
//     }
//     if (post.like.user.includes(user)) {
//       return res.status(400).json({ message: "You have already liked this post" });
//     }

//     post.like.count += 1;
//     post.like.user.push(userId)
//     post.like.status = true
//     await post.save();

//     res.json({msg:post});
//   } catch (error) {
//     res.status(500).json({ error: "Failed to like post" });
//   }
// };



// exports.commentOnPost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.params.user;

//     const user = await userSchema.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const { comment } = req.body;

//     const post = await communityModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     post.comment.count += 1;

//     const newComment = {
//       userId:user._id,
//       user: user.name,
//       profile:user.profileImage,
//       comment: comment
//     };
//     // post.comment.user.push(userId);
    
//     post.comments.push(newComment);
//     await post.save();

//     res.json({ msg: post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to comment on post" });
//   }
// };

  