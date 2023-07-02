const express = require("express");
const router = express.Router();
const UserController = require("../../controller/AdminController/authadmin");
const authJwt = require('../../middlewares/authJwt')

router.post("/l", UserController.createUser);
router.post("/", UserController.login);
router.get("/Users", authJwt.verifyToken,UserController.getAllUsers);
router.get("/Driver", authJwt.verifyToken,UserController.getAllDrivers);
router.get("/:userId", UserController.getUserById);
router.put("/updateProfile", authJwt.verifyToken,UserController.updateUser);
router.delete("/:userId", UserController.deleteUserById);
router.post("/resetpassword", UserController.resetpassword)
router.post("/forgetpassword", UserController.forgetpassword)
router.post("/verifyadminotp", UserController.verifyadminotp)


module.exports = router;
