const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const objectid = mongoose.Schema.Types.ObjectId;
const jobService_Schema = mongoose.Schema(
  {
    userId: {
      type: objectid,
      ref: "users",
    },
    jobtitle: {
      type: String,
      default: "",
    },
    jobtype: {
      type: objectid,
      ref: "jobType",
    },
    jobtypeInWord: {
      type: String,
    },
    vehicletype: {
      type: objectid,
      ref: "vehicletype",
    },
    vehicletypeInWord: {
      type: String,
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
    viewed_count: {
      type: Number,
      default: 0,
    },
    applicantCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likeUser: [{
      type: objectid,
      ref: "users",
    }],
    rating: {
      type: objectid,
      ref: "jobRatingModel",
    },
    status: {
      type: String,
      default: ""
    },
  }, { timestamps: true, }
);

jobService_Schema.plugin(mongoosePaginate);
jobService_Schema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("Job", jobService_Schema);
