const express = require('express');
const router = express.Router();
const cameraBrowseController = require('../controller/cameraAndBrowse');

// Create a new cameraBrowse entry
router.post('/', cameraBrowseController.createCameraBrowse);

// Get all cameraBrowse entries
router.get('/', cameraBrowseController.getAllCameraBrowse);

// Get a specific cameraBrowse entry by ID
router.get('/:id', cameraBrowseController.getCameraBrowseById);

// Delete a specific cameraBrowse entry by ID
router.delete('/:id', cameraBrowseController.deleteCameraBrowseById);

module.exports = router;
