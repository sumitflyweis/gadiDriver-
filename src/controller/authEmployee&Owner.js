var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require("../model/authEmployee&Owner");
// const newOTP = require("otp-generator");

// const SECRET = "demo@1234";

const twilio = require("twilio");

// Set up Twilio client with account SID and auth token

// const accountSid = "AC1983997bded6a9d0598cba6fe51a1340";
// const authToken = "73dd260489d1c668ff513ad34102cef4";
// const client = twilio(accountSid, authToken);

// API endpoint for generating and sending an OTP

exports.login = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate a random 6-digit OTP
    const data = await userSchema.findOne({
      phone: phone,
    });

    if (!data || data.length == 0) {
      return res.status(400).json({ msg: "invalid phone" });
    }
    console.log(data.otp);

    const token = jwt.sign({ id: data._id.toString() }, process.env.KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    res.setHeader("x-api-key", /* "Bearer "*/ +token);

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the OTP for the phone number

    // otps[phone] = otp;
    // const newUser = new userSchema({ phone: data.phone,otp:data.otp });

    // Send the OTP to the user's phone number
    // client.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: "+16205071468",
    //   to: phone,
    // });

    res.status(200).send({ message: "success", newUser: data, token: token });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { /*phone,*/ otp } = req.body;

    const verifyOtp = await userSchema.findOne({
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

exports.userProfile1 = async (req, res) => {
  try {
    const { phone } = req.body;

    const data = await userSchema.findOne({
      phone: phone,
    });
    if (!data || data.length == 0) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const newUser = await userSchema.create({ phone: phone, otp: otp, });
      res.status(200).send({ message: "data created successfully", newUser: newUser });
    } else {
      res.status(201).send({ message: "User profile already in db", });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllauth = async (req, res) => {
  try {
    const cameraBrowseEntries = await userSchema.find();

    res.status(200).json({ msg: cameraBrowseEntries });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving cameraBrowse entries.",
      });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    console.log("hi");
    const data = {
      role: req.body.role,
    };

    const user = await userSchema.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      {
        new: true,
      }
    );
    console.log(user);
    return res.status(200).json({ msg: "profile details updated", user: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};

// exports.deleteUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await userSchema.deleteOne({ _id: id });
//     return res.status(200).send({ message: "data deleted " });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: err.message });
//   }
// };

// exports.socialLogin = async (req, res) => {
//   try {
//     const { google_id } = req.body

//      const user = await userSchema.findOne({ google_id: google_id });
//      console.log(user)
//      if (!user ||user.length == 0 ) {
//       const data1 = {
//         google_id: req.body.google_id,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//       }

//       const create = await userSchema.create(data1);
//       console.log(create)

//       const accessToken1 = jwt.sign({id: create._id }, process.env.KEY, {
//         expiresIn: "1d",
//       })

//       res.setHeader("x-api-key", /* "Bearer "*/ +accessToken1);
//       return res.status(200).send({
//         message: "logged in successfully",
//         accessToken: accessToken1,
//         data: create,
//       });
//     }

//     console.log("hi")
//     const accessToken = jwt.sign({id: user._id }, process.env.KEY, {
//       expiresIn: "1d",
//     });

//     res.setHeader("x-api-key", /* "Bearer "*/ +accessToken);
//     return res.status(200).send({
//       message: "logged in successfully",
//       accessToken: accessToken,
//       data: user,
//     });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .send({ error: "internal server error" + err.message });
//   }
// }
