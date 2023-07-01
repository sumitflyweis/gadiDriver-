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
module.exports = router;
