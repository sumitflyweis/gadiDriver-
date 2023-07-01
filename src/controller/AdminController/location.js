const Location = require("../../model/location");

exports.getLocation = async (req, res) => {
  try {
    const locations = await Location.find();
    if (locations.length == 0) {
      res.status(404).send({ status: 404, message: "Location Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Location found successfully.", data: locations });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createLocation = async (req, res) => {
  try {
    let findLocation = await Location.findOne({ location: req.body.location });
    if (findLocation) {
      res.status(409).send({ status: 409, message: "Location Already exit", data: {} });
    } else {
      const newLocation = await Location.create(req.body);
      res.status(200).send({ status: 200, message: "Location Create successfully.", data: newLocation });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      res.status(404).send({ status: 404, message: "Location Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Location found successfully.", data: location });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      res.status(404).send({ status: 404, message: "Location Not found", data: {} });
    } else {
      let obj = {
        location: req.body.location || location.location
      }
      const updatedLocation = await Location.findByIdAndUpdate(location._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Location Update successfully.", data: updatedLocation });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      res.status(404).send({ status: 404, message: "Location Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Location deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
