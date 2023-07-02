const EmployerAction = require("../model/employerAction");

exports.getEmployerAction = async (req, res) => {
  try {
    const employerAction = await EmployerAction.find()
      .populate("jobServiceId")
      .populate("driverId");

    if (!employerAction) {
      return res.status(404).json({ error: "Employer action not found" });
    }

    res.status(200).json({ employerAction });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.createEmployerAction = async (req, res) => {
  try {
    const { jobServiceId, driverId, Action } = req.body;

    const employerAction = new EmployerAction({
      jobServiceId,
      driverId,
      Action
    });

    const savedEmployerAction = await employerAction.save();

    res.status(201).json({ employerAction: savedEmployerAction });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getEmployerActionById = async (req, res) => {
  try {
    const { id } = req.params;

    const employerAction = await EmployerAction.findById(id)
      .populate("jobServiceId")
      .populate("driverId");

    if (!employerAction) {
      return res.status(404).json({ error: "Employer action not found" });
    }

    res.status(200).json({ employerAction });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.updateEmployerAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobServiceId, driverId, Action } = req.body;

    const updatedEmployerAction = await EmployerAction.findByIdAndUpdate(
      id,
      { jobServiceId, driverId, Action },
      { new: true }
    );

    if (!updatedEmployerAction) {
      return res.status(404).json({ error: "Employer action not found" });
    }

    res.status(200).json({ employerAction: updatedEmployerAction });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteEmployerAction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployerAction = await EmployerAction.findByIdAndDelete(id);

    if (!deletedEmployerAction) {
      return res.status(404).json({ error: "Employer action not found" });
    }

    res.status(200).json({ message: "Employer action deleted successfully" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




