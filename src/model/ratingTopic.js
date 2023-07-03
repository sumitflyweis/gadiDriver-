const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
        topic: { type: String, },
}, { timestamps: true, });
module.exports = mongoose.model("ratingTopic", locationSchema);
