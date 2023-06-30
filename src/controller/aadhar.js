const axios = require("axios");
const AadharMatch = require("../model/aadhar");
const addharcard = require("../model/addharverification");

const matchAadhar = async (frontImage, backImage) => {
  const response = await axios.post("https://your-matching-service.com/match", {
    frontImage,
    backImage,
  });
  return response.data.matched;
};
exports.matchAadharCard = async (req, res) => {
  try {
    const { frontImage, backImage, driverId } = req.body;
    const matched = await matchAadhar(frontImage, backImage);
    const aadharMatch = new AadharMatch({ driverId, frontImage, backImage, matched, });
    const savedAadharMatch = await aadharMatch.save();
    res.status(200).json(savedAadharMatch);
  } catch (error) {
    console.error("Error matching Aadhar card:", error);
    res.status(500).json({ error: "An error occurred while matching the Aadhar card" });
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
    console.log(createdBeneficiary)
    newBeneficiary.save()
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.verifyadminotp = async (req, res) => {
  try {
    const { otp, ref_id } = req.body;
    const newBeneficiary = new addharcard({ otp, ref_id });
    const clientId = "CF458155CI63HMEOJF7QM277LKR0";
    const clientSecret = "5a7d205372069c3fda85e52f8c3072b0ea4cc683";
    const headers = { "x-api-version": "2023-03-01", "Content-Type": "application/json", "X-Client-ID": clientId, "X-Client-Secret": clientSecret, };
    const response = await axios.post("https://api.cashfree.com/verification/offline-aadhaar/verify", newBeneficiary, { headers: headers, });
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary)
    newBeneficiary.save()
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};