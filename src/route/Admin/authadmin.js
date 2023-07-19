const express = require("express");
const router = express.Router();
const UserController = require("../../controller/AdminController/authadmin");
const notificationController = require("../../controller/AdminController/notification");
const authJwt = require('../../middlewares/authJwt')

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/Users", authJwt.verifyToken, UserController.getAllUsers);
router.get("/Driver", authJwt.verifyToken, UserController.getAllDrivers);
router.get("/getAllsubAdmins", authJwt.verifyToken, UserController.getAllsubAdmins);
router.get("/:userId", UserController.getUserById);
router.put("/updateProfile", authJwt.verifyToken, UserController.updateUser);
router.delete("/:userId", UserController.deleteUserById);
router.post("/resetpassword", UserController.resetpassword)
router.post("/forgetpassword", UserController.forgetpassword)
router.post("/verifyadminotp", UserController.verifyadminotp)
router.post("/notification/sendNotification", authJwt.verifyToken, notificationController.sendNotification);
router.get("/notification/allNotification", authJwt.verifyToken, notificationController.allNotification);
router.put("/changePassword", authJwt.verifyToken, UserController.changePassword);
router.post("/addsubAdmin", authJwt.verifyToken, UserController.addsubAdmin);
router.put("/editsubAdmin/:id", authJwt.verifyToken, UserController.editsubAdmin);
router.post("/addEmployee", authJwt.verifyToken, UserController.addEmployee);

module.exports = router;
