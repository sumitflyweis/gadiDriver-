const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../../controller/AdminController/vehicletype');
router.post("/", vehicleTypeController.createVehicleType);
router.get('/', vehicleTypeController.getAllVehicleTypes);
router.get('/:id', vehicleTypeController.getVehicleTypeById);
router.put('/:id', vehicleTypeController.updateVehicleType);
router.delete('/:id', vehicleTypeController.deleteVehicleType);
module.exports = router
