const User = require("../../model/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new User({ name, email, password: hashedPassword, role, });
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, role: "ADMIN" });
    if (!user) { return res.status(401).json({ error: "Invalid email or password" }); }
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Wrong password",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user, accessToken });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "EMPLOYER" });
    if (users.length == 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    } else {
      return res.status(200).json({ status: 200, message: "All Employee found.", data: users, });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.getAllDrivers = async (req, res) => {
  try {
    const users = await User.find({ role: "DRIVER" });
    if (users.length == 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    } else {
      return res.status(200).json({ status: 200, message: "All Driver found.", data: users, });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    return res.status(200).json({ status: 200, message: "user found.", data: user, });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await User.findById({ _id: req.user._id });
    if (!admin) {
      return res.status(404).json({ status: 404, message: "Admin not found" });
    } else {
      let hashedPassword;
      if (password != (null || undefined)) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
      let obj = {
        name: name || admin.name,
        email: email || admin.email,
        password: hashedPassword || admin.password,
        role: admin.role,
      }
      let update = await User.findByIdAndUpdate({ _id: admin._id }, { $set: obj }, { new: true })
      if (update) {
        return res.status(200).json({ status: 200, message: "Admin Profile update" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.resetpassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: " not found" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    admin.password = hashedPassword;
    const updatedAdmin = await admin.save();
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
exports.forgetpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: " not found" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin.password, salt);
    admin.password = hashedPassword;
    const updatedAdmin = await admin.save();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    updatedAdmin.otp = otp
    await updatedAdmin.save()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'sandy.anderson@ethereal.email',
        pass: 'K26Eg8zmEvkHuAYBYm'
      }
    });

    const mailOptions = {
      from: 'node3@flyweis.technology',
      to: email,
      subject: 'hello',
      text: `Your new password is ${hashedPassword}. Please login and change your password as soon as possible.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({ msg: updatedAdmin, otp: otp });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.verifyadminotp = async (req, res) => {
  try {
    const { /*phone,*/ otp } = req.body;

    const verifyOtp = await User.findOne({
      otp: otp,
    });

    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      // const data = { _id: verifyOtp._id, phone: verifyOtp.phone };

      // const token = jwt.sign(
      //   {id: verifyOtp._id.toString() },
      //    process.env.KEY,
      //   {
      //     expiresIn: "1d",
      //   }
      // );
      // console.log(token);
      // res.setHeader("x-api-key", /* "Bearer "*/ +token);
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: verifyOtp /* Token: token*/ });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};
// exports.forgotPasswordToken = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found with this email");
//   try {
//     const token = await User.createPasswordResetToken();
//     await user.save();
//     const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8080/astro/forget/${token}'>Click Here</>`;
//     const data = {
//       to: email,
//       text: "Hey User",
//       subject: "Forgot Password Link",
//       html: resetURL,
//     };
//     sendEmail(data);
//     res.json(token);
//   } catch (error) {
//     throw new Error(error);
//   }
// });


// createPasswordResetToken = async function () {
//   const resettoken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resettoken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//   return resettoken;
// };
