const express = require('express');
const router = express.Router();

const vehicleTypeController = require('../controller/vehicletype');


router.post("/", vehicleTypeController.createVehicleType);

// GET all vehicle types
router.get('/', vehicleTypeController.getAllVehicleTypes);

// GET vehicle type by ID
router.get('/:id', vehicleTypeController.getVehicleTypeById);

// UPDATE vehicle type by ID
router.put('/:id', vehicleTypeController.updateVehicleType);

// DELETE vehicle type by ID
router.delete('/:id', vehicleTypeController.deleteVehicleType);

module.exports = router
