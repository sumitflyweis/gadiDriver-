const bcrypt = require("bcryptjs");
const JobService = require("../model/jobService");
const nodemailer = require("nodemailer")

exports.createJobService = async (req, res) => {
  try {
    const jobServiceData = req.body;
    const createdJobService = await JobService.create(jobServiceData);
    res.status(201).json({ msg: createdJobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getJobService = async (req, res) => {
  try {
    const jobService = await JobService.find().populate("employer language subscription");

    if (!jobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: jobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getJobServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobService = await JobService.findById(id).populate(
      "employer language subscription"
    );

    if (!jobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: jobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.jobservicesusingQuery = async (req, res) => {
  try {
    const jobServices = await JobService.find({
      $or: [
        { jobtype: req.query.jobtype },
        { vehicletype: req.query.vehicletype },
        { location: req.query.location },
      ],
    });

    if (jobServices.length === 0) {
      console.log("No job services found");
      res.status(200).json({ msg: "No job services found" });
    } else {
      console.log("Job services:", jobServices);
      res.status(200).json({ msg: jobServices });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    // Handle accordingly
  }
};

exports.updateJobServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobServiceData = req.body;
    const updatedJobService = await JobService.findByIdAndUpdate(
      id,
      jobServiceData,
      { new: true }
    );

    if (!updatedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: updatedJobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateJobServiceSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const jobServiceData = req.body;
    const updatedJobService = await JobService.findByIdAndUpdate(
      id,
      jobServiceData,
      { new: true }
    );

    if (!updatedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: updatedJobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateJobServices3 = async (req, res) => {
  try {
    const { id } = req.params;
    const jobServiceData = req.body;
    const updatedJobService = await JobService.findByIdAndUpdate(
      id,
      jobServiceData,
      { new: true }
    );

    if (!updatedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: updatedJobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateJobServices4 = async (req, res) => {
  try {
    const { id } = req.params;
    const jobServiceData = req.body;
    const updatedJobService = await JobService.findByIdAndUpdate(
      id,
      jobServiceData,
      { new: true }
    );

    if (!updatedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: updatedJobService });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteJobServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJobService = await JobService.findByIdAndDelete(id);

    if (!deletedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ message: "Job service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update an existing driver
exports.updatesubcription = async (req, res) => {
  try {
    const driver = await JobService.findOneAndUpdate(
      { _id: req.params.id },
      { subscription: req.body.subscription },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ error: "Driver not found." });
    }

    res.status(200).json({msg:driver});
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};


exports.updatepassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmpassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashconfirmpassword = await bcrypt.hash(confirmpassword, salt);

    const updatedJobService = await JobService.findByIdAndUpdate(
      id,
      { password: hashedPassword, confirmpassword: hashconfirmpassword },
      { new: true }
    );

    if (!updatedJobService) {
      return res.status(404).json({ error: "Job service not found" });
    }

    res.status(200).json({ msg: updatedJobService });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.viewed_count = async (req, res) => {
  try {
    const post = await JobService.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.viewed_count += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};



exports.resetpassword = async (req, res) => {
  const { email ,password , confirmpassword} = req.body;

  try {
    // Check if the admin exists
    const admin = await JobService.findOne({ email });
    if (!admin) return res.status(404).json({ message: " not found" });

    // Generate a random password
    //const newPassword = password//Math.random().toString(36).slice(-8);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashconfirmpassword = await bcrypt.hash(confirmpassword , salt)

    // Update the admin object with the new password
    admin.password = hashedPassword;
    admin.confirmpassword = hashconfirmpassword

    // Save the updated admin object to the database
    const updatedAdmin = await admin.save();

    // Send password reset email
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: '',
    //     pass: ''
    //   }
    // });


    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'cassidy.braun21@ethereal.email',
          pass: 'Wtgd6EJsh2bN3YbUhm'
      }
  });

    const mailOptions = {
      from: 'node3@flyweis.technology',
      to: email,
      subject: 'hello',
      text: `Your new password is ${password}. Please login and change your password as soon as possible.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

