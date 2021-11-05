var mongoose=require('mongoose')
var schema =mongoose.Schema

var password = new mongoose.Schema({
        pwd : String,
        


})

const Password =mongoose.model("Password",password)
module.exports = Password