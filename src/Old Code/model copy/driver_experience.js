const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const driver_experienceSchema = mongoose.Schema(
  {

    authid: {
      type: objectid,
      ref: "Auth_Employee_Owner",
      default: "",
    },
    driverId:{
        type:objectid,
        ref:"driver"
    },
    companyName: {
      type: String,
    },
    jobTitle:{
        type:String
    },
    vehicletype:{
        type:objectid,
        ref:"vehicletype"
    },
    starttime:{
        type:String
    },
    endtime:{
        type:String
    },
    Status:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("driver_experience", driver_experienceSchema);
