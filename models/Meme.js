var mongoose=require('mongoose')
var Schema =mongoose.Schema

const meme = new Schema({
        text :{ 
                type:String
        },
        image :{
                type:String
        
        },
        createdby :{
                type:String 
        },



},{timestamps:true})

const Meme =mongoose.model('Meme',meme)
module.exports = Meme