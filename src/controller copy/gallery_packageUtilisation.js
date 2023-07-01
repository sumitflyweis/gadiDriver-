const PackgeUtilisation = require('../model/gallery_packageUtilisation');

exports.createPackgeUtilisation = async (req, res) => {
  try {
    const { subscriptionId, membership, jobposting, featuredjob, refreshjob, jobDisplayedfor, jobserviceId } = req.body;
    const packgeUtilisation = new PackgeUtilisation({ subscriptionId, membership, jobposting, featuredjob, refreshjob, jobDisplayedfor, jobserviceId });
    await packgeUtilisation.save();
    res.status(201).json(packgeUtilisation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating packge utilisation' });
  }
};


exports.getPackgeUtilisations = async (req, res) => {
  try {
    const packgeUtilisations = await PackgeUtilisation.find().populate("subscriptionId jobserviceId")
    res.status(200).json({msg:packgeUtilisations});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving packge utilisations' });
  }
};

exports.getPackgeUtilisationById = async (req, res) => {
  try {
    const { id } = req.params;
    const packgeUtilisation = await PackgeUtilisation.findById(id).populate("subscriptionId jobserviceId")
    if (!packgeUtilisation) {
      return res.status(404).json({ error: 'Packge utilisation not found' });
    }
    res.status(200).json({msg:packgeUtilisation});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving packge utilisation' });
  }
};

exports.updatePackgeUtilisation = async (req, res) => {
  try {
    const { id } = req.params;
    const { subscriptionId, membership, jobposting, featuredjob, refreshjob, jobDisplayedfor, jobserviceId } = req.body;
    const packgeUtilisation = await PackgeUtilisation.findByIdAndUpdate(
      id,
      { subscriptionId, membership, jobposting, featuredjob, refreshjob, jobDisplayedfor, jobserviceId },
      { new: true }
    );
    if (!packgeUtilisation) {
      return res.status(404).json({ error: 'Packge utilisation not found' });
    }
    res.status(200).json(packgeUtilisation);
  } catch (error) {
    res.status(500).json({ error: 'Error updating packge utilisation' });
  }
};

exports.deletePackgeUtilisation = async (req, res) => {
  try {
    const { id } = req.params;
    const packgeUtilisation = await PackgeUtilisation.findByIdAndDelete(id);
    if (!packgeUtilisation) {
      return res.status(404).json({ error: 'Packge utilisation not found' });
    }
    res.status(200).json({ message: 'Packge utilisation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting packge utilisation' });
  }
};

