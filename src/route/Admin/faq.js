const express = require('express');
const router = express.Router();
const helpController = require('../../controller/AdminController/faq');

// GET all help data
router.get('/', helpController.getHelp);

// POST create new help data
router.post('/', helpController.createHelp);

// PUT update help data by ID
router.put('/:id', helpController.updateHelp);

// DELETE delete help data by ID
router.delete('/:id', helpController.deleteHelp);

module.exports = router;
