const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Job",
            required: true,
        },
        topicId: [{
            ratingTopicId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "ratingTopic",
            },
            rating: {
                type: Number,
            },
            totalRating: {
                type: Number,
                default: 0
            },
        }],
        rating: [{
            userId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "user",
            },
            rating: {
                type: Number,
            },
            subject: {
                type: String,
            },
            ratingTopicId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "ratingTopic",
            },
            message: {
                type: String,
            },
            date: {
                type: Date,
            },
        }],
        averageRating: {
            type: Number,
            default: 0
        },
        totalRating: {
            type: Number,
            default: 0
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("jobRatingModel", schema);