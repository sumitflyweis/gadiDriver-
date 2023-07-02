const express = require('express');
const help = require('../../controller/AdminController/helpAndSupport');
const authJwt = require("../../middlewares/authJwt");
const router = express.Router();
router.post("/createQuery", authJwt.verifyToken, help.AddQuery);
router.get("/", help.getAllHelpandSupport);
router.get("/:id", help.getAllHelpandSupportgetById);
router.delete("/delete/:id", help.DeleteHelpandSupport);
module.exports = router;