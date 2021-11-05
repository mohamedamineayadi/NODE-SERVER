var mongoose=require('mongoose')
var schema =mongoose.Schema

var contact = new mongoose.Schema({
        text : String,
        topic : String,
        email : String,


})

const Meme =mongoose.model("Meme",meme)
module.exports = Meme