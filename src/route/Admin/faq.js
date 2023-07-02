const express = require('express');
const router = express.Router();
const helpController = require('../../controller/AdminController/faq');

// GET all help data
router.get('/', helpController.getAllFaqs);

// POST create new help data
router.post('/', helpController.createFaq);

// PUT update help data by ID
router.get('/:id', helpController.getFaqById);
router.put('/:id', helpController.updateFaq);

// DELETE delete help data by ID
router.delete('/:id', helpController.deleteFaq);

module.exports = router;
