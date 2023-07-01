const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const wishlistSchema = mongoose.Schema(
  {
    driverId: {
      type: objectid,
      ref: "driver",
    },
    jobServiceId: {
      type: objectid,
      ref: "jobService",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wishlist", wishlistSchema);
