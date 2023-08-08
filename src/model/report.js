const mongoose = require('mongoose');
const objectid = mongoose.Types.ObjectId;
const postSchema = mongoose.Schema({
        postId: { type: objectid, ref: "post", },
        reportCount: {
                type: Number,
                default: 0,
        },
        report: [{
                user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "users",
                },
                Comment: {
                        type: String
                },
                date: {
                        type: Date,
                        default: Date.now,
                },
        }],
})
const postmodel = mongoose.model('report', postSchema);
module.exports = postmodel;