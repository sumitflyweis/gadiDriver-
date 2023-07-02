const Employer = require("../model/employer");

exports.createEmployer = async (req, res) => {
  try {
    const { employer } = req.body;
    const createdEmployer = await Employer.create({ employer });
    res.status(201).json({msg:createdEmployer});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await Employer.findById(id);

    if (!employer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    res.status(200).json({msg:employer});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployer = await Employer.findByIdAndDelete(id);

    if (!deletedEmployer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json({msg:employers});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { employer } = req.body;
    const updatedEmployer = await Employer.findByIdAndUpdate(
      id,
      { employer },
      { new: true }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    res.status(200).json({msg:updatedEmployer});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
