var mongoose = require('mongoose')
var Schema = mongoose.Schema

const meme = new Schema({
    text: {
        type: String
    },
    image: {
        type: String

    },
    createdBy: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
}, {timestamps: true})

module.exports = mongoose.model('Meme', meme)