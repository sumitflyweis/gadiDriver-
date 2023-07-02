const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const subscriptionSchema = mongoose.Schema(
  {
    plan: {
      type: String,
    },
    price: {
      type: String,
    },
    day: {
      type: Number,
      default: 0
    },
    jobPosting: {
      type: Number,
      default: 0
    },
    jobDisplay: {
      type: String,
      default: 0
    },
    details: {
      type: Array,
    },
    featuredJob: {
      type: Boolean,
      default: false,
    },
    refreshJob: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subscription", subscriptionSchema);




