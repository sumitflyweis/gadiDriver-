// const mongoose = require("mongoose");
// const objectid = mongoose.Schema.Types.ObjectId;

// const paymentSchema = mongoose.Schema({
//   subscriptionId: {
//     type: objectid,
//     ref: "subscription",
//   },
//   employerId: {
//     type: objectid,
//     ref: "jobService",
//   },
//   status: {
//     type: String,
//     default: "pending",
//   },
//   receipt: {
//     type: String,
//     // required: true
//   },
//   amount_paid: {
//     type: Number,
//     default: 0,
//   },
//   name: {
//     type: String,
//     // required: true
//   },

//   date: {
//     type: Date,
//     default: Date.now(),
//   },
//   paymentMethod: {
//     type: String,
//     default: "upi",
//     enum: [
//       "upi",
//       "DebitCard",
//       "Debitcard",
//       "debitcard",
//       "creditcard",
//       "CreditCard",
//     ],
//   },

//   orderStatus: {
//     type: String,
//     default: "In Progress",
//     enum: ["Cancelled", "In Progress", "Ordered"],
//   },

//   orderId: { type: String },
// });

// const payment = mongoose.model("payment", paymentSchema);

// module.exports = payment;
