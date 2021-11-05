var mongoose=require('mongoose')
var schema =mongoose.Schema

var meme = new mongoose.Schema({
        text : String,
        image : String,


})

const Meme =mongoose.model("Meme",meme)
module.exports = Meme