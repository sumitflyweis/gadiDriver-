const JobType = require("../../model/jobType");
exports.getJobType = async (req, res) => {
  try {
    const JobTypes = await JobType.find();
    if (JobTypes.length == 0) {
      res.status(404).send({ status: 404, message: "JobType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "JobType found successfully.", data: JobTypes });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createJobType = async (req, res) => {
  try {
    let findJobType = await JobType.findOne({ jobType: req.body.jobType });
    if (findJobType) {
      res.status(409).send({ status: 409, message: "JobType Already exit", data: {} });
    } else {
      const newJobType = await JobType.create(req.body);
      res.status(200).send({ status: 200, message: "JobType Create successfully.", data: newJobType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getJobTypeById = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!JobType) {
      res.status(404).send({ status: 404, message: "JobType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "JobType found successfully.", data: jobType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateJobType = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!JobType) {
      res.status(404).send({ status: 404, message: "JobType Not found", data: {} });
    } else {
      let obj = {
        jobType: req.body.jobType || jobType.jobType
      }
      const updatedJobType = await JobType.findByIdAndUpdate(location._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "JobType Update successfully.", data: updatedJobType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteJobType = async (req, res) => {
  try {
    const deletedJobType = await JobType.findByIdAndDelete(req.params.id);
    if (!deletedJobType) {
      res.status(404).send({ status: 404, message: "JobType Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "JobType deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
