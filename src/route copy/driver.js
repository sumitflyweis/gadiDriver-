const express = require('express');
const router = express.Router();

const driverController = require('../controller/driver');



router.post('/post', driverController.createDriver);



router.get('/', driverController.getallDriver)

router.get('/:id', driverController.getDriverById);

router.get('/driver/viewed/',driverController.getAllwhoviewed)

// GET driver by ID
router.get('/findEmployerAction/driver', driverController.findEmployerAction);

// GET all drivers
// router.get('/', driverController.getAllDrivers);

// UPDATE driver by ID
router.put('/:id', driverController.updateDriver);

router.put('/employerAction/:jobServicesId', driverController.employerAction);

router.put('/updateExperience1/:id', driverController.updateExperience1)

router.put('/updateExperience2/:id', driverController.updateExperience2)



router.put('/updateByJobService/:id', driverController.updateByJobService)


router.put('/matchAadhaarCardPhoto/:id', driverController.matchAadhaarCardPhoto)

router.delete('/deleteDriverById/:id', driverController.deleteDriverById);

module.exports = router;
