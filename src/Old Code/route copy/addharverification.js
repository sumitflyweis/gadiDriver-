const express = require("express");
const router = express.Router();
const UserController = require("../controller/aadhar");

// create a user
router.post("/", UserController.addharotp);

router.post("/verifyadminotp", UserController.verifyadminotp)


module.exports = router;
