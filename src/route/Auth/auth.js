const express = require('express');
const customerRouter = express.Router();
const auth = require('../../controller/Auth');
const authJwt = require('../../middlewares/authJwt')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]);
customerRouter.post('/login', auth.login);
customerRouter.post('/verify/:id', auth.verify)
customerRouter.get('/getProfile', authJwt.verifyToken, auth.getProfile)
customerRouter.put('/createDriver', authJwt.verifyToken, auth.createDriver)
customerRouter.put('/updateExperience', authJwt.verifyToken, auth.updateExperience)
customerRouter.put('/updateDocument', authJwt.verifyToken, cpUpload, auth.updateDocument)
customerRouter.post("/addharotp", authJwt.verifyToken, auth.addharotp);
customerRouter.post("/verifyadminotp", authJwt.verifyToken, auth.verifyaddharotp)
customerRouter.put('/userUpdateprofile', authJwt.verifyToken, upload.single("image"), auth.userUpdateprofile)
customerRouter.put("/updateCompanyType", authJwt.verifyToken, auth.updateCompanyType);
customerRouter.put("/updateEmployeeDetails", authJwt.verifyToken, auth.updateEmployeeDetails);
customerRouter.post('/followUnFollow/:id', authJwt.verifyToken, auth.followUnFollow);
customerRouter.post('/giveRating/:id', authJwt.verifyToken, auth.giveRating);
customerRouter.post("/CreatePayment/:subscriptionId", authJwt.verifyToken, auth.CreatePayment);
customerRouter.post("/verifyPayment/:subscriptionId", authJwt.verifyToken, auth.verifyPayment);
customerRouter.get("/GetPaymentsByUser", authJwt.verifyToken, auth.GetPaymentsByUser);
customerRouter.get("/GetAllPayments", auth.GetAllPayments);
customerRouter.post("/addMoney", authJwt.verifyToken, auth.addMoney);
customerRouter.post("/removeMoney", authJwt.verifyToken, auth.removeMoney);

module.exports = customerRouter;