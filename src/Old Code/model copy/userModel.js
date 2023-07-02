const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const Employee_OwnerSchema = mongoose.Schema(
        {
                phone: {
                        type: String,
                },
                otp: {
                        type: String,
                        default: "",
                },
                otpVerification: {
                        type: Boolean,
                        default: false,
                },
                otpExpire: {
                        type: Date,
                },
                role: {
                        type: String,
                        enum: ["DRIVER", "EMPLOYER", "ADMIN"],
                },
                profileComplete: {
                        type: Boolean,
                        default: false,
                },
                mobileNumber: {
                        type: String,
                },
                gender: {
                        type: String,
                        default: "",
                },
                firstName: {
                        type: String,
                        default: "",
                },
                lastName: {
                        type: String,
                        default: "",
                },
                ResumeTitle: {
                        type: String,
                        default: "",
                },
                location: {
                        type: objectid,
                        ref: "location",
                },
                exactAddress: {
                        type: String,
                        default: "",
                },
                category: {
                        type: objectid,
                        ref: "category",
                },
                language: {
                        type: objectid,
                        ref: "different_Languages",
                },
                militaryService: {
                        type: String,
                        default: "",
                },
                DateOfBirth: {
                        type: String,
                        default: "",
                },
                licienceNumber: {
                        type: String,
                        default: "",
                },
                email: {
                        type: String,
                        default: "",
                },
                interest: {
                        type: String,
                        default: "",
                },
                experience: [
                        {
                                companyName: {
                                        type: String,
                                        default: "",
                                },
                                jobTitle: {
                                        type: String,
                                        default: "",
                                },
                                vehicletype: {
                                        type: objectid,
                                        ref: "vehicletype",
                                },
                                starttime: {
                                        type: String,
                                        default: "",
                                },
                                endtime: {
                                        type: String,
                                        default: "",
                                },
                                Status: {
                                        type: String,
                                        default: "",
                                },
                        },
                ],
                frontImage: {
                        type: String,
                        default: "",
                },
                backImage: {
                        type: String,
                        default: "",
                },
                photoUpload: {
                        type: String,
                        default: "",
                },
                jobServicesId: [{
                        type: objectid,
                        ref: "jobService",
                }],
                employerAction: {
                        type: String,
                        default: "",
                },
                viewed: {
                        type: Boolean,
                        default: false,
                },
        },
        {
                timestamps: true,
        }
);

module.exports = mongoose.model("users", Employee_OwnerSchema);
