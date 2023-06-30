var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require("../../model/userModel");
exports.login = async (req, res) => {
  try {
    const { phone, role, gender } = req.body;
    const data = await userSchema.findOne({ phone: phone, role: role });
    if (!data) {
      const otp = Math.floor(Math.random() * 1000000 + 1);
      let obj = { phone: phone, gender: gender, role: role, otpExpire: new Date(Date.now() + 5 * 60 * 1000), otp: otp, otpVerification: false }
      const newUser = await userSchema.create(obj);
      res.status(200).send({ message: "data created successfully", newUser: newUser });
    } else {
      const otp = Math.floor(Math.random() * 1000000 + 1);
      let update = await userSchema.findByIdAndUpdate({ _id: data._id }, { $set: { otpVerification: false, otpExpire: new Date(Date.now() + 5 * 60 * 1000), otp: otp } }, { new: true });
      res.status(200).send({ message: "OTP sent successfully", newUser: update });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};
exports.verify = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const updated = await userSchema.findByIdAndUpdate({ _id: user._id }, { otpVerification: true }, { new: true });
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '24h', });
    res.status(200).send({ message: "logged in successfully", accessToken: accessToken, profileComplete: updated.profileComplete, data: updated });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: "internal server error" + err.message });
  }
};
exports.createDriver = async (req, res) => {
  try {
    const { firstName, lastName, ResumeTitle, location, exactAddress, category, language, militaryService, DateOfBirth, licienceNumber, } = req.body;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      let obj = {
        firstName: firstName || findUser.firstName,
        lastName: lastName || findUser.lastName,
        ResumeTitle: ResumeTitle || findUser.ResumeTitle,
        location: location || findUser.location,
        exactAddress: exactAddress || findUser.exactAddress,
        category: category || findUser.category,
        language: language || findUser.language,
        militaryService: militaryService || findUser.militaryService,
        DateOfBirth: DateOfBirth || findUser.DateOfBirth,
        licienceNumber: licienceNumber || findUser.licienceNumber,
      };
      let update = await userSchema.findByIdAndUpdate({ _id: findUser._id }, { $set: obj }, { new: true });
      if (update) {
        res.status(200).json({ message: "User Detail update.", status: 200, data: update });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the driver." });
  }
};
exports.updateExperience = async (req, res) => {
  try {
    const { experience } = req.body;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const driver = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $push: { experience: experience } }, { new: true });
      return res.status(200).json({ status: 200, message: "Experiance detail update.", data: driver });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};
exports.updateDocument = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      let front = req.files['frontImage'];
      let back = req.files['backImage'];
      req.body.frontImage = front[0].path;
      req.body.backImage = back[0].path;
      const driver = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $set: { frontImage: req.body.frontImage, backImage: req.body.backImage, } }, { new: true });
      return res.status(200).json({ status: 200, message: "Experiance detail update.", data: driver });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};