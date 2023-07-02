var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JobService = require("../../model/Job");
const userSchema = require("../../model/userModel");
const jobApplicant = require("../../model/jobApplicant");
const { log } = require("console");
exports.createJobService = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      let fileUrl;
      if (req.file) {
        fileUrl = req.file ? req.file.path : "";
      }
      req.body.userId = findUser._id;
      req.body.vehicalImage = fileUrl;
      const jobServiceData = req.body;
      const createdJobService = await JobService.create(jobServiceData);
      if (createdJobService) {
        let update = await userSchema.findByIdAndUpdate({ _id: findUser._id }, { $set: { jobPostCount: findUser.jobPostCount + 1 } }, { new: true });
        if (update) {
          res.status(200).send({ status: 200, message: "Job Create successfully.", data: createdJobService });
        }
      }
    }
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
exports.appliedOnJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id, role: "DRIVER" });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await JobService.findById({ _id: req.params.id });
      if (!jobService) {
        res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
      } else {
        let obj = {
          emplyeerId: jobService.userId,
          jobId: jobService._id,
          driverId: findUser._id,
        }
        const createdJobService = await jobApplicant.create(obj);
        if (createdJobService) {
          let update = await JobService.findByIdAndUpdate({ _id: jobService._id }, { $set: { applicantCount: jobService.applicantCount + 1 } }, { new: true });
          if (update) {
            res.status(200).send({ status: 200, message: "Job Applied successfully.", data: createdJobService });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getAllpendingJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await jobApplicant.find({ $and: [{ $or: [{ emplyeerId: findUser._id }, { driverId: findUser._id, }] }, { status: "Pending" }] }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
      if (jobService.length == 0) {
        res.status(404).send({ status: 404, message: "Pending job service not found.", data: {} });
      } else {
        res.status(200).send({ status: 200, message: "All Pending Job data found successfully.", data: jobService });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
exports.getAllApprovedJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await jobApplicant.find({ $and: [{ $or: [{ emplyeerId: findUser._id }, { driverId: findUser._id, }] }, { status: "Approved" }] }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
      if (jobService.length == 0) {
        res.status(404).send({ status: 404, message: "Approved Job service not found.", data: {} });
      } else {
        res.status(200).send({ status: 200, message: "All Approved Job data found successfully.", data: jobService });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getAllRejectJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await jobApplicant.find({ $and: [{ $or: [{ emplyeerId: findUser._id }, { driverId: findUser._id, }] }, { status: "Reject" }] }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
      if (jobService.length == 0) {
        res.status(404).send({ status: 404, message: "Reject Job service not found.", data: {} });
      } else {
        res.status(200).send({ status: 200, message: "All Reject Job data found successfully.", data: jobService });
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getAllWithdrawJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await jobApplicant.find({ $and: [{ $or: [{ emplyeerId: findUser._id }, { driverId: findUser._id, }] }, { status: "Withdraw" }] }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
      if (jobService.length == 0) {
        res.status(404).send({ status: 404, message: "Withdraw Job service not found.", data: {} });
      } else {
        res.status(200).send({ status: 200, message: "All Withdraw Job data found successfully.", data: jobService });
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobApplicantByjobId = async (req, res) => {
  try {
      const jobService = await jobApplicant.find({ jobId: req.params.jobId }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
      if (jobService.length == 0) {
        res.status(404).send({ status: 404, message: "Job application not found.", data: {} });
      } else {
        res.status(200).send({ status: 200, message: "All Job application data found successfully.", data: jobService });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobApplicantById = async (req, res) => {
  try {
    const jobService = await jobApplicant.findById({ _id: req.params.id }).populate({ path: 'jobId' }).populate({ path: 'emplyeerId driverId', select: 'firstName lastName photoUpload' });
    if (!jobService) {
      res.status(404).send({ status: 404, message: "Job Applicant not found.", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Job Applicant data found successfully.", data: jobService });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};