const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const locationSchema = mongoose.Schema(
  {
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("location", locationSchema);
