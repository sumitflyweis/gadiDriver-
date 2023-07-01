const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const vedioSchema = mongoose.Schema(
  {
    vedio: {
        type: String,
        default:
          "https://youtu.be/MjlAxVKdTgw",
      },
    startTime: {
      type: String,
      default:""
    },
    endTime:{
        type:String,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vedio", vedioSchema);


