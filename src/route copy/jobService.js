const express = require("express");
const router = express.Router();
const jobServiceController = require("../controller/jobService");

// Create a job service
router.post("/", jobServiceController.createJobService);


router.get("/", jobServiceController.getJobService);
// Get a job service by ID
router.get("/:id", jobServiceController.getJobServiceById);

router.get("/job1/query", jobServiceController.jobservicesusingQuery);

// Update a job service by ID
router.put("/:id", jobServiceController.updateJobServiceById);

router.put("/updatepassword/:id", jobServiceController.updatepassword)

router.put("/updatesubcription/:id", jobServiceController.updatesubcription)


router.post("/viewed_count/:id", jobServiceController.viewed_count)



router.put("/resetpassword/:id", jobServiceController.resetpassword)

router.put("/upadte2/:id", jobServiceController.updateJobServiceSalary)


router.put("/upadte3/:id", jobServiceController.updateJobServices3)

router.put("/upadte4/:id", jobServiceController.updateJobServices4)

// Delete a job service by ID
router.delete("/:id", jobServiceController.deleteJobServiceById);

module.exports = router;
