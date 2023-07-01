const express = require("express");
const router = express.Router();
const locationController = require("../../controller/AdminController/location");

// Route to get all locations
router.get("/", locationController.getLocation);

// Route to create a new location
router.post("/", locationController.createLocation);


router.get("/:id", locationController.getLocationById);

// Update location
router.put("/:id", locationController.updateLocation);

// Delete location
router.delete("/:id", locationController.deleteLocation);

module.exports = router;


// Export the router
module.exports = router;
