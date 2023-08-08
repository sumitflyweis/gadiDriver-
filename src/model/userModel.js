const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const Employee_OwnerSchema = mongoose.Schema(
        {
                name: { type: String, default: "" },
                refferalCode: { type: String, default: "" },
                wallet: { type: Number, default: 0, },
                email: { type: String, default: "" },
                image: { type: String, default: "" },
                password: { type: String, default: "" },
                confirmpassword: { type: String, default: "" },
                phone: { type: String, },
                otp: { type: String, default: "", },
                otpVerification: { type: Boolean, default: false, },
                otpExpire: { type: Date, },
                role: { type: String, enum: ["DRIVER", "EMPLOYER", "SUBADMIN", "ADMIN"], },
                companyType: { type: String, enum: ["COMPANY", "INDIVISUAL"], },
                profileComplete: { type: Boolean, default: false, },
                mobileNumber: { type: String, },
                gender: { type: String, default: "", },
                firstName: { type: String, default: "", },
                lastName: { type: String, default: "", },
                ResumeTitle: { type: String, default: "", },
                details: { type: String },
                location: { type: objectid, ref: "location", },
                exactAddress: { type: String, default: "", },
                website: { type: String, default: "", },
                category: { type: objectid, ref: "category", },
                language: { type: objectid, ref: "different_Languages", },
                militaryService: { type: String, default: "", },
                DateOfBirth: { type: String, default: "", },
                licenseNumber: { type: String, default: "", },
                email: { type: String, default: "", },
                interest: { type: String, default: "", },
                experience: [{
                        companyName: { type: String, default: "", },
                        jobTitle: { type: String, default: "", },
                        vehicletype: { type: objectid, ref: "vehicletype", },
                        starttime: { type: String, default: "", },
                        endtime: { type: String, default: "", },
                        Status: { type: String, default: "", },
                }],
                frontImage: { type: String, default: "", },
                backImage: { type: String, default: "", },
                licenseVerification: { type: String, enum: ["PENDING", "ACCEPT", "REJECT"], default: "PENDING" },
                photoUpload: { type: String, default: "", },
                jobServicesId: [{ type: objectid, ref: "jobService", }],
                employerAction: { type: String, default: "", },
                subscriptionId: { type: objectid, ref: "subscription", },
                subscriptionVerification: { type: Boolean, default: false, },
                subscriptionExpire: { type: Date, },
                viewed: { type: Boolean, default: false, },
                followers: [{ type: objectid, ref: "users", }],
                following: [{ type: objectid, ref: "users", }],
                followerCount: { type: Number, default: 0, },
                followingCount: { type: Number, default: 0, },
                jobPostCount: { type: Number, default: 0, },
                skills: [{
                        skill: {
                                type: String,
                        },
                }],
                permissions: {
                        addCategory: {
                                type: Boolean,
                        },
                        editCategory: {
                                type: Boolean,
                        },
                        viewCategory: {
                                type: Boolean,
                        },
                        deleteCategory: {
                                type: Boolean,
                        },
                        addCategoryInterest: {
                                type: Boolean,
                        },
                        editCategoryInterest: {
                                type: Boolean,
                        },
                        viewCategoryInterest: {
                                type: Boolean,
                        },
                        deleteCategoryInterest: {
                                type: Boolean,
                        },
                        addJobType: {
                                type: Boolean,
                        },
                        editJobType: {
                                type: Boolean,
                        },
                        viewJobType: {
                                type: Boolean,
                        },
                        deleteJobType: {
                                type: Boolean,
                        },
                        addvehicletype: {
                                type: Boolean,
                        },
                        editvehicletype: {
                                type: Boolean,
                        },
                        viewvehicletype: {
                                type: Boolean,
                        },
                        deletevehicletype: {
                                type: Boolean,
                        },
                        postManagement: {
                                type: Boolean,
                        },
                        addEmployee: {
                                type: Boolean,
                        },
                        editEmployee: {
                                type: Boolean,
                        },
                        viewEmployee: {
                                type: Boolean,
                        },
                        deleteEmployee: {
                                type: Boolean,
                        },
                        addDriver: {
                                type: Boolean,
                        },
                        editDriver: {
                                type: Boolean,
                        },
                        viewDriver: {
                                type: Boolean,
                        },
                        deleteDriver: {
                                type: Boolean,
                        },
                        notificationManagement: {
                                type: Boolean,
                        },
                },

        },
        {
                timestamps: true,
        }
);

module.exports = mongoose.model("users", Employee_OwnerSchema);
