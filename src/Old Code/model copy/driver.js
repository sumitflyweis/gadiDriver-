const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const driverSchema = mongoose.Schema(
  {
    authid: {
      type: objectid,
      ref: "Auth_Employee_Owner",
    },
    mobileNumber: {
      type: String,
    },
    gender: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    ResumeTitle: {
      type: String,
      default: "",
    },
    location: {
      type: objectid,
      ref: "location",
    },
    exactAddress: {
      type: String,
      default: "",
    },
    category: {
      type: objectid,
      ref: "category",
    },
    language: {
      type: objectid,
      ref: "different_Languages",
    },
    militaryService: {
      type: String,
      default: "",
    },
    DateOfBirth: {
      type: String,
      default: "",
    },
    licenseNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    interest: {
      type: String,
      default: "",
    },
    experience: [
      {
        companyName: {
          type: String,
          default: "",
        },
        jobTitle: {
          type: String,
          default: "",
        },
        vehicletype: {
          type: objectid,
          ref: "vehicletype",
        },
        starttime: {
          type: String,
          default: "",
        },
        endtime: {
          type: String,
          default: "",
        },
        Status: {
          type: String,
          default: "",
        },
      },
    ],
    frontImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw1kvCFmU96sIc0v4VgaPKW8&ust=1682860597316000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODu37iWz_4CFQAAAAAdAAAAABAE",
    },
    backImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw1kvCFmU96sIc0v4VgaPKW8&ust=1682860597316000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODu37iWz_4CFQAAAAAdAAAAABAE",
    },
    photoUpload: {
      type: String,
      default: "https://tinyurl.com/5ahwwkv6",
    },
    jobServicesId: {
      type: objectid,
      ref: "jobService",
    },
    employerAction: {
      type: String,
      default: "",
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("driver", driverSchema);
