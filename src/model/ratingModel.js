const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
        },
        rating: [{
            userId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "user",
                required: true,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            date: {
                type: Date,
            },
        }],
        averageRating: {
            type: Number,
            default:0
        },
        totalRating: {
            type: Number,
            default:0
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("rating", schema);