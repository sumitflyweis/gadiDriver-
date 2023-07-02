const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const paymentSchema = mongoose.Schema({
  subscriptionId: {
    type: objectid,
    ref: "subscription",
  },
  userId: {
    type: objectid,
    ref: "users",
  },
  status: {
    type: String,
    default: "pending",
  },
  receipt: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  paymentMethod: {
    type: String,
    default: "upi",
    enum: [
      "upi",
      "DebitCard",
      "Debitcard",
      "debitcard",
      "creditcard",
      "CreditCard",
    ],
  },
  type: {
    type: String,
    default: "Subscription",
    enum: ["Credit", "Debit", "Subscription"],
  },
});
const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;