var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JobService = require("../../model/Job");
exports.createJobService = async (req, res) => {
  try {
    console.log(req.body);
    let fileUrl;
    if (req.file) {
      fileUrl = req.file ? req.file.path : "";
    }
    req.body.userId = req.user._id;
    req.body.vehicalImage = fileUrl;
    const jobServiceData = req.body;
    const createdJobService = await JobService.create(jobServiceData);
    res.status(200).send({ status: 200, message: "Job Create successfully.", data: createdJobService });

  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobServicebyToken = async (req, res) => {
  try {
    const jobService = await JobService.find({ userId: req.user._id }).populate("language");
    if (!jobService) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    }
    res.status(200).send({ status: 200, message: "Job Found successfully.", data: jobService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobService = async (req, res) => {
  try {
    const jobService = await JobService.find().populate("language");
    if (jobService.length == 0) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    }
    res.status(200).send({ status: 200, message: "Job Found successfully.", data: jobService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id).populate("language subscription");
    if (!jobService) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    }
    res.status(200).send({ status: 200, message: "Job Found successfully.", data: jobService });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.salarayAndExpectation = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id);
    if (!jobService) {
      return res.status(404).json({ error: "Job service not found" });
    } else {
      let obj = {
        companyType: jobService.companyType,
        jobtitle: jobService.jobtitle,
        jobtype: jobService.jobtype,
        vehicletype: jobService.vehicletype,
        gender: jobService.gender,
        description: jobService.description,
        contactNumber: jobService.contactNumber,
        location: jobService.location,
        address: jobService.address,
        postalCode: jobService.postalCode,
        vehicalImage: jobService.vehicalImage,
        salaryOffer: req.body.salaryOffer,
        totalExperience: req.body.totalExperience,
        qualification: req.body.qualification,
        language: req.body.language,
        closeDate: req.body.closeDate,
        autoClose: req.body.autoClose
      }
      const updatedJobService = await JobService.findByIdAndUpdate({ _id: jobService._id }, obj, { new: true });
      if (!updatedJobService) {
        return res.status(404).json({ error: "Job service not found" });
      }
      res.status(200).json({ msg: updatedJobService });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.updateJobServices = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id);
    if (!jobService) {
      return res.status(404).json({ error: "Job service not found" });
    } else {
      let obj = {
        companyType: jobService.companyType,
        jobtitle: jobService.jobtitle,
        jobtype: jobService.jobtype,
        vehicletype: jobService.vehicletype,
        gender: jobService.gender,
        description: jobService.description,
        contactNumber: jobService.contactNumber,
        location: jobService.location,
        address: jobService.address,
        postalCode: jobService.postalCode,
        vehicalImage: jobService.vehicalImage,
        salaryOffer: jobService.salaryOffer,
        totalExperience: jobService.totalExperience,
        qualification: jobService.qualification,
        language: jobService.language,
        closeDate: jobService.closeDate,
        autoClose: jobService.autoClose,
        fullName: req.body.fullName,
        email: req.body.email,
        applicantChatYouDirectly: req.body.applicantChatYouDirectly,
        startChat: req.body.startChat
      }
      const updatedJobService = await JobService.findByIdAndUpdate({ _id: jobService._id }, obj, { new: true });
      if (!updatedJobService) {
        return res.status(404).json({ error: "Job service not found" });
      }
      res.status(200).json({ msg: updatedJobService });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.updateJobImage = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id);
    if (!jobService) {
      return res.status(404).json({ error: "Job service not found" });
    } else {
      let fileUrl;
      if (req.file) {
        fileUrl = req.file ? req.file.path : "";
      }
      let image = fileUrl;
      const updatedJobService = await JobService.findByIdAndUpdate({ _id: jobService._id }, { $set: { image: image } }, { new: true });
      if (!updatedJobService) {
        return res.status(404).json({ error: "Job service not found" });
      }
      res.status(200).json({ msg: updatedJobService });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};