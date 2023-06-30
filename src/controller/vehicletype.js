const VehicleType = require('../model/vehicletype');
exports.createVehicleType = async (req, res) => {
  try {
    const { vehicletype } = req.body;
    const newVehicleType = new VehicleType({ vehicletype });
    const savedVehicleType = await newVehicleType.save();
    res.status(201).json(savedVehicleType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the vehicle type.' });
  }
};
exports.getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.find();
    res.json(vehicleTypes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the vehicle types' });
  }
};
exports.getVehicleTypeById = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    if (!vehicleType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }
    res.json(vehicleType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the vehicle type' });
  }
};
exports.updateVehicleType = async (req, res) => {
  try {
    const updatedVehicleType = await VehicleType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicleType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }
    res.json(updatedVehicleType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the vehicle type' });
  }
};
exports.deleteVehicleType = async (req, res) => {
  try {
    const deletedVehicleType = await VehicleType.findByIdAndRemove(req.params.id);
    if (!deletedVehicleType) {
      return res.status(404).json({ error: 'Vehicle type not found' });
    }
    res.json({ message: 'Vehicle type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the vehicle type' });
  }
};

