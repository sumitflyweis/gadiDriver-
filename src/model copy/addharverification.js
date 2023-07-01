const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const aadharNumSchema = mongoose.Schema(
  {
    aadhaar_number: {
      type: String,
    },
    otp: {
      type: String,
    },
    ref_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("aadharNum", aadharNumSchema);
