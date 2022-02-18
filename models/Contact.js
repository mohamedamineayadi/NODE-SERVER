var mongoose=require('mongoose')
var Schema =mongoose.Schema

const contact = new Schema({
        text :{ 
                type:String
        },
        topic :{
                type:String
        
        },
        email :{
                type:String
        },
       



},{timestamps:true})

const Contact =mongoose.model('Contact',contact)
module.exports = Contact