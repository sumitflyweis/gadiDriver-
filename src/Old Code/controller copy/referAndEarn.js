const Referral = require('../model/referAndEarn');

exports.createReferral = async (req, res) => {
  try {
    const { referralCode, referredUserId } = req.body;
    const referral = await Referral.create({ referralCode:referralCode, referredUser: referredUserId });
    res.status(201).json({msg:referral});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating referral' });
  }
};

exports.getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().populate('referredUser');
    res.status(200).json({msg:referrals});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error retrieving referrals' });
  }
};

exports.getReferralById = async (req, res) => {
  try {
    const { id } = req.params;
    const referral = await Referral.findById(id).populate('referredUser');
    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    res.status(200).json({msg:referral});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error retrieving referral' });
  }
};

exports.deleteReferral = async (req, res) => {
  try {
    const { id } = req.params;
    await Referral.findByIdAndDelete(id);
    res.status(200).json({ message: 'Referral deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting referral' });
  }
};
