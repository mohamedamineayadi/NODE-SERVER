var mongoose=require('mongoose')
var schema =mongoose.Schema

var points = new mongoose.Schema({
        
    pointCount : number,


})

const Points =mongoose.model("Points",points)
module.exports = Points