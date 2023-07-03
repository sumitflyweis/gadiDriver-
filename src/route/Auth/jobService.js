const express = require("express");
const router = express.Router();
const jobServiceController = require("../../controller/EmployeerController/employee");
const authJwt = require('../../middlewares/authJwt')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });

router.post("/createJobService", authJwt.verifyToken, upload.single("file"), jobServiceController.createJobService);
router.get("/getJobServicebyToken", authJwt.verifyToken, jobServiceController.getJobServicebyToken);
router.put("/salarayAndExpectation/:id", authJwt.verifyToken, jobServiceController.salarayAndExpectation)
router.put("/updateJobServices/:id", authJwt.verifyToken, jobServiceController.updateJobServices)
router.put("/updateJobImage/:id", authJwt.verifyToken, upload.single("file"), jobServiceController.updateJobImage);
router.get("/", jobServiceController.getJobService);
router.get("/:id", jobServiceController.getJobServiceById);
router.post("/applied/:id",authJwt.verifyToken, jobServiceController.appliedOnJob);
router.get("/job/getAllpendingJob", authJwt.verifyToken, jobServiceController.getAllpendingJob)
router.get("/job/getAllApprovedJob", authJwt.verifyToken, jobServiceController.getAllApprovedJob)
router.get("/job/getAllRejectJob", authJwt.verifyToken, jobServiceController.getAllRejectJob)
router.get("/job/getAllWithdrawJob", authJwt.verifyToken, jobServiceController.getAllWithdrawJob)
router.get("/job/:jobId", jobServiceController.getJobApplicantByjobId);
router.get("/jobApplicatnatbyId/:id", jobServiceController.getJobApplicantById);
router.put("/jobApplicatnatbyId/:id",authJwt.verifyToken, jobServiceController.approvedRejectApplicantById);
router.get("/viewed_count/:id", jobServiceController.viewed_count);
router.post('/like/:id',authJwt.verifyToken, jobServiceController.addLike);
router.post('/job/giverating/:id',authJwt.verifyToken, jobServiceController.giveRatingToJob);
module.exports = router;
