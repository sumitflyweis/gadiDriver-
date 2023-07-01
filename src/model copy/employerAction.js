const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const employerActionSchema = mongoose.Schema(
  {
    jobServiceId: {
      type: objectid,
      ref:"jobService"
    },
    driverId:{
        type:objectid,
        ref:"driver"
    },
    Action:{
        type:String,
       // enum:["accepted","rejected","pending"]
       default:"pending"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employerAction", employerActionSchema);
