var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userModel");
const axios = require("axios");
const AadharMatch = require("../model/aadhar");
const addharcard = require("../model/addharverification");
const rating = require("../model/ratingModel");
const SubscriptionSchema = require("../model/subscription");
const payment = require("../model/payment");
exports.registration = async (req, res) => {
  try {
    const { phone, role, gender } = req.body;
    const data = await userSchema.findOne({ phone: phone, role: role });
    if (!data) {
      const otp = Math.floor(Math.random() * 1000000 + 1);
      let refferalCode = await reffralCode();
      let obj = { phone: phone, gender: gender, role: role, otpExpire: new Date(Date.now() + 5 * 60 * 1000), otp: otp, otpVerification: false, refferalCode: refferalCode }
      const newUser = await userSchema.create(obj);
      res.status(200).send({ message: "data created successfully", data: newUser });
    } else {
      res.status(409).send({ status: 409, message: "User already exits.", data: {} });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { phone, role, gender } = req.body;
    const data = await userSchema.findOne({ phone: phone, role: role });
    if (!data) {
      res.status(404).send({ status: 404, message: "User not found.", data: {} });
    } else {
      const otp = Math.floor(Math.random() * 1000000 + 1);
      let update = await userSchema.findByIdAndUpdate({ _id: data._id }, { $set: { gender: gender, otpVerification: false, otpExpire: new Date(Date.now() + 5 * 60 * 1000), otp: otp } }, { new: true });
      res.status(200).send({ message: "OTP sent successfully", data: update });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
exports.resendOtp = async (req, res) => {
  try {
    const data = await userSchema.findOne({ _id: req.params.id });
    if (!data) {
      res.status(404).send({ status: 404, message: "User not found.", data: {} });
    } else {
      const otp = Math.floor(Math.random() * 1000000 + 1);
      let update = await userSchema.findByIdAndUpdate({ _id: data._id }, { $set: { otpVerification: false, otpExpire: new Date(Date.now() + 5 * 60 * 1000), otp: otp } }, { new: true });
      res.status(200).send({ message: "OTP sent successfully", data: update });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
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
exports.getProfile = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      return res.status(200).json({ msg: "Get user profile successfully", user: findUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message, name: error.name });
  }
};
exports.createDriver = async (req, res) => {
  try {
    const { firstName, lastName, ResumeTitle, location, exactAddress, category, language, militaryService, DateOfBirth, licenseNumber, } = req.body;
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
        licenseNumber: licenseNumber || findUser.licenseNumber,
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
exports.addharotp = async (req, res) => {
  try {
    const { aadhaar_number } = req.body;
    const newBeneficiary = new addharcard({ aadhaar_number });
    const clientId = "CF458155CI63HMEOJF7QM277LKR0";
    const clientSecret = "5a7d205372069c3fda85e52f8c3072b0ea4cc683";
    const headers = { "x-api-version": "2023-03-01", "Content-Type": "application/json", "X-Client-ID": clientId, "X-Client-Secret": clientSecret, };
    const response = await axios.post("https://api.cashfree.com/verification/offline-aadhaar/otp", newBeneficiary, { headers: headers, });
    const createdBeneficiary = response.data;
    if (createdBeneficiary) {
      let obj = {
        userId: req.user._id,
        aadhaar_number: aadhaar_number,
        ref_id: createdBeneficiary.ref_id,
      };
      let Save = await AadharMatch.create(obj);
      res.status(200).json(Save);
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.verifyaddharotp = async (req, res) => {
  try {
    const { otp, ref_id } = req.body;
    const newBeneficiary = new addharcard({ otp, ref_id });
    const clientId = "CF458155CI63HMEOJF7QM277LKR0";
    const clientSecret = "5a7d205372069c3fda85e52f8c3072b0ea4cc683";
    const headers = { "x-api-version": "2023-03-01", "Content-Type": "application/json", "X-Client-ID": clientId, "X-Client-Secret": clientSecret, };
    const response = await axios.post("https://api.cashfree.com/verification/offline-aadhaar/verify", newBeneficiary, { headers: headers, });
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary)
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.userUpdateprofile = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      let fileUrl;
      if (req.file) {
        fileUrl = req.file ? req.file.path : "";
      }
      const user = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $set: { photoUpload: fileUrl || findUser.photoUpload } }, { new: true });
      return res.status(200).json({ msg: "profile updated successfully", user: user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message, name: error.name });
  }
};
exports.updateCompanyType = async (req, res) => {
  try {
    const { companyType } = req.body;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      const driver = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $set: { companyType: companyType } }, { new: true });
      return res.status(200).json({ status: 200, message: "Experiance detail update.", data: driver });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};
exports.updateEmployeeDetails = async (req, res) => {
  try {
    const { name, details, email, exactAddress, phone, website } = req.body;
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "User Not found.", status: 404 });
    } else {
      let obj = {
        name: name || findUser.name,
        details: details || findUser.details,
        email: email || findUser.email,
        exactAddress: exactAddress || findUser.exactAddress,
        phone: phone || findUser.phone,
        website: website || findUser.website
      }
      const driver = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $set: obj }, { new: true });
      return res.status(200).json({ status: 200, message: "Employeer Profile update detail update.", data: driver });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the driver." });
  }
};
exports.followUnFollow = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      let findUsers = await userSchema.findOne({ _id: req.params.id });
      if (findUsers) {
        if (findUsers.followers.includes((findUser._id).toString())) {
          let update = await userSchema.findByIdAndUpdate({ _id: findUsers._id }, { $pull: { followers: findUser._id }, $set: { followerCount: findUsers.followerCount - 1 } }, { new: true });
          if (update) {
            let updates = await userSchema.findByIdAndUpdate({ _id: findUser._id }, { $pull: { following: findUsers._id }, $set: { followingCount: findUser.followingCount - 1 } }, { new: true })
            if (updates) {
              return res.status(200).json({ status: 200, message: "Unfollow successfully.", data: updates });
            }
          }
        } else {
          let update = await userSchema.findByIdAndUpdate({ _id: findUsers._id }, { $push: { followers: findUser._id }, $set: { followerCount: findUsers.followerCount + 1 } }, { new: true });
          if (update) {
            let updates = await userSchema.findByIdAndUpdate({ _id: findUser._id }, { $push: { following: findUsers._id }, $set: { followingCount: findUser.followingCount + 1 } }, { new: true })
            if (updates) {
              return res.status(200).json({ status: 200, message: "Follow successfully.", data: updates });
            }
          }
        }
      } else {
        res.status(404).json({ message: "User Not found.", status: 404 });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver." });
  }
};
exports.giveRating = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (!findUser) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      let findUsers = await userSchema.findOne({ _id: req.params.id });
      if (findUsers) {
        let findRating = await rating.findOne({ userId: findUsers._id })
        if (findRating) {
          let obj = { userId: findUser._id, rating: req.body.rating, comment: req.body.comment, date: Date.now() };
          let averageRating = (((findRating.averageRating * findRating.rating.length) + req.body.rating) / (findRating.rating.length + 1));
          let update = await rating.findByIdAndUpdate({ _id: findRating._id }, { $set: { averageRating: parseFloat(averageRating).toFixed(2), totalRating: findRating.rating.length + 1 }, $push: { rating: obj } }, { new: true });
          if (update) {
            return res.status(200).json({ status: 200, message: "Rating given successfully.", data: update });
          }
        } else {
          let data = {
            userId: findUsers._id,
            rating: [{
              userId: findUser._id,
              rating: req.body.rating,
              comment: req.body.comment,
              date: Date.now(),
            }],
            averageRating: req.body.rating,
            totalRating: 1
          }
          const Data = await rating.create(data);
          if (Data) {
            return res.status(200).json({ status: 200, message: "Rating given successfully.", data: Data });
          }
        }
      } else {
        res.status(404).json({ message: "User Not found.", status: 404 });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      message: "server error.",
      data: {},
    });
  }
};
exports.CreatePayment = async (req, res) => {
  try {
    let userdata = await userSchema.findOne({ _id: req.user._id });
    if (!userdata) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      const subscription = await SubscriptionSchema.findById({ _id: req.params.subscriptionId })//.populate("subscriptionId")
      if (!subscription) {
        return res.status(404).json({ status: 404, message: 'Subscription not found' })
      } else {
        const DBData = {
          name: userdata.name || userdata.firstName,
          amount: subscription.price,
          currency: "INR",
          userId: userdata._id,
          subscriptionId: subscription._id
        };
        const AmountData = await payment.create(DBData);
        if (AmountData) {
          return res.status(200).json({ status: 200, message: "Payment in proccess.", data: AmountData });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
}
exports.verifyPayment = async (req, res) => {
  try {
    let userdata = await userSchema.findOne({ _id: req.user._id });
    if (!userdata) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      const subscription = await payment.findOne({ subscriptionId: req.params.subscriptionId, userId: userdata._id, status: "pending" });
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' })
      } else {
        if (req.body.status == "Paid") {
          let update = await payment.findByIdAndUpdate({ _id: subscription._id }, { $set: { status: req.body.status } }, { new: true })
          if (update) {
            let subscriptionExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            let updates = await userSchema.findByIdAndUpdate({ _id: userdata._id }, { $set: { subscriptionId: req.params.subscriptionId, subscriptionExpire: subscriptionExpiration, subscriptionVerification: true } }, { new: true })
            if (updates) {
              return res.status(200).json({ status: 200, message: 'Payment Success', data: update })
            }
          }
        }
        if (req.body.status == "Failed") {
          let update = await payment.findByIdAndUpdate({ _id: subscription._id }, { $set: { status: req.body.status } }, { new: true })
          if (update) {
            return res.status(200).json({ status: 200, message: 'Payment failed', data: update })
          }
        }
      }
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
}
exports.addMoney = async (req, res) => {
  try {
    let data = await userSchema.findOne({ _id: req.user._id });
    if (data) {
      let update = await userSchema.findByIdAndUpdate({ _id: data._id }, { $set: { wallet: data.wallet + parseInt(req.body.balance) } }, { new: true });
      if (update) {
        let obj = {
          userId: data._id,
          date: Date.now(),
          amount: req.body.balance,
          type: "Credit",
          status: "Paid"
        };
        const data1 = await payment.create(obj);
        if (data1) {
          res.status(200).json({ status: 200, message: "Money has been added.", data: update, });
        }
      }
    } else {
      return res.status(404).json({ status: 404, message: "No data found", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};
exports.removeMoney = async (req, res) => {
  try {
    let data = await userSchema.findOne({ _id: req.user._id });
    if (data) {
      let update = await userSchema.findByIdAndUpdate({ _id: data._id }, { $set: { wallet: data.wallet - parseInt(req.body.balance) } }, { new: true });
      if (update) {
        let obj = {
          userId: data._id,
          date: Date.now(),
          amount: req.body.balance,
          type: "Debit",
          status: "Paid"
        };
        const data1 = await payment.create(obj);
        if (data1) {
          res.status(200).json({ status: 200, message: "Money has been deducted.", data: update, });
        }
      }
    } else {
      return res.status(404).json({ status: 404, message: "No data found", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};
exports.GetPaymentsByUser = async (req, res) => {
  try {
    let userdata = await userSchema.findOne({ _id: req.user._id });
    if (!userdata) {
      res.status(404).json({ message: "Token Expired or invalid.", status: 404 });
    } else {
      const Data = await payment.find({ userId: userdata._id }).populate({ path: 'userId subscriptionId', select: 'firstName lastName photoUpload plan' });
      if (Data.length == 0) {
        return res.status(404).json({ status: 404, message: 'Payment Data not found', data: {} })
      } else {
        return res.status(200).json({ status: 200, message: "Payment Data found.", data: Data });
      }
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
exports.GetAllPayments = async (req, res) => {
  try {
    const Data = await payment.find().populate({ path: 'userId subscriptionId', select: 'firstName lastName photoUpload plan' });
    if (Data.length == 0) {
      return res.status(404).json({ status: 404, message: 'Payment Data not found', data: {} })
    } else {
      return res.status(200).json({ status: 200, message: "Payment Data found.", data: Data });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
exports.addskill = async (req, res) => {
  try {
    let findUser = await userSchema.findOne({ _id: req.user._id });
    if (findUser) {
      let skill = [];
      if (findUser.skills.length > 0) {
        for (let i = 0; i < findUser.skills.length; i++) {
          let obj = {
            skill: findUser.skills[i].skill,
          };
          skill.push(obj);
        }
      }
      let obj = {
        skill: req.body.skill,
      };
      skill.push(obj);
      const data = await userSchema.findOneAndUpdate({ _id: findUser._id }, { $set: { skills: skill } }, { new: true });
      res.status(200).send({ msg: "skill added", data: data });
    } else {
      return res.status(404).send({ msg: "not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: "internal server error ",
      error: err.message,
    });
  }
};
const reffralCode = async () => {
  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let OTP = '';
  for (let i = 0; i < 9; i++) {
    OTP += digits[Math.floor(Math.random() * 36)];
  }
  return OTP;
}