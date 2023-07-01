const VehicleType = require('../../model/vehicletype');

exports.getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.find();
    if (vehicleTypes.length == 0) {
      res.status(404).send({ status: 404, message: "VehicleType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "VehicleType found successfully.", data: vehicleTypes });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createVehicleType = async (req, res) => {
  try {
    let findVehicleType = await VehicleType.findOne({ vehicletype: req.body.vehicletype });
    if (findVehicleType) {
      res.status(409).send({ status: 409, message: "VehicleType Already exit", data: {} });
    } else {
      const newVehicleType = await VehicleType.create(req.body);
      res.status(200).send({ status: 200, message: "VehicleType Create successfully.", data: newVehicleType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getVehicleTypeById = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    if (!vehicleType) {
      res.status(404).send({ status: 404, message: "VehicleType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "VehicleType found successfully.", data: vehicleType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    if (!vehicleType) {
      res.status(404).send({ status: 404, message: "VehicleType Not found", data: {} });
    } else {
      let obj = {
        vehicletype: req.body.vehicletype || vehicleType.vehicletype
      }
      const updatedVehicleType = await VehicleType.findByIdAndUpdate(vehicleType._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "VehicleType Update successfully.", data: updatedVehicleType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteVehicleType = async (req, res) => {
  try {
    const deletedVehicleType = await VehicleType.findByIdAndDelete(req.params.id);
    if (!deletedVehicleType) {
      res.status(404).send({ status: 404, message: "VehicleType Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "VehicleType deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
