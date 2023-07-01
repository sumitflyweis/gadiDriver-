const express = require("express");
const router = express.Router();
const employerController = require("../controller/employer");

// Create an employer
router.post("/", employerController.createEmployer);

// Get all employers
router.get("/", employerController.getAllEmployers);

// Get an employer by ID
router.get("/:id", employerController.getEmployerById);

// Update an employer by ID
router.put("/:id", employerController.updateEmployerById);

// Delete an employer by ID
router.delete("/:id", employerController.deleteEmployerById);

module.exports = router;
