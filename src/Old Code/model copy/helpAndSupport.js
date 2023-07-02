const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const helpSchema = mongoose.Schema(
  {
    topic: {
      type: String,
    },
    desc:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("help", helpSchema);
