var mongoose=require('mongoose')
var Schema =mongoose.Schema

const user = new Schema({
        name :{ 
                type:String,
                required : false
        },
        surname :{
                type:String,
                required : false
        
        },
        email :{
                type:String
        },
        password : {
                type:String
        },
        photo :{
                type:String,
                required : false
        },
        birthDate: {
                type:String,
                required : false
        },
        points : {
                type:Number
        },
        valid: {
                type: Boolean
        },
        resetpwd: {
                type: String
        }

},{timestamps:true})

const User =mongoose.model('User',user)
module.exports = User