const Petrol = require("../model/rateOfpetrolRate");

exports.createPetrolRate = async (req, res) => {
  try {
    const { name, rate } = req.body;
    const newPetrolRate = new Petrol({ name, rate });
    const savedPetrolRate = await newPetrolRate.save();
    res.status(200).json(savedPetrolRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPetrolRate = async (req, res) => {
  try {
    const petrolRates = await Petrol.find();
    res.status(200).json({msg:petrolRates});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getPetrolRatebyid = async (req, res) => {
    try {
        const id = req.params.id
      const petrolRates = await Petrol.findById(id);
      res.status(200).json({msg:petrolRates});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.updatePetrolRate = async (req, res) => {
  try {
    const { name, rate } = req.body;
    const updatedPetrolRate = await Petrol.findByIdAndUpdate(
      req.params.id,
      { name, rate },
      { new: true }
    );
    res.status(200).json(updatedPetrolRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePetrolRate = async (req, res) => {
  try {
    await Petrol.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Petrol rate deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
