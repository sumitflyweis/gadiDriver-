const express = require("express");
const router = express.Router();
const locationController = require("../../controller/AdminController/location");
router.get("/", locationController.getLocation);
router.post("/", locationController.createLocation);
router.get("/:id", locationController.getLocationById);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);
module.exports = router;