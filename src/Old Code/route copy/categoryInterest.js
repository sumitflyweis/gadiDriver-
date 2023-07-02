const express = require("express");
const router = express.Router();
const categoryInterestController = require("../controller/categoryInterest");

// Create a new category interest
router.post("/", categoryInterestController.createCategoryInterest);

// Get all category interests
router.get("/", categoryInterestController.getAllCategoryInterests);

// Get a category interest by ID
router.get("/:id", categoryInterestController.getCategoryInterestById);

// Update a category interest by ID
router.put("/:id", categoryInterestController.updateCategoryInterest);

// Delete a category interest by ID
router.delete("/:id", categoryInterestController.deleteCategoryInterest);

module.exports = router;
