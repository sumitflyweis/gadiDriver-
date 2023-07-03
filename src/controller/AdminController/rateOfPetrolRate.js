const Petrol = require("../../model/rateOfpetrolRate");

exports.getPetrolRate = async (req, res) => {
  try {
    const petrols = await Petrol.find();
    if (petrols.length == 0) {
      res.status(404).send({ status: 404, message: "Petrol Rate Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Petrol Rate found successfully.", data: petrols });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createPetrolRate = async (req, res) => {
  try {
    const { name, rate } = req.body;
    const newPetrolRate = await Petrol.create({ name, rate });
    res.status(200).send({ status: 200, message: "Petrol Rate Create successfully.", data: newPetrolRate });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getPetrolRatebyid = async (req, res) => {
  try {
    const PetrolRate = await Petrol.findById(req.params.id);
    if (!PetrolRate) {
      res.status(404).send({ status: 404, message: "Petrol Rate Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Petrol Rate found successfully.", data: PetrolRate });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updatePetrolRate = async (req, res) => {
  try {
    const PetrolRate = await Petrol.findById(req.params.id);
    if (!PetrolRate) {
      res.status(404).send({ status: 404, message: "Petrol Rate Not found", data: {} });
    } else {
      let obj = {
        name: req.body.name || PetrolRate.name,
        rate: req.body.rate || PetrolRate.rate
      }
      const updatedPetrolRate = await Petrol.findByIdAndUpdate(PetrolRate._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Petrol Rate Update successfully.", data: updatedPetrolRate });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deletePetrolRate = async (req, res) => {
  try {
    const deletedPetrolRate = await Petrol.findByIdAndDelete(req.params.id);
    if (!deletedPetrolRate) {
      res.status(404).send({ status: 404, message: "Petrol Rate Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Petrol Rate deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
