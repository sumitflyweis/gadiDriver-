const Driver = require("../model/driver");
const axios = require("axios");
const twilio = require("twilio");


exports.createDriver = async (req, res) => {
  try {
    console.log("hi")
    const {
      authid,
      gender,
      firstName,
      lastName,
      ResumeTitle,
      location,
      exactAddress,
      category,
      language,
      militaryService,
      DateOfBirth,
      licienceNumber,
    } = req.body;

    const driver = new Driver({
      authid,
      gender,
      firstName,
      lastName,
      ResumeTitle,
      location,
      exactAddress,
      category,
      language,
      militaryService,
      DateOfBirth,
      licienceNumber,
    });

    const savedDriver = await driver.save();

    res.status(201).json({ driver: savedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the driver." });
  }
};



exports.getallDriver = async (req, res) => {
  try {
    const drivers = await Driver.find().populate(
      "authid location category language jobServicesId experience.vehicletype"
    );
    res.status(200).json({ msg: drivers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving drivers." });
  }
};

// Get a driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate(
      "authid location category language jobServicesId experience.vehicletype"
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the driver." });
  }
};

exports.getAllwhoviewed = async (req, res) => {
  try {
    const obj = {
      ...req.query,
    };
    if (req.query.viewed) {
      obj.viewed = obj.viewed == "true" ? true : false;
    }
    console.log(obj);
    const order = await Driver.find(obj);
    //const orders = await Order.find();
    res.status(200).json({
      success: true,
      total: order.length,
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: err.message,
    });
  }
};

// Update an existing driver
exports.updateDriver = async (req, res) => {
  try {
    const {
      authid,
      licienceNumber,
      gender,
      firstName,
      lastName,
      ResumeTitle,
      location,
      exactAddress,
      category,
      language,
      militaryService,
      DateOfBirth,
      viewed,
    } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.id },
      {
        authid,
        licienceNumber,
        gender,
        firstName,
        lastName,
        ResumeTitle,
        location,
        exactAddress,
        category,
        language,
        militaryService,
        DateOfBirth,
        viewed,
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

// Update an existing driver
exports.updateExperience1 = async (req, res) => {
  try {
    const { companyName, jobTitle, vehicletype, starttime, endtime, Status } =
      req.body;

    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.id },
      {
        experience: {
          companyName,
          jobTitle,
          vehicletype,
          starttime,
          endtime,
          Status,
        },
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

// Update an existing driver's experience
exports.updateExperience2 = async (req, res) => {
  try {
    const { companyName, jobTitle, vehicletype, starttime, endtime, Status } =
      req.body;

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          experience: {
            companyName,
            jobTitle,
            vehicletype,
            starttime,
            endtime,
            Status,
          },
        },
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

// Update an existing driver
exports.updateAdhaar = async (req, res) => {
  try {
    const { frontImage, backImage } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.id },
      {
        frontImage,
        backImage,
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

// Update an existing driver
exports.employerAction = async (req, res) => {
  try {
    const { jobServicesId } = req.params;
    const { employerAction } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { jobServicesId },
      { employerAction },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    return res.json(driver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findEmployerAction = async (req, res) => {
  const { employerAction } = req.query;

  try {
    const driver = await Driver.find({ employerAction: employerAction });

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    return res.json({ msg: driver });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Assuming you have a User model defined

exports.matchAadhaarCardPhoto = async (req, res) => {
  try {
    const { frontImage, backImage, mobileNumber } = req.body;
    const { id } = req.params;

    // Make a POST request to the third-party API to match Aadhaar card photo

    // const matchResponse = await axios.post(
    //   "https://api.thirdparty.com/match-aadhaar",
    //   {
    //     frontImage,
    //     backImage,
    //   }
    // );

    // Check the response from the photo matching API

    //if (matchResponse.data && matchResponse.data.success) {

    // Aadhaar card photo matched successfully

    // Generate OTP for mobile number verification
    const otp = generateOTP();

    // Update the Aadhaar card details in the user record
    const user = await Driver.findByIdAndUpdate(id, {
      frontImage,
      backImage,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Send OTP to the registered mobile number

    //await sendOTP(mobileNumber, otp);

    res.status(200).json({
      success: true,
      message: "Aadhaar card details updated. OTP sent for verification.",
    });

    //  }
    //   else {

    // Aadhaar card photo did not match
    //   res
    //     .status(400)
    //     .json({ success: false, message: "Aadhaar card photo did not match." });
    // }
  } catch (error) {
    console.log(error);
    // Error occurred while updating Aadhaar card details or making the API request
    res.status(500).json({
      success: false,
      error: "An error occurred while updating Aadhaar card details.",
    });
  }
};

// Function to generate a random OTP (for demonstration purposes)
function generateOTP() {
  // Generate a 6-digit random number as OTP
  return Math.floor(1000 + Math.random() * 9000);
}

// // Function to send OTP to the registered mobile number using Twilio
async function sendOTP(mobileNumber, otp) {
  // const accountSid = "AC1983997bded6a9d0598cba6fe51a1340";
  // const authToken = "73dd260489d1c668ff513ad34102cef4";
  // const client = twilio(accountSid, authToken);

  try {
    // Send the OTP to the user's phone number
    // await client.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: "+16205071468",
    //   to: mobileNumber,
    // });
    res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    // Error occurred while sending OTP
    throw new Error("Failed to send OTP.");
  }
}

exports.updateByJobService = async (req, res) => {
  try {
    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.id },
      {
        jobServicesId: req.body.jobServicesId,
      },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json({ msg: driver });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};

// Delete a driver
exports.deleteDriverById = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json({ message: "Driver deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the driver." });
  }
};
