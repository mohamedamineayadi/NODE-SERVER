var mongoose=require('mongoose')
var Schema =mongoose.Schema

const user = new Schema({
        name :{ 
                type:String
        },
        surname :{
                type:String
        
        },
        email :{
                type:String
        },
        password : {
                type:String
        },
        photo :{
                type:String
        },
        birthDate: {
                type:String
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