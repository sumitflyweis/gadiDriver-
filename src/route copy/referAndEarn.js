const express = require('express');
const router = express.Router();
const referralController = require('../controller/referAndEarn');

// POST create a new referral
router.post('/', referralController.createReferral);

// GET all referrals
router.get('/', referralController.getReferrals);

// GET a referral by ID
router.get('/:id', referralController.getReferralById);

// DELETE a referral by ID
router.delete('/:id', referralController.deleteReferral);

module.exports = router;
