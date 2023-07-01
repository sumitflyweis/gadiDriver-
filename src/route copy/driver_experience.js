const express = require('express');
const router = express.Router();

const driverExperienceController = require('../controller/driver_experience');

// POST create a new driver experience
router.post('/', driverExperienceController.createDriverExperience);

// GET all driver experiences
router.get('/', driverExperienceController.getAllDriverExperiences);

// GET driver experience by ID
router.get('/:id', driverExperienceController.getDriverExperienceById);

// PUT update driver experience by ID
router.put('/:id', driverExperienceController.updateDriverExperience);

// DELETE delete driver experience by ID
router.delete('/:id', driverExperienceController.deleteDriverExperience);

module.exports = router;
