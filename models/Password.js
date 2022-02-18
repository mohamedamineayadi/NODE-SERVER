var mongoose=require('mongoose')
var Schema =mongoose.Schema

const password = new Schema({
        password :{ 
                type:String
        },
        
        



},{timestamps:true})

const Password =mongoose.model('Password',password)
module.exports = Password