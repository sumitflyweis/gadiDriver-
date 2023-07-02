const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const vehicleSchema = mongoose.Schema(
  {
    vehicletype: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicletype", vehicleSchema);
