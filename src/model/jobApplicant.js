const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const paymentSchema = mongoose.Schema({
  emplyeerId: {
    type: objectid,
    ref: "users",
  },
  jobId: {
    type: objectid,
    ref: "Job",
  },
  driverId: {
    type: objectid,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Reject", "Withdraw"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const payment = mongoose.model("jobApplicant", paymentSchema);
module.exports = payment;