const express = require("express");
const router = express.Router();
const jobTypeController = require("../controller/jobType");

router.get("/", jobTypeController.getJobType);
router.post("/", jobTypeController.createJobType);
router.get("/:id", jobTypeController.getJobTypeById);
router.put("/:id", jobTypeController.updateJobType);
router.delete("/:id", jobTypeController.deleteJobType);
module.exports = router;