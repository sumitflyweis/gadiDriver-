const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
        jobType: { type: String, },
}, { timestamps: true, }
);

module.exports = mongoose.model("jobType", locationSchema);
