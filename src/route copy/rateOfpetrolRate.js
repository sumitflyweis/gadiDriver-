const express = require("express");
const router = express.Router();
const petrolController = require("../controller/rateOfPetrolRate");

// Create a new petrol rate
router.post("/", petrolController.createPetrolRate);

// Get all petrol rates
router.get("/", petrolController.getPetrolRate);

router.get("/:id", petrolController.getPetrolRatebyid);

// Update a specific petrol rate
router.put("/:id", petrolController.updatePetrolRate);

// Delete a specific petrol rate
router.delete("/:id", petrolController.deletePetrolRate);

module.exports = router;
