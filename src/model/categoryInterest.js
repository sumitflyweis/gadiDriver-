const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const categoryInterestSchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categoryInterest", categoryInterestSchema);
