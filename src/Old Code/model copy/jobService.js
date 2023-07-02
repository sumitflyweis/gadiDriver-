const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const jobService_Schema = mongoose.Schema(
  {
    companyType: {
      type: String,
      enum: ["COMPANY", "INDIVISUAL"],
    },

    jobtitle: {
      type: String,
      default: "",
    },
    jobtype: {
      type: String,
      default: "",
    },
    vehicletype: {
      type: String,
      default: "",
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
      default: "https://tinyurl.com/5ahwwkv6",
    },
    ///////////////////////////////////
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
    /////////////////////////////////
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
    /////////////////////////////////////
    uploadImage: {
      type: String,
      // default: "https://tinyurl.com/5ahwwkv6",
      default: "",
    },
    //////////////////////////
    detailsOfCompany: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    ///////////////////////////////
    password: {
      type: String,
      default: "",
    },
    confirmpassword: {
      type: String,
      default: "",
    },
    /////////////////////////
    viewed_count: {
      type: Number,
      default: 0,
    },
    subscription: {
      type: objectid,
      ref: "subscription",
    },
    ///////////////////////////
    status: {
      type: String,
      default: ""
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobService", jobService_Schema);
