const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const aadharSchema = mongoose.Schema(
  {
    userId: {
      type: objectid,
      ref: "users"
    },
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

module.exports = mongoose.model("aadhar", aadharSchema);
