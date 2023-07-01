const express = require('express');
const router = express.Router();
const packgeUtilisationController = require('../controller/gallery_packageUtilisation');

// Route for creating a new packge utilisation
router.post('/', packgeUtilisationController.createPackgeUtilisation);

// Route for retrieving all packge utilisations
router.get('/', packgeUtilisationController.getPackgeUtilisations);

// Route for retrieving a specific packge utilisation by ID
router.get('/:id', packgeUtilisationController.getPackgeUtilisationById);

// Route for updating a specific packge utilisation by ID
router.put('/:id', packgeUtilisationController.updatePackgeUtilisation);

// Route for deleting a specific packge utilisation by ID
router.delete('/:id', packgeUtilisationController.deletePackgeUtilisation);

module.exports = router;
