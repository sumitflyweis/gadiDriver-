const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const faqSchema = mongoose.Schema(
  {
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("faq", faqSchema);
