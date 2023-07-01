const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const subscriptionSchema = mongoose.Schema(
  {
    plan: {
      type: String,
    },
    price: {
      type: String,
    },
    details: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subscription", subscriptionSchema);




