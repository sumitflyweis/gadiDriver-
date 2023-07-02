const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const cameraBrowseSchema = mongoose.Schema(
  {
    camera: {
      type: String,
    },
    browse:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cameraBrowse", cameraBrowseSchema);
