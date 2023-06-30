const JobType = require("../model/jobType");

exports.getJobType = async (req, res) => {
  try {
    const newJobType = await JobType.find();
    res.json(newJobType);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createJobType = async (req, res) => {
  try {
    const newJobType = await JobType.create(req.body);
    res.status(201).json(newJobType);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getJobTypeById = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res.status(404).json({ error: "JobType not found" });
    }
    res.json(jobType);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateJobType = async (req, res) => {
  try {
    const updatedJobType = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJobType) {
      return res.status(404).json({ error: "JobType not found" });
    }
    res.json(updatedJobType);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteJobType = async (req, res) => {
  try {
    const deletedJobType = await JobType.findByIdAndDelete(req.params.id);
    if (!deletedJobType) {
      return res.status(404).json({ error: "JobType not found" });
    }
    res.json({ message: "JobType deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



