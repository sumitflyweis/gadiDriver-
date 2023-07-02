const mongoose = require('mongoose');
const objectid = mongoose.Types.ObjectId;
const postSchema = mongoose.Schema({
  category: {
    type: objectid,
    ref: "categoryInterest",
  },
  userId: {
    type: objectid,
    ref: "users"
  },
  image_vedio: {
    type: String,
    default: ""
  },
  description: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likeUser: [{
    type: objectid,
    ref: "users",
  }],
  commentCount: {
    type: Number,
    default: 0,
  },
  Comment: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    Comment: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  date: {
    type: Date,
    default: Date.now,
  },
})
const postmodel = mongoose.model('post', postSchema);
module.exports = postmodel;