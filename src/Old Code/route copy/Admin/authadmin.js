const express = require("express");
const router = express.Router();
const UserController = require("../../controller/AdminController/authadmin");

// create a user
router.post("/", UserController.createUser);

// get all users
router.get("/", UserController.getAllUsers);

// get a user by ID
router.get("/:userId", UserController.getUserById);

// update a user by ID
router.put("/:id", UserController.updateUserById);

router.put("/updatepaswwordd/:id", UserController.updatepaswwordd)

// delete a user by ID
router.delete("/:userId", UserController.deleteUserById);


router.post("/login", UserController.login);
router.post("/resetpassword", UserController.resetpassword)
router.post("/forgetpassword", UserController.forgetpassword)
router.post("/verifyadminotp", UserController.verifyadminotp)


module.exports = router;
