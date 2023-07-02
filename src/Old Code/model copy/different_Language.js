const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const languagesSchema = mongoose.Schema(
  {
    language: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("different_Languages", languagesSchema);
