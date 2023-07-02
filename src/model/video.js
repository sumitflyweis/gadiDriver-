const mongoose = require("mongoose");
const vedioSchema = mongoose.Schema(
  {
    video: {
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

module.exports = mongoose.model("video", vedioSchema);


