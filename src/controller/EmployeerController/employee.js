var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JobService = require("../../model/Job");
const userSchema = require("../../model/userModel");
const jobApplicant = require("../../model/jobApplicant");
const jobRatingModel = require("../../model/jobRatingModel");
const ratingTopic = require("../../model/ratingTopic");
const JobType = require("../../model/jobType");
const VehicleType = require('../../model/vehicletype');
exports.createJobService = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const findJobType = await JobType.findById(req.body.jobtype);
      if (!findJobType) {
        res.status(404).send({ status: 404, message: "JobType Not found", data: {} });
      }
      const findVehicleType = await VehicleType.findById(req.body.vehicletype);
      if (!findVehicleType) {
        res.status(404).send({ status: 404, message: "VehicleType Not found", data: {} });
      }
      req.body.jobtypeInWord = findJobType.jobType;
      req.body.vehicletypeInWord = findVehicleType.vehicletype;
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
    const jobService = await JobService.find({ userId: req.user._id }).populate("userId jobtype vehicletype language likeUser");;
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
    let query = {};
    if (req.query.search != (null || undefined)) {
      query.$or = [
        { jobtitle: { $regex: req.query.search, $options: 'i' } },
        { gender: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { contactNumber: { $regex: req.query.search, $options: 'i' } },
      ]
    }
    if (req.query.location != (null || undefined)) {
      query.$or = [
        { location: { $regex: req.query.location, $options: 'i' } },
        { address: { $regex: req.query.location, $options: 'i' } },
      ]
    }
    if (req.query.jobtype != (null || undefined)) {
      query.$or = [
        { jobtypeInWord: { $regex: req.query.jobtype, $options: 'i' } },
      ]
    }
    if (req.query.vehicletype != (null || undefined)) {
      query.$or = [
        { vehicletypeInWord: { $regex: req.query.vehicletype, $options: 'i' } },
      ]
    }
    const jobService = await JobService.find(query).populate("userId jobtype vehicletype language likeUser");
    if (jobService.length == 0) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Job Found successfully.", data: jobService });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.getJobServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id).populate("userId jobtype vehicletype language likeUser");
    if (!jobService) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Job Found successfully.", data: jobService });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.salarayAndExpectation = async (req, res) => {
  try {
    const jobService = await JobService.findById({ _id: req.params._id });
    if (!jobService) {
      return res.status(404).json({ status: 404, message: "Job service not found" });
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
      if (updatedJobService) {
        res.status(200).send({ status: 200, message: "Job update successfully.", data: updatedJobService });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.updateJobServices = async (req, res) => {
  try {
    const jobService = await JobService.findById({ _id: req.params._id });
    if (!jobService) {
      return res.status(404).json({ status: 404, message: "Job service not found" });
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
      if (updatedJobService) {
        res.status(200).send({ status: 200, message: "Job update successfully.", data: updatedJobService });
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.updateJobImage = async (req, res) => {
  try {
    const jobService = await JobService.findById({ _id: req.params._id });
    if (!jobService) {
      return res.status(404).json({ status: 404, message: "Job service not found" });
    } else {
      let fileUrl;
      if (req.file) {
        fileUrl = req.file ? req.file.path : "";
      }
      let image = fileUrl;
      const updatedJobService = await JobService.findByIdAndUpdate({ _id: jobService._id }, { $set: { image: image } }, { new: true });
      if (updatedJobService) {
        res.status(200).send({ status: 200, message: "Job update successfully.", data: updatedJobService });
      }
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
exports.approvedRejectApplicantById = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Driver Not found.", status: 404 });
    } else {
      const jobService = await jobApplicant.findById({ _id: req.params.id });
      if (!jobService) {
        res.status(404).send({ status: 404, message: "Job Applicant not found.", data: {} });
      } else {
        if (jobService.emplyeerId == findUser._id) {
          if (req.body.status == "Approved") {
            const updatedJobService = await jobApplicant.findByIdAndUpdate({ _id: jobService._id }, { $set: { status: "Approved" } }, { new: true });
            if (updatedJobService) {
              res.status(200).send({ status: 200, message: "Job application approved successfully.", data: updatedJobService });
            }
          }
          if (req.body.status == "Reject") {
            const updatedJobService = await jobApplicant.findByIdAndUpdate({ _id: jobService._id }, { $set: { status: "Reject" } }, { new: true });
            if (updatedJobService) {
              res.status(200).send({ status: 200, message: "Job application Reject successfully.", data: updatedJobService });
            }
          }
        }
        if (jobService.driverId == findUser._id) {
          if (req.body.status == "Withdraw") {
            const updatedJobService = await jobApplicant.findByIdAndUpdate({ _id: jobService._id }, { $set: { status: "Withdraw" } }, { new: true });
            if (updatedJobService) {
              res.status(200).send({ status: 200, message: "Job application Withdraw successfully.", data: updatedJobService });
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.viewed_count = async (req, res) => {
  try {
    const jobService = await JobService.findById({ _id: req.params.id });
    if (!jobService) {
      res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
    } else {
      const updatedJobService = await JobService.findByIdAndUpdate({ _id: jobService._id }, { $set: { viewed_count: jobService.viewed_count + 1 } }, { new: true });
      if (updatedJobService) {
        res.status(200).send({ status: 200, message: "Job view successfully.", data: updatedJobService });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.addLike = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const post = await JobService.findById({ _id: req.params.id });
      if (!post) {
        res.status(404).send({ status: 404, message: "Job service not found.", data: {} });
      } else {
        if (post.likeUser.includes((findUser._id).toString())) {
          const update = await JobService.findByIdAndUpdate({ _id: post._id }, { $pull: { likeUser: (findUser._id).toString() }, $set: { likeCount: post.likeCount - 1 } }, { new: true });
          if (update) {
            res.status(200).json({ status: 200, message: "Un like successfully", data: update });
          }
        } else {
          const update = await JobService.findByIdAndUpdate({ _id: post._id }, { $push: { likeUser: (findUser._id).toString() }, $set: { likeCount: post.likeCount + 1 } }, { new: true });
          if (update) {
            res.status(200).json({ status: 200, message: "like add successfully", data: update });
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};
exports.giveRatingToJob = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      let findJob = await JobService.findOne({ _id: req.params.id });
      if (findJob) {
        let findRating = await jobRatingModel.findOne({ jobId: findJob._id })
        if (findRating) {
          let findTopic = await ratingTopic.findById({ _id: req.body._id });
          if (findTopic) {
            let obj = {
              userId: findUser._id,
              rating: req.body.rating,
              subject: req.body.subject,
              ratingTopicId: findTopic._id,
              message: req.body.message
            }
            let averageRating = (((findRating.averageRating * findRating.rating.length) + req.body.rating) / (findRating.rating.length + 1));
            let update = await jobRatingModel.findByIdAndUpdate({ _id: findRating._id }, { $push: { rating: obj }, $set: { averageRating: averageRating, totalRating: findRating.rating.length + 1 } }, { new: true });
            if (update) {
              if (findRating.topicId.length == 0) {
                let obj1 = { ratingTopicId: findTopic._id, rating: req.body.rating, totalRating: 1 };
                let updates = await jobRatingModel.findByIdAndUpdate({ _id: findRating._id }, { $push: { topicId: obj1 } }, { new: true });
                if (updates) {
                  return res.status(200).json({ status: 200, message: "Rating given successfully.", data: updates });
                }
              } else {
                for (let i = 0; i < findRating.topicId.length; i++) {
                  if ((findRating.topicId[i].ratingTopicId).toString() == (findTopic._id).toString()) {
                    let averageRating = (((findRating.topicId[i].rating * findRating.topicId[i].totalRating) + req.body.rating) / (findRating.topicId[i].totalRating + 1));
                    let update = await jobRatingModel.findOneAndUpdate({ _id: findRating._id, 'topicId.ratingTopicId': findTopic._id }, { $set: { 'topicId.$.rating': averageRating, 'topicId.$.totalRating': findRating.topicId[i].totalRating + 1 } }, { new: true })
                    if (update) {
                      return res.status(200).json({ status: 200, message: "Rating given successfully.", data: update });
                    }
                  } else {
                    let obj1 = { ratingTopicId: findTopic._id, rating: req.body.rating, totalRating: 1 };
                    let updates = await jobRatingModel.findByIdAndUpdate({ _id: findRating._id }, { $push: { topicId: obj1 } }, { new: true });
                    if (updates) {
                      return res.status(200).json({ status: 200, message: "Rating given successfully.", data: updates });
                    }
                  }
                }
              }
            }
          } else {
            res.status(404).json({ message: "Rating topic Not found.", status: 404 });
          }
        } else {
          let findTopic = await ratingTopic.findById({ _id: req.body._id });
          if (findTopic) {
            let ratings = [], topic = [];
            let obj = { userId: findUser._id, rating: req.body.rating, subject: req.body.subject, ratingTopicId: findTopic._id, message: req.body.message }
            let obj1 = { ratingTopicId: findTopic._id, rating: req.body.rating, totalRating: 1 };
            ratings.push(obj);
            topic.push(obj1);
            let job = {
              jobId: findJob._id,
              topicId: topic,
              rating: ratings,
              averageRating: req.body.rating,
              totalRating: 1,
            }
            let saveRating = await jobRatingModel.create(job);
            if (saveRating) {
              let updates = await JobService.findByIdAndUpdate({ _id: findJob._id }, { $set: { rating: saveRating._id } }, { new: true });
              if (updates) {
                return res.status(200).json({ status: 200, message: "Rating given successfully.", data: saveRating });
              }
            }
          } else {
            res.status(404).json({ message: "Rating topic Not found.", status: 404 });
          }
        }
      } else {
        res.status(404).json({ message: "Job Not found.", status: 404 });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ message: "server error.", data: {}, });
  }
};