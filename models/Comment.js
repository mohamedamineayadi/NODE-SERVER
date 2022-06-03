const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        date: {type: Date, default: Date.now},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        userEmail: {type: String},
        meme: {type: mongoose.Schema.Types.ObjectId, ref: "Meme"},
        description: {type: String},
    },
    {
        timestamps: {currentTime: () => Date.now()},
    }
)
module.exports = mongoose.model("Comment", CommentSchema)