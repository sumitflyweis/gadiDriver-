const express = require('express');
const router = express.Router();
const videoController = require('../controller/vedio');

// Create a video
router.post('/', videoController.createVideo);

// Get all videos
router.get('/', videoController.getAllVideos);

// Get video by ID
router.get('/:id', videoController.getVideoById);

// Update video by ID
router.put('/:id', videoController.updateVideoById);

// Delete video by ID
router.delete('/:id', videoController.deleteVideoById);

module.exports = router;
