const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const petrolRateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default:""
    },
    rate:{
        type:String,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("petrol", petrolRateSchema);
