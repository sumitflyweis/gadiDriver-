const Help = require('../model/helpAndSupport');

exports.getHelp = async (req, res) => {
  try {
    const help = await Help.find();
    res.status(200).json({msg:help});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving help data' });
  }
};

exports.createHelp = async (req, res) => {
  try {
    const { topic, desc } = req.body;
    const help = await Help.create({ topic, desc });
    res.status(201).json(help);
  } catch (error) {
    res.status(500).json({ error: 'Error creating help data' });
  }
};

exports.updateHelp = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, desc } = req.body;
    const help = await Help.findByIdAndUpdate(id, { topic, desc }, { new: true });
    res.status(200).json(help);
  } catch (error) {
    res.status(500).json({ error: 'Error updating help data' });
  }
};

exports.deleteHelp = async (req, res) => {
  try {
    const { id } = req.params;
    await Help.findByIdAndDelete(id);
    res.status(200).json({ message: 'Help data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting help data' });
  }
};
