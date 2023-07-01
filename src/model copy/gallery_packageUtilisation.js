const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const pacge_utilisationSchema = mongoose.Schema(
  {
    subscriptionId: {
      type: objectid,
      ref: "subscription",
    },
    membership: {
      type: String,
      default: "",
    },
    jobposting: {
      type: String,
      default: "",
    },
    featuredjob: {
      type: String,
      default: "",
    },
    refreshjob: {
      type: String,
      default: "",
    },
    jobDisplayedfor: {
      type: String,
      default: "",
    },
    jobserviceId: {
      type: objectid,
      ref : "jobService",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("packge_utilisation", pacge_utilisationSchema);
