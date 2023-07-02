const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const employerSchema = mongoose.Schema(
  {
    employer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employer", employerSchema);
