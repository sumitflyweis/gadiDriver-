const PostModel = require('../../model/post');
const userSchema = require("../../model/userModel");

exports.createPost = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      req.body.userId = findUser._id;
      console.log(req.body);
      const newCategory = await PostModel.create(req.body);
      res.status(200).send({ status: 200, message: "Post Create successfully.", data: newCategory });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
};
exports.getAllUserPost = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const post = await PostModel.find({ userId: findUser._id }).populate({ path: 'userId likeUser Comment.user', select: 'firstName lastName photoUpload' });
      if (post.length == 0) {
        res.status(404).json({ message: "Post Not found.", status: 404 });
      }
      res.status(200).send({ status: 200, message: "Post Found successfully.", data: post });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().lean().populate({ path: 'userId likeUser Comment.user', select: 'firstName lastName photoUpload' });;
    if (posts.length == 0) {
      res.status(404).json({ message: "Post Not found.", status: 404 });
    }
    res.status(200).send({ status: 200, message: "Post Found successfully.", data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the posts' });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await PostModel.findById(id).populate({ path: 'userId likeUser Comment.user', select: 'firstName lastName photoUpload' });
    if (!posts) {
      res.status(404).json({ message: "Post Not found.", status: 404 });
    }
    res.status(200).send({ status: 200, message: "Post Found successfully.", data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const posts = await PostModel.findById(id).populate({ path: 'userId likeUser Comment.user', select: 'firstName lastName photoUpload' });
      if (!posts) {
        res.status(404).json({ message: "Post Not found.", status: 404 });
      } else {
        let obj = {
          category: req.body.category || posts.category,
          image_vedio: req.body.image_vedio || posts.image_vedio,
          description: req.body.description || posts.description,
        }
        const updatedPost = await PostModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
        if (updatedPost) {
          res.status(200).json({ status: 200, message: "Post Update.", data: updatedPost });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await PostModel.findById(id).populate({ path: 'userId likeUser Comment.user', select: 'firstName lastName photoUpload' });
    if (!posts) {
      res.status(404).json({ message: "Post Not found.", status: 404 });
    } else {
      const deletedPost = await PostModel.findByIdAndDelete({ _id: posts._id });
      if (deletedPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};
exports.addLike = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const post = await PostModel.findById({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      } else {
        if (post.likeUser.includes((findUser._id).toString())) {
          const update = await PostModel.findByIdAndUpdate({ _id: post._id }, { $pull: { likeUser: (findUser._id).toString() }, $set: { likeCount: post.likeCount - 1 } }, { new: true });
          if (update) {
            res.status(200).json({ status: 200, message: "Un like successfully", data: update });
          }
        } else {
          const update = await PostModel.findByIdAndUpdate({ _id: post._id }, { $push: { likeUser: (findUser._id).toString() }, $set: { likeCount: post.likeCount + 1 } }, { new: true });
          if (update) {
            res.status(200).json({ status: 200, message: "like add successfully", data: update });
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the like' });
  }
};
exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const post = await PostModel.findById({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      } else {
        let obj = {
          user: findUser._id,
          Comment: comment,
        }
        const update = await PostModel.findByIdAndUpdate({ _id: post._id }, { $push: { Comment: obj }, $set: { commentCount: post.commentCount + 1 } }, { new: true });
        if (update) {
          res.status(200).json({ status: 200, message: "Comment add successfully", data: update });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
};

