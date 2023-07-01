const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const jobService_Schema = mongoose.Schema(
  {
    userId: {
      type: objectid,
      ref: "users",
    },
    companyType: {
      type: String,
      enum: ["COMPANY", "INDIVISUAL"],
    },
    jobtitle: {
      type: String,
      default: "",
    },
    jobtype: {
      type: objectid,
      ref: "jobType",
    },
    vehicletype: {
      type: objectid,
      ref: "vehicletype",
    },
    gender: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    salaryOffer: {
      type: String,
      default: "",
    },
    totalExperience: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },
    language: {
      type: objectid,
      ref: "different_Languages",
    },
    closeDate: {
      type: String,
      default: "",
    },
    autoClose: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    applicantChatYouDirectly: {
      type: Boolean,
      default: false,
    },
    startChat: {
      type: Boolean,
      default: false,
    },
    vehicalImage: {
      type: String,
      default: "",
    },
    detailsOfCompany: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    viewed_count: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: ""
    },
  }, { timestamps: true, }
);

module.exports = mongoose.model("Job", jobService_Schema);
