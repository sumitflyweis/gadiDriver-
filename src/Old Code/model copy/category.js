const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
