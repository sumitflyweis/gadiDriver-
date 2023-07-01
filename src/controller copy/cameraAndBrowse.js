const CameraBrowse = require('../model/cameraAndBrowse');

// Create a new cameraBrowse entry
exports.createCameraBrowse = async (req, res) => {
  try {
    const { camera, browse } = req.body;

    const cameraBrowse = new CameraBrowse({ camera, browse });

    const savedCameraBrowse = await cameraBrowse.save();

    res.status(201).json(savedCameraBrowse);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the cameraBrowse entry.' });
  }
};

// Retrieve all cameraBrowse entries
exports.getAllCameraBrowse = async (req, res) => {
  try {
    const cameraBrowseEntries = await CameraBrowse.find();

    res.status(200).json(cameraBrowseEntries);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving cameraBrowse entries.' });
  }
};

// Retrieve a specific cameraBrowse entry by ID
exports.getCameraBrowseById = async (req, res) => {
  try {
    const cameraBrowseEntry = await CameraBrowse.findById(req.params.id);

    if (!cameraBrowseEntry) {
      return res.status(404).json({ error: 'CameraBrowse entry not found.' });
    }

    res.status(200).json(cameraBrowseEntry);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the cameraBrowse entry.' });
  }
};

// Delete a specific cameraBrowse entry by ID
exports.deleteCameraBrowseById = async (req, res) => {
  try {
    const cameraBrowseEntry = await CameraBrowse.findByIdAndDelete(req.params.id);

    if (!cameraBrowseEntry) {
      return res.status(404).json({ error: 'CameraBrowse entry not found.' });
    }

    res.status(200).json({ message: 'CameraBrowse entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the cameraBrowse entry.' });
  }
};

