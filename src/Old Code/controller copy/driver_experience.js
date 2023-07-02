// const { start_time, end_time } = req.body;

// //const timeString = "18:47"; // example time string in "HH:mm" format
// const currentDate = new Date(); // current date object

// // Get the current date in yyyy-MM-dd format
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, "0");
// const day = String(currentDate.getDate()).padStart(2, "0");
// const dateString = `${year}-${month}-${day}`;

// // Combine the date and time string
// const dateTimeString1 = `${dateString}T${start_time}`;
// const dateTimeString2 = `${dateString}T${end_time}`;

// console.log(dateTimeString1 , dateTimeString2); // Output: "2023-04-25T18:47:00.000Z"

// //const dateTimeString = "2023-04-25T18:47"; // example date-time string without seconds
// const dateTimeParts1 = start_time.split("T");
// const dateTimeParts2 = end_time.split("T"); // split the date-time string at "T" to get date and time separately
// const timeString1 = dateTimeParts1[1]; // extract the time part from the splitted array
// const timeString2 = dateTimeParts2[1];

// console.log(timeString1,timeString2); // Output: "18:47"

const DriverExperience = require("../model/driver_experience");

exports.createDriverExperience = async (req, res) => {
  try {
    const {
      authid,
      driverId,
      companyName,
      jobTitle,
      vehicletype,
      starttime,
      endtime,
      Status,
    } = req.body;

    //const timeString = "18:47"; // example time string in "HH:mm" format
    const currentDate = new Date(); // current date object

    // Get the current date in yyyy-MM-dd format
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    // Combine the date and time string
    const dateTimeString1 = `${dateString}T${starttime}`;
    const dateTimeString2 = `${dateString}T${endtime}`;

    console.log(dateTimeString1, dateTimeString2); // Output: "2023-04-25T18:47:00.000Z"

    const newDriverExperience = new DriverExperience({
      authid,
      driverId,
      companyName,
      jobTitle,
      vehicletype,
      starttime: dateTimeString1,
      endtime: dateTimeString2,
      Status,
    });

    const savedDriverExperience = await newDriverExperience.save();

    res.status(201).json(savedDriverExperience);
  } catch (error) {
    console.error("Error creating driver experience:", error);
    res.status(500).json({
      error: "An error occurred while creating the driver experience",
    });
  }
};

// Retrieve all driver experiences
exports.getAllDriverExperiences = async (req, res) => {
  try {
    const driverExperiences = await DriverExperience.find()
      .populate(["authid"])
      .populate(["vehicletype"])
      .populate(["driverId"]);
    res.json(driverExperiences);
  } catch (error) {
    console.error("Error fetching driver experiences:", error);
    res.status(500).json({
      error: "An error occurred while fetching the driver experiences",
    });
  }
};

// Retrieve driver experience by ID
exports.getDriverExperienceById = async (req, res) => {
  try {
    const driverExperience = await DriverExperience.findById(req.params.id)
      .populate(["authid"])
      .populate(["vehicletype"])
      .populate(["driverId"]);

    if (!driverExperience) {
      return res.status(404).json({ error: "Driver experience not found" });
    }

    res.json(driverExperience);
  } catch (error) {
    console.error("Error fetching driver experience:", error);
    res.status(500).json({
      error: "An error occurred while fetching the driver experience",
    });
  }
};

// Update driver experience by ID
exports.updateDriverExperience = async (req, res) => {
  try {
    //const timeString = "18:47"; // example time string in "HH:mm" format
    const {
      authid,
      driverId,
      companyName,
      jobTitle,
      vehicletype,
      starttime,
      endtime,
      Status,
    } = req.body;

    const currentDate = new Date(); // current date object

    // Get the current date in yyyy-MM-dd format
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    // Combine the date and time string
    const dateTimeString1 = `${dateString}T${starttime}`;
    const dateTimeString2 = `${dateString}T${endtime}`;

    console.log(dateTimeString1, dateTimeString2); // Output: "2023-04-25T18:47:00.000Z"

    const updatedDriverExperience = await DriverExperience.findByIdAndUpdate(
      req.params.id,
      {
        authid,
        driverId,
        companyName,
        jobTitle,
        vehicletype,
        starttime: dateTimeString1,
        endtime: dateTimeString2,
        Status,
      },
      { new: true }
    );

    if (!updatedDriverExperience) {
      return res.status(404).json({ error: "Driver experience not found" });
    }

    res.json(updatedDriverExperience);
  } catch (error) {
    console.error("Error updating driver experience:", error);
    res.status(500).json({
      error: "An error occurred while updating the driver experience",
    });
  }
};

// Delete driver experience by ID
exports.deleteDriverExperience = async (req, res) => {
  try {
    const deletedDriverExperience = await DriverExperience.findByIdAndRemove(
      req.params.id
    );

    if (!deletedDriverExperience) {
      return res.status(404).json({ error: "Driver experience not found" });
    }

    res.json({ message: "Driver experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver experience:", error);
    res.status(500).json({
      error: "An error occurred while deleting the driver experience",
    });
  }
};
